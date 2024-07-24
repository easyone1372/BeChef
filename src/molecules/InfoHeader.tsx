import Logo from "../../maps/atom/Logo/Logo";
import InfoBackBtn from "../atom/InfoBackBtn";

const InfoHeader = () => {
  return (
    <div className="bg-skipDB w-full h-14 flex justify-between items-center mb-1.5">
      <div>
        <InfoBackBtn />
      </div>
      <div className="w-150 h-12 flex items-center ">
        <Logo url="" />
      </div>
      <div className="w-px50"></div>
    </div>
  );
};

export default InfoHeader;
