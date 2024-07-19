import { useNavigate } from "react-router-dom";
import Button from "../../atom/Button/Button";
import Logo from "../../atom/Logo/Logo";
import DropdownMenu from "../../atom/DropdownMenu/DropdownMenu";
import { useState } from "react";

const HeaderSection = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigateLogin = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-between items-center p-2 bg-skipDB text-white">
      <div className="w-24 p-3 flex flex-col justify-center items-center">
        <Logo url="logo.png" /> MealKit
      </div>
      <div className="p-3">
        <DropdownMenu setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};
export default HeaderSection;
