import { useState } from "react";
import InfoMenuText from "../atom/InfoMenuText";
import InfoSubTitle from "../atom/InfoSubTitle";
import InfoMenuBox from "./InfoMenuBox";
import InfoSetStar from "../atom/InfoSetStar";

//상세페이지 - 리뷰출력 컴포컨트 구성
export type InfoReviewComponentProps = {
  userName: string;
  comment: string;
  review_rating: number;
  reviewDate: string;
  member_idx?: number;
  review_id: number;
};
const InfoReviewComponent = ({
  userName,
  comment,
  review_rating,
  reviewDate,
  review_id,
}: InfoReviewComponentProps) => {
  return (
    <div className="flex flex-col gap-1" key={review_id}>
      <div className="text-bold">{userName}</div>
      <div className="flex gap-1">
        <InfoSetStar starNum={review_rating} />
        <span>{reviewDate}</span>
      </div>
      <InfoMenuText content={comment} />
    </div>
  );
};

export default InfoReviewComponent;
