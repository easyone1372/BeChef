import React, { useState } from "react";
import KitInfo from "../../molecules/Kit/KitInfo";
import { Kit } from "../../atom/Kit/Kit";
import { updateKitCount } from "../../atom/Kit/KitApi";

type KitItemProps = {
  kit: Kit;
  onUpdate: (updatedKit: Kit) => void;
};

const KitItem = ({ kit, onUpdate }: KitItemProps) => {
  const [quantity, setQuantity] = useState(kit.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleUpdateQuantity = async () => {
    try {
      setIsUpdating(true);
      const updatedKit = await updateKitCount(
        kit.storeId,
        kit.mealKitId,
        quantity
      );
      onUpdate(updatedKit);
      alert("수량이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating kit quantity:", error);
      alert("수량 업데이트에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img
        src={kit.imageUrl}
        alt={kit.mealKitName}
        className="w-full h-48 object-cover"
      />
      <KitInfo
        name={kit.mealKitName}
        description={kit.description}
        price={kit.price}
        quantity={kit.quantity}
      />
      <div className="p-4 bg-gray-50">
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
