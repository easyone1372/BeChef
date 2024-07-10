type InfoMenuTitleProps = {
  content: string;
};

const InfoMenuTitle = ({ content }: InfoMenuTitleProps) => {
  return <div className="text-2xl font-semibold mb-4">{content}</div>;
};

export default InfoMenuTitle;
