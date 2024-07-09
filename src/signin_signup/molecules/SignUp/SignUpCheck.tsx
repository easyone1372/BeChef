// 이름 검사
export const validateName = (name: string) => {
  if (!name) {
    return "이름을 입력하세요.";
  } else {
    return "";
  }
};

//id 검사
export const validateId = (id: string) => {
  if (!id) {
    return "아이디를 입력하세요.";
  } else {
    return "";
  }
};

// 비밀번호 검사
export const validatePwd = (Pwd: string) => {
  if (!Pwd) {
    return "비밀번호를 입력하세요.";
  } else {
    return "";
  }
};

// 비밀번호 확인
export const validateConfirmPwd = (Pwd: string, confirmPwd: string) => {
  if (!confirmPwd) {
    return "비밀번호를 입력하세요.";
  } else if (Pwd !== confirmPwd) {
    return "비밀번호가 일치하지 않습니다.";
  } else {
    return "";
  }
};

// 이메일 검사
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "이메일을 입력하세요.";
  } else if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력하세요.";
  } else {
    return "";
  }
};

// 전화번호 검사
export const validatephoneNumber = (phoneNumber: string) => {
  const phoneReg = /^(010-\d{4}-\d{4}|01[1|6|7|8|9]-\d{3,4}-\d{4})$/;
  if (!phoneNumber) {
    return "전화번호를 입력하세요.";
  } else if (!phoneReg.test(phoneNumber)) {
    return "유효한 전화번호를 입력하세요.";
  } else {
    return "";
  }
};
