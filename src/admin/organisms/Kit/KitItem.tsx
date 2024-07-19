import React, { useState } from "react";
import KitInfo from "../../molecules/Kit/KitInfo";
import { Kit } from "../../atom/Kit/Kit";
import axios from "axios";

type KitItemProps = {
  kit: Kit;
  onUpdate: (updatedKit: Kit) => void;
};

const KitItem: React.FC<KitItemProps> = ({ kit, onUpdate }) => {
  const [quantity, setQuantity] = useState(kit.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 0 : newQuantity);
  };

  const handleUpdateQuantity = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(
        `http://localhost:3001/api/inventory/${kit.store_id}/${kit.menu_id}`,
        {
          quantity: quantity,
        }
      );
      const updatedKit = response.data;
      onUpdate(updatedKit);
      alert("수량이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating kit quantity:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("수량 업데이트에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 가격을 정수로 변환하는 함수
  const formatPrice = (menu_price: number) => Math.floor(menu_price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img
        src={kit.menu_image_url}
        alt={kit.menu_name}
        className="w-full h-48 object-cover"
      />
      <KitInfo
        name={kit.menu_name}
        description={kit.menu_description}
        price={formatPrice(kit.menu_price)}
        quantity={kit.quantity}
      />
      <div className="p-4 bg-gray-50">
        <div className="mb-2 text-center font-bold">
          가격: {formatPrice(kit.menu_price)}원
        </div>
        <div className="mb-2 text-center font-bold">
          현재 수량: {kit.quantity}
        </div>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdateQuantity}
          disabled={isUpdating}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          {isUpdating ? "업데이트 중..." : "수량 업데이트"}
        </button>
      </div>
    </div>
  );
};

export default KitItem;
