import axios from "axios";
import { Kit } from "./Kit";

const API_URL = "http://localhost:3001/api";

export const fetchKits = async (storeId: number): Promise<Kit[]> => {
  const response = await axios.get<Kit[]>(`${API_URL}/inventory/${storeId}`);
  return response.data;
};

export const updateKitCount = async (
  storeId: number,
  mealKitId: number,
  newQuantity: number
): Promise<Kit> => {
  const response = await axios.put<Kit>(
    `${API_URL}/inventory/${storeId}/${mealKitId}`,
    {
      quantity: newQuantity,
    }
  );
  return response.data;
};

export const fetchStores = async (): Promise<
  { storeId: number; storeName: string }[]
> => {
  const response = await axios.get(`${API_URL}/stores`);
  return response.data;
};
