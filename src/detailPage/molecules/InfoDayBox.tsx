import { useEffect, useState } from "react";
import { InfoPageBoxProps } from "./InfoPageBox";
import axios from "axios";
import InfoDayDetail, { InfoDayDetailProps } from "../atom/InfoDayDetail";

export type InfoDayBoxProps = {
  store_id: number;
};

const InfoDayBox = ({ store_id }: InfoDayBoxProps) => {
  const [dayDetail, setDayDetail] = useState<InfoDayDetailProps[]>([]);

  // 영어 요일을 한글로 변환하는 객체
  const dayTranslation: { [key: string]: string } = {
    Monday: "월요일",
    Tuesday: "화요일",
    Wednesday: "수요일",
    Thursday: "목요일",
    Friday: "금요일",
    Saturday: "토요일",
    Sunday: "일요일",
  };

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/info/time/${store_id}`
        );
        const data = await response.data;

        const mappedData = data.map((item: any) => ({
          dayInfo: dayTranslation[item.storeDayOfWeek] || item.storeDayOfWeek,
          dayOpenTime: item.openTime ? item.openTime.slice(0, 5) : "Closed",
          dayCloseTime: item.closeTime ? item.closeTime.slice(0, 5) : "Closed",
          isClosed: item.openTime === null && item.closeTime === null,
        }));

        console.log("dayData:", mappedData);
        setDayDetail(mappedData);
      } catch (error) {
        console.error("영업 시간 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchDays();
  }, [store_id]);

  return (
    <div>
      {dayDetail.map((data, index) => (
        <InfoDayDetail
          key={index}
          dayInfo={data.dayInfo}
          dayOpenTime={data.isClosed ? "휴무" : data.dayOpenTime}
          dayCloseTime={data.isClosed ? "휴무" : data.dayCloseTime}
          isClosed={data.isClosed}
        />
      ))}
    </div>
  );
};

export default InfoDayBox;
