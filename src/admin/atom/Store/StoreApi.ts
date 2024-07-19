import axios from "axios";
import { Store } from "./Store";

const API_URL = "http://localhost:3001/api";

const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get<Store[]>(`${API_URL}/stores`);
  return response.data;
};

export default fetchStores;
