import React, { useState } from "react";
import { getUserInfo } from "../../utils/userSession";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import "../../utils/Form.css";

const PaddyPurchaseForm = ({ initialData = {}, onClose }) => {
  const { t } = useTranslation();
  const user = getUserInfo();
  const editOrAdd = initialData?.rmmPaddyRecordId ? t("common.update") : t("common.save");

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
  const [previewUrl, setPreviewUrl] = useState(initialData?.receiptImage || null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle file upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaddyReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paddyType || !formData.collectionCenter) {
      toast.error(t("paddy_form.validation_select_required"));
      return;
    }

    const formPayload = new FormData();
    formPayload.append(
      "action",
      initialData?.rmmPaddyRecordId ? "paddyPurchaseUpdateAction" : "paddyPurchaseAction"
    );
    formPayload.append("rmmUserId", user[0]);
    if (initialData?.rmmPaddyRecordId) {
      formPayload.append("rmmPaddyRecordId", initialData.rmmPaddyRecordId);
    }
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

    const submitData = async () => {
      try {
        const response = await fetch(user[10], {
          method: "POST",
          body: formPayload,
        });
        const result = await response.json();
        toast.success(result.message || t("paddy_form.submit_success"));
        if (onClose) onClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(t("paddy_form.submit_error"));
      }
    };

    // If image uploaded, convert to base64
    if (paddyReceipt) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        formPayload.append("receiptImage", base64String);
        submitData();
      };
      reader.readAsDataURL(paddyReceipt);
    } else {
      submitData();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-4">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        {t("paddy_form.title_add")}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Collection Center */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.collection_center")}
          </label>
          <select
            name="collectionCenter"
            value={formData.collectionCenter}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.serial_no")}
          </label>
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Farmer Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.farmer_name")}
          </label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Remember Farmer */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            name="rememberFarmer"
            checked={formData.rememberFarmer}
            onChange={handleChange}
          />
          <label>{t("paddy_form.remember_farmer")}</label>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Email & Mobile */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.mobile")}
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.purchase_date")}
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Total Paddy & Price */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.total_paddy")}
          </label>
          <input
            type="number"
            name="totalPaddy"
            value={formData.totalPaddy}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.per_bag_price")}
          </label>
          <input
            type="number"
            name="perBagPrice"
            value={formData.perBagPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Paddy Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.paddy_type")}
          </label>
          <select
            name="paddyType"
            value={formData.paddyType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">{t("paddy_form.paddy_type")}</option>
            <option value="Masoori">Masoori</option>
            <option value="Tiki Masoori">Tiki Masoori</option>
            <option value="Sama">Sama</option>
            <option value="Sona Mossori">Sona Mossori</option>
            <option value="HMT">HMT</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Receipt Upload */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t("paddy_form.receipt_image")}
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="Receipt Preview"
                className="w-32 h-32 object-cover rounded-lg cursor-pointer border"
                onClick={() => setIsPopupOpen(true)}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editOrAdd}
          </button>
        </div>
      </form>

      {/* Image Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <img
            src={previewUrl}
            alt="Full Receipt"
            className="max-w-full max-h-[80vh] rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PaddyPurchaseForm;
