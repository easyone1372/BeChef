import { useState } from "react";
import InfoReviewInput from "../atom/InfoReviewInput";
import InfoSubmitBtn from "../atom/InfoSubmitBtn";
import InfoSubTitle from "../atom/InfoSubTitle";
import { InfoReviewComponentProps } from "./InfoReviewComponent";
import InfoReviewInputBox from "./InfoReviewInputBox";
import InfoReviewList from "./InfoReviewList";

//상세페이지 - 리뷰 전체 박스
type InfoReviewBoxProps = {
  store_id: number;
  member_idx: number | null;
};
const InfoReviewBox = ({ store_id, member_idx }: InfoReviewBoxProps) => {
  const [infoReviewList, setInfoReviewList] = useState<
    InfoReviewComponentProps[]
  >([]);
  return (
    <div className="mt-4 max-w-800 w-full my-4 mx-auto mb-9 drop-shadow-lg bg-white rounded-lg">
      <div className="max-w-768 w-full mt-9 mx-auto mb-9 gap-px20 pb-6">
        <InfoSubTitle content="리뷰" />
        <div className="flex flex-col gap-px20">
          <InfoReviewInputBox
            store_id={store_id}
            member_idx={member_idx}
            setInfoReviewList={setInfoReviewList}
          />
          <InfoReviewList
            store_id={store_id}
            member_idx={member_idx}
            infoNewReviewList={infoReviewList}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoReviewBox;
