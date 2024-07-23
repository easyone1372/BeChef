import React, { useState } from "react";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import { validateId, validatePwd } from "./SignUpCheck";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/sign-up");
  };
  const goMainPage = () => {
    navigate("/");
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/bechef/member/login",
        { id, pwd }
      );
      const apiResponse = response.data;
      console.log(apiResponse);
      console.log(response.headers);
      if (apiResponse.status === "SUCCESS") {
        const jwtToken = response.headers["authorization"].split(" ")[1];
        localStorage.setItem("jwt-token", jwtToken);
        console.log("로그인 성공 및 토큰 localStorage저장 성공", jwtToken);
        goMainPage();
        alert("로그인 성공");
      } else {
        console.error("로그인 실패: ", apiResponse.data);
      }
    } catch (error: any) {
      if (error.response) {
        const apiResponse = error.response.data;
        console.error("로그인 실패: ", apiResponse);
      } else {
        console.error("로그인 실패: ", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex-col bg-npLG p-8 rounded-lg shadow-lg w-px400 h-px500 w-full h-full mt-2">
        <div>
          <FontAwesomeIcon
            onClick={goMainPage}
            className="text-2xl text-skipDB cursor-pointer"
            icon={faHouse}
          />
        </div>
        <h1 className="text-center pb-5 text-2xl font-bold mb-6 text-skipDB mt-px30">
          로그인
        </h1>
        <FormField
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <FormField
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
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
