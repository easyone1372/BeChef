import { useEffect, useState } from "react";
import InfoMenuComponent, { InfoMenuComponentProps } from "./InfoMenuComponent";
import axios from "axios";

export type InfoMenuListProps = {
  storeId: number;
};

const InfoMenuList = ({ storeId }: InfoMenuListProps) => {
  const [infoMenuList, setInfoMenuList] = useState<InfoMenuComponentProps[]>(
    []
  );

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/infoMenu/${storeId}`
        );
        const data = response.data.map((item: any) => ({
          ...item,
          kitIngredient: item.kitIngredient.split(", "), // kitIngredient를 문자열 배열로 변환
        }));
        console.log(data);
        setInfoMenuList(data);
      } catch (error) {
        console.error("Error fetching menu data", error);
      }
    };

    fetchMenu();
  }, [storeId]);

  return (
    <div>
      {infoMenuList.map((data, index: number) => (
        <InfoMenuComponent
          key={index}
          kitName={data.kitName}
          kitIngredient={data.kitIngredient}
          kitCount={data.kitCount}
        />
      ))}
    </div>
  );
};

export default InfoMenuList;
