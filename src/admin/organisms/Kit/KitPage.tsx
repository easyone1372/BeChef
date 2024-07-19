
import React, { useState, useEffect } from "react";
import KitItem from "./KitItem";
import { Kit } from "../../atom/Kit/Kit";
import axios from "axios";

const KitPage = () => {
  const [kits, setKits] = useState<Kit[]>([]);

  useEffect(() => {
    const loadKits = async () => {
      try {
        const response = await axios.get<Kit[]>("/api/inventory/1");
        setKits(response.data);
      } catch (error) {
        console.error("Error fetching kits:", error);
      }
    };
    loadKits();
  }, []);

  const handleKitUpdate = (updatedKit: Kit) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.menu_id === updatedKit.menu_id ? updatedKit : kit
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {kits.map((kit) => (
        <KitItem key={kit.menu_id} kit={kit} onUpdate={handleKitUpdate} />
      ))}
    </div>
  );
};

export default KitPage;
