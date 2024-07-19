type InfoMoreViewBtnProps = {
  content: string;
};

const InfoMoreViewBtn = ({ content }: InfoMoreViewBtnProps) => {
  return <div className="bg-skipDB text-white font-semibold">{content}</div>;
};
export default InfoMoreViewBtn;
