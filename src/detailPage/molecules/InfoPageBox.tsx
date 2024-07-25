import { useCallback, useEffect, useState } from "react";
import InfoPageComponent, { InfoPageComponentProps } from "./InfoPageComponent";
import axios from "axios";

export type InfoPageBoxProps = {
  store_id: number;
  member_idx: number | null;
  averageRating: number; //별점 평균값
};

const InfoPageBox = ({
  store_id,
  member_idx,
  averageRating,
}: InfoPageBoxProps) => {
  const [infoPageData, setInfoPageData] = useState<Omit<
    InfoPageComponentProps,
    "store_id" | "member_idx" | "store_rating"
  > | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<
        Omit<InfoPageComponentProps, "store_id" | "member_idx" | "store_rating">
      >(`http://localhost:3001/api/info_page/${store_id}`);
      const data = response.data;
      console.log("infopagebox에서 가져온 데이터", data);
      setInfoPageData(data);
    } catch (error) {
      console.error("페이지 정보를 받아오지 못했습니다:", error);
    }
  }, [store_id]);

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // infoPageData가 없으면 로딩 또는 에러 메시지를 보여줍니다.
  if (!infoPageData) {
    return <div>Loading...</div>;
  }
  // console.log("infoPageData:", infoPageData);

  return (
    <div className="drop-shadow-lg bg-white rounded-lg">
      <InfoPageComponent
        {...infoPageData}
        store_id={store_id}
        member_idx={member_idx}
        store_rating={averageRating}
      />
    </div>
  );
};

export default InfoPageBox;
