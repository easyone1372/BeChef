import Button from "../../atom/Button/Button";
import Logo from "../../atom/Logo/Logo";

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-skipDB text-white">
      <div>
        <Logo url="asd" />
      </div>
      <div>
        <Button text="로그인" onClick={() => {}} />
      </div>
    </div>
  );
};
export default HeaderSection;
