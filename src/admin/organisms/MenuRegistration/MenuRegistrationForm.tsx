import React, { useState } from "react";
import axios from "axios";
import IngredientsInput from "../ingredients/IngredientsInput";
import { Ingredient, ingredients } from "../../atom/ingredients/Ingredients";

// Store 타입 정의
type Store = {
  store_id: number;
  store_name: string;
};

// FormData 타입 정의
type FormData = {
  store_id: string;
  menu_name: string;
  menu_description: string;
  menu_price: string;
  menu_image_url: string;
  menu_cooking_time: string;
  menu_difficulty: string;
  menu_ingredients: string;
  menu_calories: string;
  quantity: string;
};

// MenuRegistrationFormProps 타입 정의
type MenuRegistrationFormProps = {
  stores: Store[];
  onSubmit: (formData: FormData) => void;
  onDelete: (menu_id: number) => void;
  isLoading: boolean;
};

const MenuRegistrationForm: React.FC<MenuRegistrationFormProps> = ({
  stores,
  onSubmit,
  onDelete,
  isLoading,
}) => {
  // formData 상태 정의 및 초기화
  const [formData, setFormData] = useState<FormData>({
    store_id: "",
    menu_name: "",
    menu_description: "",
    menu_price: "",
    menu_image_url: "",
    menu_cooking_time: "",
    menu_difficulty: "",
    menu_ingredients: "",
    menu_calories: "",
    quantity: "",
  });

  // uploadImgUrl 상태 정의 및 초기화
  const [uploadImgUrl, setUploadImgurl] = useState("");

  //선택한 재료들
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // 입력 변경 시 호출되는 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 업로드 시 호출되는 함수
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData,
        {
          params: {
            key: "115376878bc76479b9c6775a72f120aa",
          },
        }
      );

      const menu_image_url = response.data.data.url;
      setFormData((prev) => ({ ...prev, menu_image_url }));
      setUploadImgurl(menu_image_url);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      menu_ingredients: selectedIngredients.join(", "),
    };
    onSubmit(submissionData);
  };

  // 재료 선택 시 호출되는 함수
  const handleIngredientsChange = (newIngredients: string[]) => {
    setSelectedIngredients(newIngredients);
    setFormData((prev) => ({
      ...prev,
      menu_ingredients: newIngredients.join(", "),
    }));
  };

  return (
    <>
      <style>
        {`
          input[type=number]::-webkit-outer-spin-button,
          input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 bg-white rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="store_id"
            className="block text-sm font-medium text-gray-700"
          >
            가게 선택
          </label>
          <select
            id="store_id"
            value={formData.store_id}
            onChange={handleChange}
            name="store_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              가게 선택
            </option>
            {stores.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.store_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="menu_name"
            className="block text-sm font-medium text-gray-700"
          >
            메뉴 이름
          </label>
          <input
            id="menu_menuName"
            value={formData.menu_name}
            onChange={handleChange}
            name="menu_name"
            placeholder="메뉴 이름"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="menu_description"
            className="block text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <input
            id="menu_description"
            value={formData.menu_description}
            onChange={handleChange}
            name="menu_description"
            placeholder="설명"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="menu_price"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="menu_price"
            value={formData.menu_price}
            onChange={handleChange}
            name="menu_price"
            type="number"
            placeholder="가격"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="menu_imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            이미지 업로드
          </label>
          <input
            id="menu_imageUrl"
            type="file"
            name="menu_imageUrl"
            onChange={handleImageUpload}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          {uploadImgUrl && (
            <img
              src={uploadImgUrl}
              alt="Uploaded"
              className="mt-2 max-w-full h-auto rounded-lg"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="menu_cooking_time"
            className="block text-sm font-medium text-gray-700"
          >
            조리 시간 (분)
          </label>
          <input
            id="menu_cooking_time"
            value={formData.menu_cooking_time}
            onChange={handleChange}
            name="menu_cooking_time"
            type="number"
            placeholder="조리 시간 (분)"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="menu_difficulty"
            className="block text-sm font-medium text-gray-700"
          >
            난이도
          </label>
          <select
            id="menu_difficulty"
            value={formData.menu_difficulty}
            onChange={handleChange}
            name="menu_difficulty"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              난이도
            </option>
            <option value="Easy">쉬움</option>
            <option value="Medium">보통</option>
            <option value="Hard">어려움</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            재료
          </label>
          <IngredientsInput
            selectedIngredients={selectedIngredients}
            onChange={handleIngredientsChange}
          />
        </div>

        <div>
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-gray-700"
          >
            칼로리
          </label>
          <input
            id="calories"
            value={formData.menu_calories}
            onChange={handleChange}
            name="menu_calories"
            type="number"
            placeholder="칼로리"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            초기 수량
          </label>
          <input
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            name="quantity"
            type="number"
            placeholder="초기 수량"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          메뉴 등록
        </button>
      </form>
    </>
  );
};

export default MenuRegistrationForm;
