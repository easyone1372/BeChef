import InfoEditBtn from "../atom/InfoEditBtn";

//상세 페이지 - 리뷰 수정 컴포넌트
const InfoReviewEdit = () => {
  const handleEditBtn = () => {};

  const handleDeleteBtn = async () => {};
  return (
    <div className="flex gap-2">
      <InfoEditBtn content="수정" clickEvent={handleEditBtn} />
      <InfoEditBtn content="삭제" clickEvent={handleDeleteBtn} />
    </div>
  );
};

export default InfoReviewEdit;
