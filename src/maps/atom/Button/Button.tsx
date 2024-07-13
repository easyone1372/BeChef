import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button onClick={onClick} className="border p-2 ml-2 rounded text-white">
      {text}
    </button>
  );
};

export default Button;
