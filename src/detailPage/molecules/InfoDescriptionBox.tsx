import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import InfoDetail from "../atom/InfoDetail";

//상단 가게 정보 - 위치, 전화번호
type InfoDescriptionBoxProps = {
  location: string;
  callNumber: string;
};

const InfoDescriptionBox = ({
  location,
  callNumber,
}: InfoDescriptionBoxProps) => {
  return (
    <div className="flex flex-col gap-1 h-28 justify-center">
      <InfoDetail detailIcon={faLocationDot} content={location}></InfoDetail>
      <InfoDetail detailIcon={faPhone} content={callNumber}></InfoDetail>
    </div>
  );
};
export default InfoDescriptionBox;
