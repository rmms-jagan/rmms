import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../utils/userSession";

const PaddyPurchaseForm = ({ initialData = {}, onClose }) => {
  const { t } = useTranslation();
  const user = getUserInfo();
  const safeData = initialData || {};
  const editMode = !!safeData?.rmmPaddyRecordId;

  const [formData, setFormData] = useState({
    rmmPaddyRecordId: "",
    serialNo: "",
    farmerName: "",
    rememberFarmer: false,
    address: "",
    email: "",
    mobile: "",
    purchaseDate: "",
    totalPaddy: "",
    receiptImage: "",
    perBagPrice: "",
    paddyType: "",
    collectionCenter: "",
    ...safeData,
  });

  const [paddyReceipt, setPaddyReceipt] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(safeData?.receiptImage ?? null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaddyReceipt(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    onClose?.();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
          {editMode ? t("paddy.edit_record") : t("paddy.add_new_record")}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Farmer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("paddy.farmer_name")}
          </label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("paddy.mobile")}
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("paddy.address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("paddy.purchase_date")}
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Total Paddy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("paddy.total_paddy")}
            </label>
            <input
              type="number"
              name="totalPaddy"
              value={formData.totalPaddy}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("paddy.per_bag_price")}
            </label>
            <input
              type="number"
              name="perBagPrice"
              value={formData.perBagPrice}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Paddy Type & Collection Center */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("paddy.paddy_type")}
            </label>
            <input
              type="text"
              name="paddyType"
              value={formData.paddyType}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("paddy.collection_center")}
            </label>
            <input
              type="text"
              name="collectionCenter"
              value={formData.collectionCenter}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Receipt Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("paddy.receipt_image")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Receipt Preview"
              className="w-32 h-32 object-cover mt-3 rounded-lg shadow-md border border-gray-200"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={handlePopupClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
          >
            {editMode ? t("common.update") : t("common.save")}
          </button>
        </div>
      </form>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {t("paddy.record_saved_successfully")}
            </p>
            <button
              onClick={handlePopupClose}
              className="mt-5 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PaddyPurchaseForm.defaultProps = {
  initialData: {},
  onClose: () => {},
};

export default PaddyPurchaseForm;
