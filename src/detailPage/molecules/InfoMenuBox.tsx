import InfoSubTitle from "../atom/InfoSubTitle";
import InfoMenuList, { InfoMenuListProps } from "./InfoMenuList";

const InfoMenuBox = ({ storeId }: InfoMenuListProps) => {
  return (
    <div className="mt-4 max-w-5xl w-full my-4 mx-auto gap-4">
      <InfoSubTitle content={"메뉴"} />
      <InfoMenuList storeId={storeId} />
    </div>
  );
};

export default InfoMenuBox;
