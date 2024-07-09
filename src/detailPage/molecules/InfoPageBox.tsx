import { useEffect, useState } from "react";
import InfoPageComponent, { InfoPageComponentProps } from "./InfoPageComponent";
import axios from "axios";

export type InfoPageBoxProps = {
  storeId: number;
  userId: number | null;
};

const InfoPageBox = ({ storeId, userId }: InfoPageBoxProps) => {
  const [infoPageData, setInfoPageData] = useState<Omit<
    InfoPageComponentProps,
    "storeId" | "userId"
  > | null>(null);

  useEffect(() => {
    // 서버에서 데이터 가져오기
    const fetchData = async () => {
      try {
        // const response = await axios.get<InfoPageComponentProps>(
        //   `http://localhost:3000/api/infoPage/${storeId}`
        // );
        const response = await axios.get<
          Omit<InfoPageComponentProps, "storeId" | "userId">
        >(`http://localhost:3001/api/infoPage/${storeId}`);

        const data = response.data;
        console.log(data);

        setInfoPageData(data);
      } catch (error) {
        console.error("페이지 정보를 받아오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [storeId]);

  // infoPageData가 없으면 로딩 또는 에러 메시지를 보여줍니다.
  if (!infoPageData) {
    return <div>Loading...</div>;
  }
  console.log("infoPageData:", infoPageData);
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
    <div>
      <InfoPageComponent {...infoPageData} storeId={storeId} userId={userId} />
    </div>
  );
};

export default InfoPageBox;
