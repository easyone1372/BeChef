import React, { useState, useEffect } from "react";
import KitItem from "./KitItem";
import { Kit } from "../../atom/Kit/Kit";
import { fetchKits } from "../../atom/Kit/KitApi";

const KitPage = () => {
  const [kits, setKits] = useState<Kit[]>([]);

  useEffect(() => {
    const loadKits = async () => {

      const fetchedKits = await fetchKits(1);
      setKits(fetchedKits);
    };
    loadKits();
  }, []);

  const handleKitUpdate = (updatedKit: Kit) => {
    setKits(
      kits.map((kit) =>
        kit.mealKitId === updatedKit.mealKitId ? updatedKit : kit
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {kits.map((kit) => (
        <KitItem key={kit.mealKitId} kit={kit} onUpdate={handleKitUpdate} />
      ))}
    </div>
  );
};

export default KitPage;
