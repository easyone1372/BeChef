import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../atom/Input";
import Button from "../../atom/Button";
import {
  validateName,
  validateId,
  validatePwd,
  validateConfirmPwd,
  validateEmail,
  validatephoneNumber,
} from "./SignUpCheck";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [Pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    id: "",
    pwd: "",
    confirmPwd: "",
    Email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const checkSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const nameError = validateName(name);
    const idError = validateId(id);
    const pwdError = validatePwd(Pwd);
    const confirmPwdError = validateConfirmPwd(Pwd, confirmPwd);
    const EmailError = validateEmail(Email);
    const phoneNumberError = validatephoneNumber(phoneNumber);
    // 에러 메시지 설정
    if (
      nameError ||
      idError ||
      pwdError ||
      confirmPwdError ||
      EmailError ||
      phoneNumberError
    ) {
      setErrors({
        name: nameError,
        id: idError,
        pwd: pwdError,
        confirmPwd: confirmPwdError,
        Email: EmailError,
        phoneNumber: phoneNumberError,
      });
      return;
    }

    // 유효성 검사를 통과한 경우
    console.log("회원가입 성공");
    window.alert("회원가입 성공");

    // 여기서 서버로 회원가입 데이터 전송하는 로직 추가
    // axios.post("/api/signup", { name, id, pwd });

    // 예시로 홈 화면으로 이동하는 코드
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center pb-5">
        <h1 className="text-2xl font-bold mb-6">SIGN UP</h1>
        <div
          onClick={goToLogin}
          className="m-auto gap-2.5 underline cursor-pointer"
        >
          Already have an account?
        </div>
      </div>
      <form onSubmit={checkSignUp}>
        <div className="pb-2">
          <div className="text-left pl-1.5">이름</div>
          <div>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="text-left pl-1.5 pt-2">ID</div>
          <div>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
            />
            {errors.id && <span className="text-red-500">{errors.id}</span>}
          </div>

          <div className="text-left pl-1.5 pt-2">비밀번호</div>
          <div>
            <Input
              type="password"
              value={Pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="비밀번호"
            />
            {errors.pwd && <span className="text-red-500">{errors.pwd}</span>}
          </div>

          <div className="text-left pl-1.5 pt-2">비밀번호 확인</div>
          <div>
            <Input
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="비밀번호 확인"
            />
            {errors.confirmPwd && (
              <span className="text-red-500">{errors.confirmPwd}</span>
            )}
          </div>

          <div className="text-left pl-1.5 pt-2">이메일</div>
          <div>
            <Input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            {errors.Email && (
              <span className="text-red-500">{errors.Email}</span>
            )}
          </div>

          <div className="text-left pl-1.5 pt-2">전화번호</div>
          <div>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              placeholder="전화번호"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>
        </div>

        <div>
          <Button type="submit">SIGN UP</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
