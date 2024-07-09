type InfoMenuTitleProps = {
  content: string;
};

const InfoMenuTitle = ({ content }: InfoMenuTitleProps) => {
  return <div className="text-base font-semibold">{content}</div>;
};

export default InfoMenuTitle;
