import React, { useState, useEffect } from "react";
import KitList from "../organisms/Kit/KitList";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import { fetchKits, fetchStores } from "../atom/Kit/KitApi";
import { Kit } from "../atom/Kit/Kit";

const InventoryManagementPage = () => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [stores, setStores] = useState<
    { storeId: number; storeName: string }[]
  >([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      const fetchedStores = await fetchStores();
      setStores(fetchedStores);
      if (fetchedStores.length > 0) {
        setSelectedStoreId(fetchedStores[0].storeId);
      }
    };
    loadStores();
  }, []);

  useEffect(() => {
    const loadKits = async () => {
      if (selectedStoreId) {
        const fetchedKits = await fetchKits(selectedStoreId);
        setKits(fetchedKits);
      }
    };
    loadKits();
  }, [selectedStoreId]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStoreId(Number(event.target.value));
  };

  const handleKitUpdate = (updatedKit: Kit) => {
    setKits(
      kits.map((kit) =>
        kit.mealKitId === updatedKit.mealKitId ? updatedKit : kit
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
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
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
