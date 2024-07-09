//밀키트 메뉴 출력 컴포넌트

import InfoAllergy from "../atom/InfoAllergy";
import InfoMenuImage from "../atom/InfoMenuImage";
import InfoMenuIngredient from "../atom/InfoMenuIngredient";
import InfoMenuText from "../atom/InfoMenuText";
import InfoMenuTitle from "../atom/InfoMenuTitle";

export type InfoMenuComponentProps = {
  kitName: string;
  kitIngredient: string[];
  kitAllergies: string[] | null;
  kitCount: number;
  imageUrl: string;
  cookingTime: number;
  difficulty: string;
  calories: number;
};

const InfoMenuComponent = ({
  kitName,
  kitIngredient,
  kitCount,
  kitAllergies,
  imageUrl,
  cookingTime,
  difficulty,
  calories,
}: InfoMenuComponentProps) => {
  // 리팩토링 필수!!!!!!!
  return (
    <div className="flex justify-between items-center text-base h-36 gap-1 w-full">
      <div className="flex gap-1 justify-center">
        <InfoMenuImage content={imageUrl} />
        <div className="flex flex-col gap-0.5 ">
          <InfoMenuTitle content={kitName} />
          <div className="flex gap-0.5">
            <div className="size-fit flex text-xs">
              <span className="font-semibold">조리시간: </span>
              <InfoMenuText content={cookingTime} />분
            </div>
            <div className="size-fit flex text-xs">
              <span className="font-semibold">난이도: </span>
              <InfoMenuText content={difficulty} />
            </div>
            <div className="size-fit flex text-xs">
              <span className="font-semibold">칼로리: </span>
              <InfoMenuText content={calories} />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-52 text-xs">
            <div className="flex gap-1 pr-1">
              <span className="font-semibold">주재료: </span>
              <InfoMenuIngredient content={kitIngredient} />
            </div>
            {kitAllergies && kitAllergies.length > 0 && (
              <div className="flex gap-1 pr-1">
                <span className="font-semibold">알레르기: </span>
                <InfoAllergy content={kitAllergies} />
              </div>
            )}
            <div className="flex gap-1 pr-1">
              <span className="font-semibold">남은 수량: </span>
              <span>{kitCount}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 추후 리팩토링해야함 */}
    </div>
  );
};

export default InfoMenuComponent;
