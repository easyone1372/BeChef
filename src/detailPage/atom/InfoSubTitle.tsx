import { infoContentProps } from "./InfoImage";

//모든 중간 크기의 부제목
const InfoSubTitle = ({ content }: infoContentProps) => {
  return <div className="text-2xl font-semibold mb-4">{content}</div>;
};
export default InfoSubTitle;
