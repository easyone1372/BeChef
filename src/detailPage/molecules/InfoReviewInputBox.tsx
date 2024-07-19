import userEvent from "@testing-library/user-event";
import InfoReviewInput from "../atom/InfoReviewInput";
import InfoSubmitBtn from "../atom/InfoSubmitBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import InfoReviewStarComponent from "./InfoReviewStarComponent";
import { InfoReviewComponentProps } from "./InfoReviewComponent";
import InfoReviewList from "./InfoReviewList";

//상세 페이지 리뷰 작성 전체 박스
type InfoReviewInputBoxProps = {
  store_id: number;
  member_idx: number | null;
  setInfoReviewList: React.Dispatch<
    React.SetStateAction<InfoReviewComponentProps[]>
  >; // setInfoReviewList 추가
};
const InfoReviewInputBox = ({
  store_id,
  member_idx,
  setInfoReviewList,
}: InfoReviewInputBoxProps) => {
  const [comment, setComment] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(0); // 리뷰 평점을 추가로 설정해야 함
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false); // 리뷰 제출 상태 추가
  const [resetInput, setResetInput] = useState<boolean>(false); // 새로운 state 추가

  const handleSubmit = async () => {
    if (!member_idx) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (reviewRating === 0 || comment.trim() === "") {
      alert("별점과 리뷰를 작성해주세요.");
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/review_input`, {
        member_idx,
        store_id,
        comment,
        review_rating: reviewRating,
      });
      console.log("리뷰가 성공적으로 제출되었습니다.");
      setComment(""); // 입력 필드 초기화
      setResetInput(true);
      setReviewSubmitted(true); // 제출 상태 업데이트
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
    }
  };

  //별점 및 입력필드 초기화
  useEffect(() => {
    if (reviewSubmitted) {
      setReviewRating(0);
      setReviewSubmitted(false);
      setResetInput(false);
      console.log("초기화됨");
    }
  }, [reviewSubmitted]);

  //리뷰 리스트 다시 가져오기
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const url = `http://localhost:3001/api/info_review/${store_id}`;
        const response = await axios.get(url);
        const data: InfoReviewComponentProps[] = response.data;
        console.log("리뷰 데이터: ", data);
        setInfoReviewList(data);
      } catch (error) {
        console.error("리뷰 정보를 가져오는 중 오류 발생: ", error);
      }
    };

    if (reviewSubmitted) {
      fetchReview();
      setReviewSubmitted(false);
    }
  }, [reviewSubmitted, store_id]);

  return (
    <div>
      <InfoReviewStarComponent
        totalStars={5}
        setReviewRating={setReviewRating}
        reset={reviewSubmitted}
      />
      <div className="flex gap-px10 justify-center items-center hover:cursor-pointer">
        <InfoReviewInput setComment={setComment} reset={resetInput} />
        <InfoSubmitBtn
          clickEvent={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          content="등록"
        />
      </div>
    </div>
  );
};
export default InfoReviewInputBox;