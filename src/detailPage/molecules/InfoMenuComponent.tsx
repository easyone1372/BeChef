//밀키트 메뉴 출력 컴포넌트

import InfoAllergy from "../atom/InfoAllergy";
import InfoMenuImage from "../atom/InfoMenuImage";
import InfoMenuIngredient from "../atom/InfoMenuIngredient";

export type InfoMenuComponentProps = {
  kitName: string;
  kitIngredient: string[];
  kitAllergies: string[] | null;
  kitCount: number;
  ImageUrl: string;
};

const InfoMenuComponent = ({
  kitName,
  kitIngredient,
  kitCount,
  kitAllergies,
  ImageUrl,
}: InfoMenuComponentProps) => {
  return (
    <div className="flex justify-between items-center text-base h-24 gap-1 w-full">
      <div className="flex gap-1 justify-center items-center">
        <InfoMenuImage content={ImageUrl} />
        <span>{kitName}</span>
      </div>
      {/* 추후 리팩토링해야함 */}
      <div className="flex flex-col gap-1 w-52">
        <div className="flex gap-1 pr-1">
          <span>주재료: </span>
          <InfoMenuIngredient content={kitIngredient} />
        </div>
        {kitAllergies && kitAllergies.length > 0 && (
          <div className="flex gap-1 pr-1">
            <span>알레르기: </span>
            <InfoAllergy content={kitAllergies} />
          </div>
        )}
        <div className="flex gap-1 pr-1">
          <span>남은 수량: </span>
          <span>{kitCount}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoMenuComponent;
