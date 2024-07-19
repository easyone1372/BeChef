import React, { useState } from "react";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import { validateId, validatePwd } from "./SignUpCheck";
import axios from "axios";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({
    id: "",
    pwd: "",
  });

  const navigate = useNavigate();

  const validateLogin = () => {
    const idError = validateId(id);
    const pwdError = validatePwd(pwd);

    if (idError || pwdError) {
      setErrors({
        id: idError,
        pwd: pwdError,
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/bechef/member/login",
          {
            id,
            pwd,
          }
        );
        if (response.data.message === "로그인 성공") {
          alert("로그인 성공!");
          navigate("/"); // MapPage로 이동
        } else {
          alert("로그인 실패: " + response.data.error);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Login error", error.response?.data);
          alert(
            `로그인 중 오류가 발생했습니다: ${
              error.response?.data?.error || error.message
            }`
          );
        } else {
          console.error("Login error", error);
          alert("로그인 중 알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex-col bg-npLG p-8 rounded-lg shadow-lg w-px400 h-px500 w-full h-full mt-2">
        <h1 className="text-center pb-5 text-2xl font-bold mb-6 text-skipDB mt-px30">
          로그인
        </h1>
        <FormField
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          error={errors.id}
        />
        <FormField
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
          error={errors.pwd}
        />
        <div className="flex justify-center">
          <Button text="로그인" onClick={handleLogin} />
        </div>
        <div className="text-center mt-4">
          <span className="mr-2">계정이 없으신가요?</span>
          <button
            type="button"
            onClick={goToSignUp}
            className="text-skipMB hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
