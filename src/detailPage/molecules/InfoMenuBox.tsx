import InfoSubTitle from "../atom/InfoSubTitle";
import InfoMenuList, { InfoMenuListProps } from "./InfoMenuList";

const InfoMenuBox = ({ storeId }: InfoMenuListProps) => {
  return (
    <div className="mt-4 max-w-5xl w-full my-0 mx-auto">
      <InfoSubTitle content={"메뉴"} />
      <InfoMenuList storeId={storeId} />
    </div>
  );
};

export default InfoMenuBox;
