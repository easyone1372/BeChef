import { useParams } from "react-router-dom";
import InfoHeader from "../molecules/InfoHeader";
import InfoPageBox from "../molecules/InfoPageBox";
import InfoMiddleBox from "../molecules/InfoMiddleBox";
import InfoMenuBox from "../molecules/InfoMenuBox";

const InfoPage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const userId = null;
  return (
    <div className="bg-gray-100">
      <div className="bg-disLP w-screen">
        <div className="max-w-800 w-full my-0 mx-auto gap-6 bg-white mb-11">
          <InfoHeader />
          <InfoPageBox storeId={Number(storeId)} userId={userId} />
          <InfoMiddleBox storeId={Number(storeId)} />
          <InfoMenuBox storeId={Number(storeId)} />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
