import React, { useEffect, useState, useCallback } from "react";
// @ts-ignore
import { getUserInfo } from "../../utils/userSession";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";

const PPCSetting: React.FC = () => {
  const user = getUserInfo();
  const scriptUrl = user?.[10];
  const [ppcName, setPpcName] = useState("");
  const [ppcList, setPpcList] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedPPC, setEditedPPC] = useState("");

  const fetchPPCList = useCallback(async () => {
    if (!scriptUrl) return;
    try {
      const formPayload = new FormData();
      formPayload.append("action", "getAllPPCs");

      const response = await fetch(scriptUrl, { method: "POST", body: formPayload });
      const result = await response.json();

      if (result.success) {
        setPpcList(result.data || []);
      } else {
        console.error("Error fetching PPC list:", result.message);
      }
    } catch (err) {
      console.error("Failed to fetch PPC list:", err);
    }
  }, [scriptUrl]);

  const addPPC = async () => {
    if (!ppcName.trim() || !scriptUrl) return;
    try {
      const formPayload = new FormData();
      formPayload.append("action", "addPPC");
      formPayload.append("ppcName", ppcName);

      await fetch(scriptUrl, { method: "POST", body: formPayload });
      setPpcName("");
      fetchPPCList();
    } catch (err) {
      console.error("Failed to add PPC:", err);
    }
  };

  const deletePPC = async (ppc: string) => {
    if (!window.confirm(`Delete PPC "${ppc}"?`) || !scriptUrl) return;
    try {
      const formPayload = new FormData();
      formPayload.append("action", "deletePPC");
      formPayload.append("ppcName", ppc);

      await fetch(scriptUrl, { method: "POST", body: formPayload });
      fetchPPCList();
    } catch (err) {
      console.error("Failed to delete PPC:", err);
    }
  };

  const saveEditedPPC = async (originalPPC: string) => {
    if (!editedPPC.trim() || !scriptUrl) return;
    try {
      const formPayload = new FormData();
      formPayload.append("action", "editPPC");
      formPayload.append("originalPPC", originalPPC);
      formPayload.append("newPPC", editedPPC);

      await fetch(scriptUrl, { method: "POST", body: formPayload });
      setEditingIndex(null);
      setEditedPPC("");
      fetchPPCList();
    } catch (err) {
      console.error("Failed to update PPC:", err);
    }
  };

  useEffect(() => {
    fetchPPCList();
  }, [fetchPPCList]);

  return (
    <section className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            🏢 PPC Setting
          </h2>
          <p className="text-gray-600">
            Manage all PPC configurations for your rice mill.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-md border-0">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="text"
              value={ppcName}
              onChange={(e) => setPpcName(e.target.value)}
              placeholder="Enter PPC Name"
              className="flex-1"
            />
            <Button
              onClick={addPPC}
              className="bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add PPC
            </Button>
          </CardContent>
        </Card>

        {/* PPC List */}
        <Card className="shadow-md border-0">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 text-foreground">
              Current PPCs
            </h4>

            {ppcList.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No PPCs found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {ppcList.map((ppc, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3"
                  >
                    {editingIndex === index ? (
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Input
                          type="text"
                          value={editedPPC}
                          onChange={(e) => setEditedPPC(e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                            onClick={() => saveEditedPPC(ppc)}
                          >
                            <Save className="w-4 h-4" /> Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-gray-700 flex items-center gap-1"
                            onClick={() => setEditingIndex(null)}
                          >
                            <X className="w-4 h-4" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1 text-gray-700 font-medium">
                          {ppc}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingIndex(index);
                              setEditedPPC(ppc);
                            }}
                            className="flex items-center gap-1 text-blue-600 border-blue-300"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deletePPC(ppc)}
                            className="flex items-center gap-1 text-red-600 border-red-300"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PPCSetting;
