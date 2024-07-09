import { useNavigate } from "react-router-dom";

const NavBtn = () => {
  const navigate = useNavigate();

  const goStore = (storeId: number) => {
    navigate(`/information/:${storeId}`);
  };
  return <button onClick={() => goStore(1)}>1번 가게로 이동</button>;
};

export default NavBtn;
