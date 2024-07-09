import { useEffect, useState } from "react";
import { Store } from "../atom/Store/Store";
import fetchStores from "../atom/Store/StoreApi";

const StorePage = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const getStores = async () => {
      const storesData = await fetchStores();
      setStores(storesData);
    };
    getStores();
  }, []);

  return (
    <div>
      {stores.map((store) => (
        <div key={store.storeId}>
          <p>Store Name: {store.storeName}</p>
          <p>Address: {store.storeAddress}</p>
          <p>Phone: {store.storePhone}</p>
        </div>
      ))}
    </div>
  );
};

export default StorePage;
