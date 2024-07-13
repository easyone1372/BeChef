import { Link } from "react-router-dom";

type MapInfoBtnProps = {
  storeId: number;
  userId?: number;
  content: string | number;
};

const MapInfoBtn = ({ storeId, userId, content }: MapInfoBtnProps) => {
  const linkTo = userId
    ? `/information/${storeId}?userId=${userId}`
    : `/information/${storeId}`;

  return (
    <Link to={linkTo}>
      <span className="text-skipLB underline">{content}</span>
    </Link>
  );
};

export default MapInfoBtn;
