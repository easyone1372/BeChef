import { useState } from "react";
import InfoEditBtn from "../atom/InfoEditBtn";
import axios from "axios";
import InfoReviewBox from "./InfoReviewBox";
import InfoReviewEdit from "./InfoReviewEdit";

type InfoReviewEditBoxProps = {
  review_id: number;
  comment: string;
  rating: number;
  onDelete: (review_id: number) => void; // 삭제 함수 전달
  onEditSubmit: (review_id: number, content: string, rating: number) => void; // 리뷰 수정 함수
};

//상세 페이지 - 리뷰 수정/삭제 기능 버튼 컴포넌트
const InfoReviewEditBox = ({
  review_id,
  comment,
  rating,
  onDelete,
  onEditSubmit,
}: InfoReviewEditBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditBtn = () => {
    setIsEditing(true);
  };

  const handleDeleteBtn = async () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      onDelete(review_id);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  return (
    <div className="flex gap-2">
      {isEditing ? (
        <InfoReviewEdit
          review_id={review_id}
          currentComment={comment}
          currentRating={rating}
          onEditSubmit={(id: number, content: string, rating: number) => {
            onEditSubmit(id, content, rating);
            setIsEditing(false);
          }}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <InfoEditBtn content="수정" clickEvent={handleEditBtn} />
          <InfoEditBtn content="삭제" clickEvent={handleDeleteBtn} />
        </>
      )}
    </div>
  );
};

export default InfoReviewEditBox;
