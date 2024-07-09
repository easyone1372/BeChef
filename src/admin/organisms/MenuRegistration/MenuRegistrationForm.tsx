import React, { useState } from "react";
import SubmitButton from "../../atom/MenuRegistration/SubmitButton";

type Store = {
  storeId: number;
  storeName: string;
};

type MenuRegistrationFormProps = {
  stores: Store[];
  onSubmit: (formData: {
    storeId: number;
    mealKitName: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }) => void;
  isLoading: boolean;
};

const MenuRegistrationForm: React.FC<MenuRegistrationFormProps> = ({
  stores,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    storeId: "",
    mealKitName: "",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      storeId: Number(formData.storeId),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="storeId"
          className="block text-sm font-medium text-gray-700"
        >
          가게 선택
        </label>
        <select
          id="storeId"
          name="storeId"
          value={formData.storeId}
          onChange={handleChange}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">가게를 선택하세요</option>
          {stores.map((store) => (
            <option key={store.storeId} value={store.storeId}>
              {store.storeName}
            </option>
          ))}
        </select>
      </div>
      {[
        { id: "mealKitName", label: "밀키트 이름", type: "text" },
        { id: "description", label: "설명", type: "text" },
        { id: "price", label: "가격", type: "number" },
        { id: "imageUrl", label: "이미지 URL", type: "url" },
        { id: "quantity", label: "초기 수량", type: "number" },
      ].map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id as keyof typeof formData]}
            onChange={handleChange}
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      ))}
      <div>
        <SubmitButton text="등록하기" disabled={isLoading} />
        {isLoading && <p className="mt-2 text-sm text-gray-500">등록 중...</p>}
      </div>
    </form>
  );
};

export default MenuRegistrationForm;
