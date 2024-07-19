import React from "react";

type TextProps = {
  content: string;
  className?: string;
};

const Text = ({ content, className }: TextProps) => (
  <p className={className}>{content}</p>
);

export default Text;
