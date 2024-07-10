import { useEffect, useState } from "react";

import { InfoPageBoxProps } from "./InfoPageBox";
import axios from "axios";
import InfoDayDetail, { InfoDayDetailProps } from "../atom/InfoDayDetail";
import { InfoWeek } from "../atom/InfoWeek";

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
        const formatTime = (time: string) => {
          return time.slice(0, 5);
        };

        // InfoWeek를 이용해 dayInfo를 변환합니다.
        const mappedData = data.map((item: any) => {
          const week = InfoWeek.find((w) => w.weekNum === item.storeDayOfWeek);
          return {
            dayInfo: week ? week.weekText : item.storeDayOfWeek,
            dayOpenTime: formatTime(item.openTime),
            dayCloseTime: formatTime(item.closeTime),
            isClosed: item.isClosed,
          };
        });

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
