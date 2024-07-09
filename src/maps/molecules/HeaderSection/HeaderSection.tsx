import Button from "../../atom/Button/Button";
import Logo from "../../atom/Logo/Logo";

const HeaderSection = () => {
  return (
    <div className="flex justify-between pt-5 px-5">
      <div>
        <Logo url="asd" />
      </div>
      <div>
        <Button text="로그인버튼?" onClick={() => {}} />
      </div>
    </div>
  );
};
export default HeaderSection;
