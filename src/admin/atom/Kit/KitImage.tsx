import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const Image = ({ src, alt, className }: ImageProps) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Image;
