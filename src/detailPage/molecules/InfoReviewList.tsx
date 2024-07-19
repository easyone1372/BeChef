import { useEffect, useState } from "react";
import InfoReviewComponent, {
  InfoReviewComponentProps,
} from "./InfoReviewComponent";
import axios from "axios";
import InfoEditBtn from "../atom/InfoEditBtn";
import InfoReviewEdit from "./InfoReviewEdit";

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
    fetchReview();
  }, [store_id]);

  return (
    <div className="max-w-768 w-full my-0 mx-auto flex flex-col gap-px20">
      {[...infoReviewList, ...infoNewReviewList].map((data, index: number) => (
        <div key={index} className="relative flex justify-between">
          <InfoReviewComponent {...data} />
          {member_idx !== null && member_idx === data.member_idx && (
            <InfoReviewEdit />
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoReviewList;
