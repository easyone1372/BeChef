import InfoSubTitle from "../atom/InfoSubTitle";
import InfoMenuList, { InfoMenuListProps } from "./InfoMenuList";

const InfoMenuBox = ({ storeId }: InfoMenuListProps) => {
  return (
    <div className="mt-4 max-w-768 w-full my-4 mx-auto gap-4 rounded-lg">
      <InfoSubTitle content={"메뉴"} />
      <InfoMenuList storeId={storeId} />
    </div>
  );
};

export default InfoMenuBox;
