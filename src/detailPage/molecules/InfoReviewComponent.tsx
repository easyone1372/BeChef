import { useState } from "react";
import InfoMenuText from "../atom/InfoMenuText";
import InfoSubTitle from "../atom/InfoSubTitle";
import InfoMenuBox from "./InfoMenuBox";
import InfoStar from "../atom/InfoSetStar";

//상세페이지 - 리뷰출력 컴포컨트 구성
export type InfoReviewComponentProps = {
  userName: string;
  userReview: string;
  userRating: number;
  reviewDate: string;
  member_idx?: number;
};
const InfoReviewComponent = ({
  userName,
  userReview,
  userRating,
  reviewDate,
}: InfoReviewComponentProps) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="text-bold">{userName}</div>
      <div className="flex gap-1">
        <InfoStar starNum={userRating} />
        <span>{reviewDate}</span>
      </div>
      <InfoMenuText content={userReview} />
    </div>
  );
};

export default InfoReviewComponent;
