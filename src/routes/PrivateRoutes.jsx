import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Inventory from "../components/Inventory/Inventory";
import PaddyPurchaseForm from "../components/PaddyPurchaseForm/PaddyPurchaseForm";
import PaddyPurchaseReport from "../components/PaddyPurchaseForm/PaddyPurchaseReport";
import TransitPassList from "../components/Transit/TransitPassList/TransitPassList";
import ViewTransitPassForm from "../components/Transit/ViewTransitPassForm/ViewTransitPassForm";
import GoodsSalesVoucherForm from "../components/GoodsSalesVoucherForm/GoodsSalesVoucherForm";
import Customers from "../components/Customers/Customers";
import Reports from "../components/Reports/Reports";
import Settings from "../components/Settings/Settings";
import Profile from "../components/Profile/Profile";
import SalesVoucherCardView from "../components/report/SalesVoucherCardView/SalesVoucherCardView";
import GoodsPaymentForm from "../components/GoodsPaymentForm/GoodsPaymentForm";
import AttendanceForm from "../components/AttendanceForm/AttendanceForm";

export default function PrivateRoutes({ onLogout }) {
  return (
    <>
      <Navbar logout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/paddyPurchaseForm" element={<PaddyPurchaseForm />} />
        <Route path="/paddyPurchaseReport" element={<PaddyPurchaseReport />} />
        <Route path="/viewTransitPass" element={<TransitPassList />} />
        <Route path="/viewTransitPassForm" element={<ViewTransitPassForm />} />
        <Route path="/transit-pass/edit" element={<ViewTransitPassForm mode="edit" />} />
        <Route path="/goodsSalesVoucherForm" element={<GoodsSalesVoucherForm />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/attendanceForm" element={<AttendanceForm />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/goodsPaymentForm" element={<GoodsPaymentForm />} />
        <Route path="/paddyPaymentForm" element={<GoodsPaymentForm />} />
        <Route path="/salesVoucherCardView" element={<SalesVoucherCardView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
