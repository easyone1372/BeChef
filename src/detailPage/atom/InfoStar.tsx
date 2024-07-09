import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//별점 컴포넌트
type InfoStarProps = {
  starNum: number;
};

const InfoStar = ({ starNum }: InfoStarProps) => {
  return (
    <div className="text-base flex mb-4">
      <div className="text-purple-300">
        <FontAwesomeIcon icon={faStar} />
      </div>

      <div className="font-semibold">{starNum}</div>
    </div>
  );
};

export default InfoStar;
