import { useEffect, useState } from "react";
import InfoMenuComponent, { InfoMenuComponentProps } from "./InfoMenuComponent";
import axios from "axios";

export type InfoMenuListProps = {
  store_id: number;
};

const InfoMenuList = ({ store_id }: InfoMenuListProps) => {
  const [infoMenuList, setInfoMenuList] = useState<InfoMenuComponentProps[]>(
    []
  );

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/info_menu/${store_id}`
        );
        const data = response.data.map((item: any) => ({
          ...item,
          kitIngredient: item.kitIngredient
            ? item.kitIngredient.split(", ")
            : [], // kitIngredient가 null이면 빈 배열로 처리
          kitAllergies: item.kitAllergies ? item.kitAllergies.split(", ") : [], // kitAllergies가 null이면 빈 배열로 처리
        }));
        console.log("메뉴데이터:", data);
        setInfoMenuList(data);
      } catch (error) {
        console.error("Error fetching menu data", error);
      }
    };

    fetchMenu();
  }, [store_id]);

  return (
    <div className="max-w-768 w-full my-0 mx-auto flex flex-col gap-px20">
      {infoMenuList.map((data, index: number) => (
        <InfoMenuComponent
          key={index}
          kitName={data.kitName}
          kitIngredient={data.kitIngredient}
          kitAllergies={data.kitAllergies}
          kitCount={data.kitCount}
          imageUrl={data.imageUrl}
          cookingTime={data.cookingTime}
          difficulty={data.difficulty}
          calories={data.calories}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default InfoMenuList;
