import { useCallback, useEffect, useState } from "react";
import InfoReviewComponent, {
  InfoReviewComponentProps,
} from "./InfoReviewComponent";
import axios from "axios";
import InfoReviewEditBox from "./InfoReviewEditBox";
import { jwtDecode } from "jwt-decode";
import { log } from "console";

type InfoReviewListProps = {
  store_id: number;
  infoNewReviewList: InfoReviewComponentProps[];
  fetchAverageRating: () => void;
};

const InfoReviewList = ({
  store_id,
  infoNewReviewList,
  fetchAverageRating,
}: InfoReviewListProps) => {
  const [infoReviewList, setInfoReviewList] = useState<InfoReviewComponentProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const getToken = () => {
    return localStorage.getItem("jwt-token");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        setCurrentUser(decodedToken);
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
      }
    }
  }, []);

  const fetchReview = useCallback(async () => {
    try {
      const token = getToken();
      const url = `http://localhost:8080/api/info/info_review/${store_id}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: InfoReviewComponentProps[] = response.data.reverse();
      console.log("리뷰 데이터: ", data);
      setInfoReviewList(data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는 중 오류 발생: ", error);
    }
  }, [store_id]);

  const updateStoreRating = useCallback(async (rating: number) => {
    try {
      const token = getToken();
      await axios.post(
        `http://localhost:8080/api/info/update_store_rating/${store_id}`,
        { reviewRating: rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("별점 평균 업데이트 중 오류 발생: ", error);
    }
  }, [store_id]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  useEffect(() => {
    fetchReview();
  }, [infoNewReviewList, fetchReview]);

  const handleDeleteReview = useCallback(
    async (review_id: number) => {
      try {
        console.log("리뷰 삭제 요청 시작:", review_id);
        const token = getToken();
        await axios.delete(
          `http://localhost:8080/api/info/review_delete/${review_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("리뷰 삭제 요청 완료");
        await fetchReview();
        await fetchAverageRating();
        alert("리뷰가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("리뷰 삭제 중 오류 발생:", error);
        alert("리뷰 삭제 중 오류가 발생했습니다.");
      }
    },
    [fetchReview, fetchAverageRating]
  );

  const handleEditSubmit = useCallback(
    async (reviewId: number, content: string, rating: number) => {
      try {
        const token = getToken();

        console.log("리뷰 수정:" + reviewId, content, rating);

        await axios.put(
          `http://localhost:8080/api/info/review_update/${reviewId}`,
          {
            comment: content,
            reviewRating: rating,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await fetchReview();
        await updateStoreRating(rating); // 별점 업데이트 호출
        await fetchAverageRating();
        alert("리뷰가 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("리뷰 수정 중 오류 발생:", error);
        alert("리뷰 수정 중 오류가 발생했습니다.");
      }
    },
    [fetchReview, updateStoreRating, fetchAverageRating]
  );

  return (
    <div className="max-w-768 w-full my-0 mx-auto flex flex-col gap-px20">
      {infoReviewList.map((data) => (
        <div key={data.reviewId} className="relative flex justify-between">
          <InfoReviewComponent {...data} />
          {currentUser !== null && currentUser.idx === data.memberIdx && (
            <InfoReviewEditBox
              reviewId={data.reviewId}
              comment={data.comment}
              rating={data.reviewRating}
              onDelete={handleDeleteReview}
              onEditSubmit={handleEditSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoReviewList;
