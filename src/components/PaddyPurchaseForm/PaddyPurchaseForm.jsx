import React, { useState } from "react";
import { getUserInfo } from "../../utils/userSession";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const PaddyPurchaseForm = ({ initialData = {}, onClose = () => {} }) => {
  const { t } = useTranslation();
  const user = getUserInfo();
  const editMode = !!initialData?.rmmPaddyRecordId;

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
    ...initialData,
  });

  const [paddyReceipt, setPaddyReceipt] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.receiptImage || null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaddyReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.paddyType || !formData.collectionCenter) {
      toast.error(t("common.validation_error"));
      return;
    }

    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("action", editMode ? "paddyPurchaseUpdateAction" : "paddyPurchaseAction");
    formPayload.append("rmmUserId", user[0]);
    if (editMode) formPayload.append("rmmPaddyRecordId", formData.rmmPaddyRecordId);
    formPayload.append("serialNo", formData.serialNo);
    formPayload.append("farmerName", formData.farmerName);
    formPayload.append("rememberFarmerName", formData.rememberFarmer ? "TRUE" : "FALSE");
    formPayload.append("farmerAddress", formData.address);
    formPayload.append("purchaseDate", formData.purchaseDate);
    formPayload.append("totalPaddyInKg", formData.totalPaddy);
    formPayload.append("perBagPrice", formData.perBagPrice);
    formPayload.append("farmerEmail", formData.email);
    formPayload.append("farmerMobile", formData.mobile);
    formPayload.append("typeOfPaddy", formData.paddyType);
    formPayload.append("paddyCollectFrom", formData.collectionCenter);
    formPayload.append("anyRemarks", "");

    const submitForm = async () => {
      try {
        const response = await fetch(user[10], { method: "POST", body: formPayload });
        const result = await response.json();
        toast.success(result.message || t("common.success"));
        onClose();
      } catch (err) {
        console.error("Error submitting form:", err);
        toast.error(t("common.error"));
      } finally {
        setLoading(false);
      }
    };

    if (paddyReceipt) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        formPayload.append("receiptImage", base64String);
        submitForm();
      };
      reader.readAsDataURL(paddyReceipt);
    } else {
      submitForm();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">
        {editMode ? t("paddy_form.title_edit") : t("paddy_form.title_add")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Collection Center */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("paddy_form.collection_center")}
          </label>
          <select
            name="collectionCenter"
            value={formData.collectionCenter}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">{t("paddy_form.collection_center_placeholder")}</option>
            <option value="LOCAL">Farmer/Local Business Vendor</option>
            <option value="MANDI">Mandi</option>
            <option value="OWN">Own</option>
          </select>
        </div>

        {/* Serial No */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("paddy_form.serial_no")}
          </label>
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Farmer Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("paddy_form.farmer_name")}
          </label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Remember Farmer */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="rememberFarmer"
            checked={formData.rememberFarmer}
            onChange={handleChange}
          />
          <span className="text-gray-700 text-sm">
            {t("paddy_form.remember_farmer")}
          </span>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("paddy_form.address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Mobile & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.mobile")}
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Date, Total Paddy, Price, Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.purchase_date")}
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.total_paddy")}
            </label>
            <input
              type="number"
              name="totalPaddy"
              value={formData.totalPaddy}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.per_bag_price")}
            </label>
            <input
              type="number"
              name="perBagPrice"
              value={formData.perBagPrice}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {t("paddy_form.paddy_type")}
            </label>
            <select
              name="paddyType"
              value={formData.paddyType}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Select</option>
              <option value="Masoori">Masoori</option>
              <option value="Tiki Masoori">Tiki Masoori</option>
              <option value="Sama">Sama</option>
              <option value="Sona Mossori">Sona Mossori</option>
              <option value="HMT">HMT</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("paddy_form.receipt_image")}
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Receipt Preview"
              className="w-32 h-32 mt-3 object-cover rounded-lg shadow cursor-pointer"
              onClick={() => setIsPopupOpen(true)}
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "..." : editMode ? t("common.update") : t("common.save")}
          </button>
        </div>
      </form>

      {/* Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <img src={previewUrl} alt="Full Receipt" className="max-h-[80vh] rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default PaddyPurchaseForm;
