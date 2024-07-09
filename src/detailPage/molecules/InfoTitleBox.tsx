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
    <div className="flex flex-col gap-4 border-x-0 border-t-0 border-b border-solid ">
      <InfoTitle content={titleContent}></InfoTitle>
      {userId !== null && <InfoClickHeart storeId={storeId} userId={userId} />}
      <InfoStar starNum={titleStarNum}></InfoStar>
    </div>
  );
};
export default InfoTitleBox;
