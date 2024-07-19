import { useLocation, useParams } from "react-router-dom";
import InfoHeader from "../molecules/InfoHeader";
import InfoPageBox from "../molecules/InfoPageBox";
import InfoMiddleBox from "../molecules/InfoMiddleBox";
import InfoMenuBox from "../molecules/InfoMenuBox";
import InfoReviewBox from "../molecules/InfoReviewBox";

const InfoPage = () => {
  const { store_id } = useParams<{ store_id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const member_idx = queryParams.get("member_idx");

  // 임시 멤버 데이터 입력
  const member_idx = 21;

  return (
    <div className="bg-gray-100">
      <div className="bg-npLG w-screen">
        <div className="max-w-800 w-full my-0 mx-auto gap-6 bg-white mb-11">
          <InfoHeader />
          <InfoPageBox
            store_id={Number(store_id)}
            member_idx={member_idx ? Number(member_idx) : null}
          />
          <InfoMiddleBox store_id={Number(store_id)} />
          <InfoMenuBox store_id={Number(store_id)} />
          <InfoReviewBox
            store_id={Number(store_id)}
            member_idx={member_idx ? Number(member_idx) : null}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
