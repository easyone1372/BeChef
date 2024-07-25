import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import InfoSolidHeart from "../atom/InfoSolidHeart";
import InfoHeartIcon from "../atom/InfoHeartIcon";

type InfoClickHeartProps = {
  store_id: number;
  member_idx: number | null;
};
const InfoClickHeart = ({ store_id, member_idx }: InfoClickHeartProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (member_idx !== null) {
      const fetchHeart = async () => {
        try {
          const response = await axios.get<{ is_favorite: number }>(
            `http://localhost:3001/api/favorites/${store_id}/${member_idx}`
          );
          const data = response.data;
          console.log("찜 상태: ", data);
          setIsFavorite(data.is_favorite === 1);
        } catch (error) {
          console.error("찜 상태 조회 중 오류 발생:", error);
        }
      };
      fetchHeart();
    } else {
      // member_idx가 null일 때는 기본적으로 찜 상태를 false로 설정
      setIsFavorite(false);
    }
  }, [store_id, member_idx]);

  useEffect(() => {
    console.log("찜 상태 업데이트 후: ", isFavorite);
  }, [isFavorite]);

  const handleHeartClick = useCallback(async () => {
    if (member_idx === null) {
      alert("로그인하세요");
      return;
    }

    const newFavoritesStatus = !isFavorite;
    try {
      await axios.post(`http://localhost:3001/api/favorites`, {
        member_idx,
        store_id,
        is_favorite: newFavoritesStatus,
      });
      setIsFavorite(newFavoritesStatus);
      // alert("등록되었습니다.");
    } catch (error) {
      console.error("찜 상태 업데이트 중 오류 발생:", error);
    }
  }, [isFavorite, member_idx, store_id]);

  return (
    <div className="text-lg font-bold" onClick={handleHeartClick}>
      {isFavorite ? <InfoSolidHeart /> : <InfoHeartIcon />}
    </div>
  );
};

export default InfoClickHeart;
