import React, { useState, useEffect } from "react";
import {
  fetchStores,
  registerMealKit,
} from "../atom/MenuRegistration/registerApi";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import MenuRegistrationForm from "../organisms/MenuRegistration/MenuRegistrationForm";
import axios from "axios";

const MenuRegistrationPage: React.FC = () => {
  const [stores, setStores] = useState<
    { storeId: number; storeName: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const fetchedStores = await fetchStores();
        setStores(fetchedStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
        alert("가게 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };
    loadStores();
  }, []);

  const handleSubmit = async (formData: {
    storeId: number;
    mealKitName: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }) => {
    setIsLoading(true);
    try {
      const response = await registerMealKit(formData);

      if (response) {
        alert("밀키트가 성공적으로 등록되었습니다.");
        // 여기에 폼 초기화 또는 다른 후속 작업을 추가할 수 있습니다.
      }
    } catch (error) {
      console.error("Error registering mealkit:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버에서 응답을 받았지만 2xx 범위가 아닌 상태 코드가 반환된 경우
          alert(
            `밀키트 등록 중 오류가 발생했습니다: ${
              error.response.data.message || error.message
            }`
          );
        } else if (error.request) {
          // 요청이 전송되었지만 응답을 받지 못한 경우
          alert(
            "서버에서 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요."
          );
        } else {
          // 요청 설정 중에 오류가 발생한 경우
          alert(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
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
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <MenuRegistrationForm
                  stores={stores}
                  onSubmit={handleSubmit}
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
