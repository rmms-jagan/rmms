import React, { useEffect, useState, useCallback } from "react";
// @ts-ignore
import { getUserInfo } from "../../utils/userSession";
import { useTranslation } from "react-i18next";

interface WarehouseItem {
  warehouseId: string;
  warehouseName: string;
  warehouseCapacity: string;
  warehouseAddress: string;
}

const Warehouse: React.FC = () => {
  const { t } = useTranslation();
  const user = getUserInfo();
  const scriptUrl = user[10];

  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseCapacity, setWarehouseCapacity] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseList, setWarehouseList] = useState<WarehouseItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedWarehouse, setEditedWarehouse] = useState<WarehouseItem>({
    warehouseId: "",
    warehouseName: "",
    warehouseCapacity: "",
    warehouseAddress: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all warehouses
  const fetchWarehouseList = useCallback(async () => {
    try {
      setLoading(true);
      const formPayload = new FormData();
      formPayload.append("action", "getAllWarehouses");

      const response = await fetch(scriptUrl, { method: "POST", body: formPayload });
      const result = await response.json();

      if (result.success) {
        setWarehouseList(result.data || []);
      } else {
        console.error("Error fetching warehouses:", result.message);
      }
    } catch (err) {
      console.error("Failed to fetch warehouses:", err);
    } finally {
      setLoading(false);
    }
  }, [scriptUrl]);

  // 🔹 Add warehouse
  const addWarehouse = async () => {
    if (!warehouseName.trim() || !warehouseCapacity.trim() || !warehouseAddress.trim()) return;

    try {
      setLoading(true);
      const formPayload = new FormData();
      formPayload.append("action", "addWarehouse");
      formPayload.append("warehouseName", warehouseName);
      formPayload.append("warehouseCapacity", warehouseCapacity);
      formPayload.append("warehouseAddress", warehouseAddress);

      await fetch(scriptUrl, { method: "POST", body: formPayload });

      setWarehouseName("");
      setWarehouseCapacity("");
      setWarehouseAddress("");
      fetchWarehouseList();
    } catch (err) {
      console.error("Failed to add warehouse:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete warehouse
  const deleteWarehouse = async (warehouse: WarehouseItem) => {
    if (!window.confirm(`${t("warehouse.confirm_delete")} "${warehouse.warehouseName}"?`)) return;
    try {
      setLoading(true);
      const formPayload = new FormData();
      formPayload.append("action", "deleteWarehouse");
      formPayload.append("warehouseId", warehouse.warehouseId);
      await fetch(scriptUrl, { method: "POST", body: formPayload });
      fetchWarehouseList();
    } catch (err) {
      console.error("Failed to delete warehouse:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save edited warehouse
  const saveEditedWarehouse = async () => {
    if (
      !editedWarehouse.warehouseName.trim() ||
      !editedWarehouse.warehouseCapacity.trim() ||
      !editedWarehouse.warehouseAddress.trim()
    )
      return;

    try {
      setLoading(true);
      const formPayload = new FormData();
      formPayload.append("action", "editWarehouse");
      formPayload.append("warehouseId", editedWarehouse.warehouseId);
      formPayload.append("newWarehouseName", editedWarehouse.warehouseName);
      formPayload.append("newWarehouseCapacity", editedWarehouse.warehouseCapacity);
      formPayload.append("newWarehouseAddress", editedWarehouse.warehouseAddress);

      await fetch(scriptUrl, { method: "POST", body: formPayload });
      setEditingIndex(null);
      setEditedWarehouse({ warehouseId: "", warehouseName: "", warehouseCapacity: "", warehouseAddress: "" });
      fetchWarehouseList();
    } catch (err) {
      console.error("Failed to update warehouse:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouseList();
  }, [fetchWarehouseList]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        🏭 {t("warehouse.warehouse_settings")}
      </h2>

      {/* ➕ Add Warehouse Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder={t("warehouse.warehouse_name")}
          value={warehouseName}
          onChange={(e) => setWarehouseName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          placeholder={t("warehouse.warehouse_capacity")}
          value={warehouseCapacity}
          onChange={(e) => setWarehouseCapacity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder={t("warehouse.warehouse_address")}
          value={warehouseAddress}
          onChange={(e) => setWarehouseAddress(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={addWarehouse}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition font-semibold"
        >
          {loading ? t("warehouse.loading") : t("warehouse.add_warehouse")}
        </button>
      </div>

      {/* 🏗️ List of Warehouses */}
      {loading ? (
        <div className="text-center text-gray-500 mt-8">{t("warehouse.loading")}</div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {t("warehouse.current_warehouses")}
          </h3>
          {warehouseList.length === 0 ? (
            <p className="text-gray-500">{t("warehouse.no_warehouses_found")}</p>
          ) : (
            <ul className="space-y-4">
              {warehouseList.map((warehouse, index) => (
                <li
                  key={warehouse.warehouseId}
                  className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 hover:bg-gray-100 transition"
                >
                  {editingIndex === index ? (
                    <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                      <input
                        value={editedWarehouse.warehouseName}
                        onChange={(e) => setEditedWarehouse({ ...editedWarehouse, warehouseName: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-1"
                      />
                      <input
                        type="number"
                        value={editedWarehouse.warehouseCapacity}
                        onChange={(e) => setEditedWarehouse({ ...editedWarehouse, warehouseCapacity: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-1"
                      />
                      <input
                        value={editedWarehouse.warehouseAddress}
                        onChange={(e) => setEditedWarehouse({ ...editedWarehouse, warehouseAddress: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-1 w-48"
                      />
                      <button
                        onClick={saveEditedWarehouse}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        💾 {t("warehouse.save")}
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        ❌ {t("warehouse.cancel")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                      <div className="flex flex-col text-gray-700 space-y-1">
                        <span>
                          <strong>{t("warehouse.name")}:</strong> {warehouse.warehouseName}
                        </span>
                        <span>
                          <strong>{t("warehouse.capacity")}:</strong> {warehouse.warehouseCapacity}
                        </span>
                        <span>
                          <strong>{t("warehouse.address")}:</strong> {warehouse.warehouseAddress}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0">
                        <button
                          onClick={() => {
                            setEditingIndex(index);
                            setEditedWarehouse(warehouse);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          ✏️ {t("warehouse.edit")}
                        </button>
                        <button
                          onClick={() => deleteWarehouse(warehouse)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          🗑️ {t("warehouse.delete")}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Warehouse;
