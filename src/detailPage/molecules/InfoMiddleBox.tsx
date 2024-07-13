//중간 박스 - 영업시간 부제목, 요일, 영업시간 출력(map?)

import InfoSubTitle from "../atom/InfoSubTitle";
import InfoDayBox, { InfoDayBoxProps } from "./InfoDayBox";

const InfoMiddleBox = ({ storeId }: InfoDayBoxProps) => {
  return (
    <div className="mt-4 max-w-800 w-full my-4 mx-auto mb-9 drop-shadow-lg bg-white rounded-lg">
      <div className="max-w-768 w-full mt-9 mx-auto mb-9 gap-px20 pb-6">
        <InfoSubTitle content={"영업시간"} />
        <InfoDayBox storeId={storeId} />
      </div>
    </div>
  );
};
export default InfoMiddleBox;
