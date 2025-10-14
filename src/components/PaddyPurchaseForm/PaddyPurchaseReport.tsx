import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TablePagination,
  CircularProgress,
  TextField,
} from "@mui/material";
// @ts-ignore
import { getUserInfo } from "../../utils/userSession";
// @ts-ignore
import PaddyPurchaseForm from "./PaddyPurchaseForm";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Branding.css"; // ✅ Consistent theme styles (e.g. green gradient, shadows)

interface PaddyRow {
  [index: number]: string;
}

const mapRowToFormData = (row: PaddyRow) => ({
  rmmPaddyRecordId: row[0] || "",
  serialNo: row[3] || "",
  farmerName: row[4] || "",
  address: row[5] || "",
  email: row[6] || "",
  mobile: row[7] || "",
  purchaseDate: row[8] || "",
  totalPaddy: row[10] || "",
  perBagPrice: row[11] || "",
  paddyType: row[15] || "",
  receiptImage: row[14] || "",
  collectionCenter: row[16] || "",
  rememberFarmer: row[18] || false,
});

const PaddyPurchaseReport: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [paddyData, setPaddyData] = useState<PaddyRow[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  // ✅ Stable script URL
  const scriptUrl = useMemo(() => {
    const user = getUserInfo();
    return user?.[10] || "";
  }, []);

  // ✅ Fetch Data
  const fetchPaddyReport = useCallback(async () => {
    if (!scriptUrl) return;
    setLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("action", "paddyPurchaseReport");
      const response = await fetch(scriptUrl, { method: "POST", body: formPayload });
      const result = await response.json();

      if (result.status === "Success" && Array.isArray(result.message)) {
        const cleanedData = result.message[0].slice(1);
        setPaddyData(cleanedData);
      } else {
        console.error("Error fetching data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  }, [scriptUrl]);

  useEffect(() => {
    fetchPaddyReport();
  }, [fetchPaddyReport]);

  // ✅ Filter logic
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setPage(0);
  };

  const handleEditClick = (row: PaddyRow) => {
    setSelectedRow(mapRowToFormData(row));
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setSelectedRow(null);
  };

  const filteredRows = paddyData.filter((row) => {
    const search = filterText.toLowerCase();
    return (
      row[4]?.toLowerCase().includes(search) ||
      row[5]?.toLowerCase().includes(search) ||
      row[7]?.toLowerCase().includes(search) ||
      row[8]?.toLowerCase().includes(search)
    );
  });

  // ✅ Pagination
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-primary-gradient">
          🌾 {t("paddy.report_title") || "Paddy Purchase Report"}
        </h2>
        <div className="flex gap-3 mt-3 md:mt-0">
          <TextField
            size="small"
            variant="outlined"
            label={t("common.search") || "Search"}
            placeholder="Farmer, Address, Mobile..."
            value={filterText}
            onChange={handleFilterChange}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/paddy-purchase-form")}
            sx={{
              background:
                "linear-gradient(to right, #16a34a, #15803d)",
              color: "white",
              fontWeight: "bold",
              "&:hover": { background: "linear-gradient(to right, #15803d, #166534)" },
            }}
          >
            ➕ {t("paddy.add_new_record") || "Add New Record"}
          </Button>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-green-50">
            <tr className="text-green-700 font-semibold">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">{t("paddy.farmer_name")}</th>
              <th className="p-2 text-left">{t("paddy.address")}</th>
              <th className="p-2 text-left">{t("paddy.mobile")}</th>
              <th className="p-2 text-left">{t("paddy.purchase_date")}</th>
              <th className="p-2 text-left">{t("paddy.total_paddy")}</th>
              <th className="p-2 text-left">{t("paddy.per_bag_price")}</th>
              <th className="p-2 text-left">{t("paddy.paddy_type")}</th>
              <th className="p-2 text-left">{t("paddy.collection_center")}</th>
              <th className="p-2 text-center">{t("common.action")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-4 text-gray-500">
                  {t("paddy.no_records_found") || "No records found"}
                </td>
              </tr>
            ) : (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="p-2">{page * rowsPerPage + index + 1}</td>
                    <td className="p-2">{row[4]}</td>
                    <td className="p-2">{row[5]}</td>
                    <td className="p-2">{row[7]}</td>
                    <td className="p-2">{row[8]}</td>
                    <td className="p-2">{row[10]}</td>
                    <td className="p-2">{row[11]}</td>
                    <td className="p-2">{row[15]}</td>
                    <td className="p-2">{row[16]}</td>
                    <td className="p-2 text-center">
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => handleEditClick(row)}
                      >
                        ✏️ {t("common.edit") || "Edit"}
                      </Button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 12, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* 🔹 Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle className="bg-green-100 text-green-900 font-semibold">
          ✏️ {t("paddy.edit_record") || "Edit Paddy Purchase"}
        </DialogTitle>
        <DialogContent>
          <PaddyPurchaseForm initialData={selectedRow} onClose={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="outlined">
            {t("common.close") || "Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaddyPurchaseReport;
