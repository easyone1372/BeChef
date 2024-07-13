import InfoStar from "../atom/InfoStar";
import InfoTitle from "../atom/InfoTitle";
import InfoClickHeart from "./InfoClickHeart";

//가게 이름 컴포넌트 - 이름, 별점
type InfoTitleBoxProps = {
  titleContent: string;
  titleStarNum: number;
  storeId: number;
  userId: number | null;
};

const InfoTitleBox = ({
  titleContent,
  titleStarNum,
  storeId,
  userId,
}: InfoTitleBoxProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border-x-0 border-t-0 border-b border-solid ">
      <InfoTitle content={titleContent}></InfoTitle>
      <div className="flex justify-center items-center gap-px10  mb-4">
        <InfoStar starNum={titleStarNum}></InfoStar>
        <InfoClickHeart storeId={storeId} userId={userId} />
      </div>
    </div>
  );
};
export default InfoTitleBox;
