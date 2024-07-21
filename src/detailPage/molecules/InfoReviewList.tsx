import { useCallback, useEffect, useState } from "react";
import InfoReviewComponent, {
  InfoReviewComponentProps,
} from "./InfoReviewComponent";
import axios from "axios";
import InfoReviewEdit from "./InfoReviewEditBox";
import InfoReviewEditBox from "./InfoReviewEditBox";

//상세 페이지 - 리뷰 데이터 가져와서 컴포넌트에 적용, 화면에 출력하는 컴포넌트
type InfoReviewListProps = {
  store_id: number;
  member_idx: number | null;
  infoNewReviewList: InfoReviewComponentProps[];
};
const InfoReviewList = ({
  store_id,
  member_idx,
  infoNewReviewList,
}: InfoReviewListProps) => {
  const [infoReviewList, setInfoReviewList] = useState<
    InfoReviewComponentProps[]
  >([]);

  // fetchReview 함수를 useCallback을 이용하여 메모이제이션
  const fetchReview = useCallback(async () => {
    try {
      const url = `http://localhost:3001/api/info_review/${store_id}`;
      const response = await axios.get(url);
      const data: InfoReviewComponentProps[] = response.data;
      console.log("리뷰 데이터: ", data);
      setInfoReviewList(data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는 중 오류 발생: ", error);
    }
  }, [store_id]); // store_id가 변경될 때마다 fetchReview 함수 재생성

  // 컴포넌트가 마운트될 때 리뷰 데이터를 가져옴
  useEffect(() => {
    fetchReview();
  }, [fetchReview]); // fetchReview 함수의 변경 여부에 따라 useEffect가 재실행

  console.log("새로운 데이터:", infoNewReviewList);

  const handleDeleteReview = useCallback(async (review_id: number) => {
    try {
      console.log("리뷰 삭제 요청 시작:", review_id);
      await axios.delete(
        `http://localhost:3001/api/review_delete/${review_id}`
      );
      console.log("리뷰 삭제 요청 완료");
      setInfoReviewList((prevList) =>
        prevList.filter((review) => review.review_id !== review_id)
      );
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  }, []);

  const handleEditSubmit = useCallback(
    async (review_id: number, content: string, rating: number) => {
      try {
        await axios.put(
          `http://localhost:3001/api/review_update/${review_id}`,
          {
            comment: content,
            review_rating: rating,
          }
        );
        fetchReview(); // 리뷰 목록 갱신
      } catch (error) {
        console.error("리뷰 수정 중 오류 발생:", error);
      }
    },
    [fetchReview]
  );

  return (
    <div className="max-w-768 w-full my-0 mx-auto flex flex-col gap-px20">
      {infoReviewList.map((data) => (
        <div key={data.review_id} className="relative flex justify-between">
          <InfoReviewComponent {...data} />
          {member_idx !== null && member_idx === data.member_idx && (
            <InfoReviewEditBox
              review_id={data.review_id}
              comment={data.comment}
              rating={data.review_rating}
              onDelete={handleDeleteReview}
              onEditSubmit={handleEditSubmit}
            />
          )}
        </div>
      ))}

      {infoNewReviewList.map(
        (data) =>
          // infoNewReviewList에 있는 데이터 중 infoReviewList에 없는 데이터만 추가로 출력
          !infoReviewList.some(
            (existingReview) =>
              existingReview.member_idx === data.member_idx &&
              existingReview.reviewDate === data.reviewDate
          ) && (
            <div key={data.review_id} className="relative flex justify-between">
              <InfoReviewComponent {...data} />
              {member_idx !== null && member_idx === data.member_idx && (
                <InfoReviewEditBox
                  review_id={data.review_id}
                  comment={data.comment}
                  rating={data.review_rating}
                  onDelete={handleDeleteReview}
                  onEditSubmit={handleEditSubmit}
                />
              )}
            </div>
          )
      )}
    </div>
  );
};

export default InfoReviewList;
