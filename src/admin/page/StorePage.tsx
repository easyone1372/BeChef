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
        <div key={store.store_id}>
          <p>Store Name: {store.store_name}</p>
          <p>Address: {store.store_address}</p>
          <p>Phone: {store.store_phone}</p>
        </div>
      ))}
    </div>
  );
};

export default StorePage;
