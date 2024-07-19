import { useEffect, useState } from "react";
import InfoPageComponent, { InfoPageComponentProps } from "./InfoPageComponent";
import axios from "axios";

export type InfoPageBoxProps = {
  store_id: number;
  member_idx: number | null;
};

const InfoPageBox = ({ store_id, member_idx }: InfoPageBoxProps) => {
  const [infoPageData, setInfoPageData] = useState<Omit<
    InfoPageComponentProps,
    "store_id" | "member_idx"
  > | null>(null);

  useEffect(() => {
    // 서버에서 데이터 가져오기
    const fetchData = async () => {
      try {
        // const response = await axios.get<InfoPageComponentProps>(
        //   `http://localhost:3000/api/infoPage/${storeId}`
        // );
        const response = await axios.get<
          Omit<InfoPageComponentProps, "store_id" | "member_idx">
        >(`http://localhost:3001/api/info_page/${store_id}`);

        const data = response.data;
        console.log("infopagebox에서 가져온 데이터", data);

        setInfoPageData(data);
      } catch (error) {
        console.error("페이지 정보를 받아오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [store_id]);

  // infoPageData가 없으면 로딩 또는 에러 메시지를 보여줍니다.
  if (!infoPageData) {
    return <div>Loading...</div>;
  }
  // console.log("infoPageData:", infoPageData);
  // return (
  //   <div>
  //     <InfoPageComponent
  //       name={infoPageData.name}
  //       rating={infoPageData.rating}
  //       imageUrl={infoPageData.imageUrl}
  //       address={infoPageData.address}
  //       phone={infoPageData.phone}
  //     />
  //   </div>
  // );
  return (
    <div className="drop-shadow-lg bg-white rounded-lg">
      <InfoPageComponent
        {...infoPageData}
        store_id={store_id}
        member_idx={member_idx}
      />
    </div>
  );
};

export default InfoPageBox;
