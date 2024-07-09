import { useState } from "react";
import MyMap from "../atom/maps/MyMap";
import Search from "../organisms/Search/Search";

interface Store {
  storeId: number;
  storeName: string;
  address: string;
  menuName: string;
  latitude: number;
  longitude: number;
  img: string;
}
const MapPage = () => {
  const [results, setResults] = useState<Store[]>([]); // Store[] 타입으로 초기화
  return (
    <div className="flex h-screen gap-3">
      <Search setResults={setResults} />+
      <div className="flex-grow">
        <MyMap results={results} />
      </div>
    </div>
  );
};
export default MapPage;
