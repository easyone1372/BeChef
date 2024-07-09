import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../atom/Input";
import Button from "../../atom/Button";

const LoginForm: React.FC = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({
    id: "",
    pwd: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const idError = id === "" ? "아이디를 입력하세요" : "";
    const pwdError = pwd === "" ? "비밀번호를 입력하세요" : "";

    setErrors({
      id: idError,
      pwd: pwdError,
    });

    return !idError && !pwdError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("로그인 성공");
      window.alert("로그인 되었습니다.");
      // 로그인 처리 로직 추가
    }
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center pb-5">
        <h1 className="text-2xl font-bold mb-6 text-center">SIGN IN</h1>
        <div className="flex pl-16 gap-2.5">
          <div className="mb-6">Not a member yet?</div>
          <div onClick={goToSignUp} className="underline cursor-pointer">
            Sign up here
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="pb-5">
          <div className="text-left ml-2">Email</div>
          <div>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
            />
            {errors.id && <div className="text-red-500">{errors.id}</div>}
          </div>
        </div>

        <div className="pb-5">
          <div className="text-left">Password</div>
          <div>
            <Input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="비밀번호"
            />
            {errors.pwd && <div className="text-red-500">{errors.pwd}</div>}
          </div>
        </div>

        <div>
          <Button type="submit">SIGN IN</Button>
          <div className="underline text-center pt-1.5">Forgot Password?</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
