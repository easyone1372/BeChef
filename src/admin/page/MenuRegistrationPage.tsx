import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import MenuRegistrationForm from "../organisms/MenuRegistration/MenuRegistrationForm";

export type Store = {
  store_id: number;
  store_name: string;
};

type FormData = {
  store_id: string;
  menu_name: string;
  menu_description: string;
  menu_price: string;
  menu_image_url: string;
  menu_cooking_time: string;
  menu_difficulty: string;
  menu_calories: string;
  quantity: string;
};

const MenuRegistrationPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadStores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        setMessage("가게 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };
    loadStores();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    // 데이터 유효성 검사
    if (
      !formData.store_id ||
      !formData.menu_name ||
      !formData.menu_description ||
      !formData.menu_price ||
      !formData.menu_image_url ||
      !formData.menu_cooking_time ||
      !formData.menu_difficulty ||
      !formData.menu_calories ||
      !formData.quantity
    ) {
      setMessage("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/mealkit", {
        ...formData,
        store_id: Number(formData.store_id),
        menu_price: Number(formData.menu_price),
        cooking_time: Number(formData.menu_cooking_time),
        calories: Number(formData.menu_calories),
        quantity: Number(formData.quantity),
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering mealkit:", error);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(
          `밀키트 등록 중 오류가 발생했습니다: ${
            error.response.data.details || error.response.data.error
          }`
        );
      } else {
        setMessage("밀키트 등록 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (menu_id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/mealkit/${menu_id}`);
      setMessage("밀키트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting mealkit:", error);
      setMessage("밀키트 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                메뉴 등록
              </h3>
            </div>
            {message && (
              <div className="px-4 py-3 bg-green-100 text-green-700">
                {message}
              </div>
            )}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <MenuRegistrationForm
                  stores={stores}
                  onSubmit={handleSubmit}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuRegistrationPage;
