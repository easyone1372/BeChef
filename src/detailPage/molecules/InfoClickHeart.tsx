import axios from "axios";
import { useEffect, useState } from "react";
import InfoSolidHeart from "../atom/InfoSolidHeart";
import InfoHeartIcon from "../atom/InfoHeart";

type InfoClickHeartProps = {
  storeId: number;
  userId: number;
};
const InfoClickHeart = ({ storeId, userId }: InfoClickHeartProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/favorites/${userId}/${storeId}`)
      .then((response) => {
        setIsFavorite(response.data.isFavorite);
      })
      .catch((error) => {
        console.error("찜 상태 조회 중 오류 발생:", error);
      });
  }, [storeId, userId]);

  const handleHeartClick = () => {
    const newFavoritesStatus = !isFavorite;
    axios
      .post(`/api/favorites`, {
        userId,
        storeId,
        isFavorite: newFavoritesStatus,
      })
      .then(() => {
        setIsFavorite(newFavoritesStatus);
      })
      .catch((error) => {
        console.error("찜 상태 업데이트 중 오류 발생:", error);
      });
  };

  return (
    <div onClick={handleHeartClick}>
      {isFavorite ? <InfoSolidHeart /> : <InfoHeartIcon />}
    </div>
  );
};

export default InfoClickHeart;
