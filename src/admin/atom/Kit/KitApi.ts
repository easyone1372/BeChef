import axios from "axios";
import { Kit } from "./Kit";

const API_URL = "http://localhost:3001/api";

export const fetchKits = async (store_id: number): Promise<Kit[]> => {
  const response = await axios.get(`${API_URL}/inventory/${store_id}`);
  return response.data;
};

export const updateMenuQuantity = async (
  store_id: number,
  menu_id: number,
  quantity: number
): Promise<Kit> => {
  const response = await axios.put(
    `${API_URL}/inventory/${store_id}/${menu_id}`,
    {
      quantity,
    }
  );
  return response.data;
};

export const fetchStores = async (): Promise<
  { store_id: number; store_name: string }[]
> => {
  const response = await axios.get(`${API_URL}/stores`);
  return response.data;
};
