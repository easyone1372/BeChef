import { useEffect, useState } from "react";

import { InfoPageBoxProps } from "./InfoPageBox";
import axios from "axios";
import InfoDayDetail, { InfoDayDetailProps } from "../atom/InfoDayDetail";

export type InfoDayBoxProps = {
  storeId: number;
};
const InfoDayBox = ({ storeId }: InfoDayBoxProps) => {
  const [dayDetail, setDayDetail] = useState<InfoDayDetailProps[]>([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/infoTime/${storeId}`
        );
        const data = response.data;
        const mappedData = data.map((item: any) => ({
          dayInfo: item.storeDayOfWeek,
          dayOpenTime: item.openTime,
          dayCloseTime: item.closeTime,
          isClosed: item.isClosed,
        }));
        console.log(mappedData);
        setDayDetail(mappedData);
      } catch (error) {
        console.error("영업 시간 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchDays();
  }, [storeId]);

  return (
    <div>
      {dayDetail.map((data, index) => (
        <InfoDayDetail
          key={index}
          dayInfo={data.dayInfo}
          dayOpenTime={data.dayOpenTime}
          dayCloseTime={data.dayCloseTime}
          isClosed={data.isClosed}
        />
      ))}
    </div>
  );
};

export default InfoDayBox;
