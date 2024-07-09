import axios from "axios";

// 가게 목록을 불러오는 함수
export const fetchStores = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/stores");
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

// 밀키트를 등록하는 함수
export const registerMealKit = async (formData: {
  storeId: number;
  mealKitName: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/mealkit",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering mealkit:", error);
    throw error;
  }
};
