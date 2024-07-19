import React, { useState, useEffect } from "react";
import KitList from "../organisms/Kit/KitList";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import axios from "axios";
import { Kit } from "../atom/Kit/Kit";

const InventoryManagementPage = () => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [stores, setStores] = useState<
    { store_id: number; store_name: string }[]
  >([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stores");
        const fetchedStores = response.data;
        setStores(fetchedStores);
        if (fetchedStores.length > 0) {
          setSelectedStoreId(fetchedStores[0].store_id);
          console.log("store: ", fetchedStores);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    loadStores();
  }, []);

  useEffect(() => {
    const loadKits = async () => {
      if (selectedStoreId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/inventory/${selectedStoreId}`
          );
          const fetchedKits: Kit[] = response.data.map((item: any) => ({
            menu_id: item.menu_id,
            menu_name: item.menu_name,
            menu_description: item.menu_description,
            menu_price: item.menu_price,
            menu_image_url: item.menu_image_url,
            quantity: item.quantity,
            store_id: item.store_id,
            store_name: item.store_name,
          }));
          console.log(fetchedKits);
          setKits(fetchedKits);
        } catch (error) {
          console.error("Error fetching kits:", error);
        }
      }
    };
    loadKits();
  }, [selectedStoreId, stores]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStoreId(Number(event.target.value));
  };

  const handleKitUpdate = (updatedKit: Kit) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.menu_id === updatedKit.menu_id ? updatedKit : kit
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">재고 관리</h1>
            <div className="mb-6">
              <select
                value={selectedStoreId || ""}
                onChange={handleStoreChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {stores.map((store) => (
                  <option key={store.store_id} value={store.store_id}>
                    {store.store_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <KitList kits={kits} onUpdateKit={handleKitUpdate} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagementPage;
