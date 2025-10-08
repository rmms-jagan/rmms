import { useEffect, useState } from "react";

interface SheetRow {
  Component: string;
  Field: string;
  Value: string;
}

export function useLiveSheetContent(sheetUrl: string, interval = 15000) {
  const [data, setData] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch(sheetUrl + "&cacheBust=" + Date.now());
      const csvText = await res.text();
      const lines = csvText.trim().split("\n");

      const content: Record<string, Record<string, string>> = {};
      for (let i = 1; i < lines.length; i++) {
        const [component, field, ...rest] = lines[i].split(",");
        const value = rest.join(","); // handles commas in text
        if (!content[component]) content[component] = {};
        content[component][field] = value;
      }
      setData(content);
      setLoading(false);
    } catch (err) {
      console.error("❌ Failed to fetch sheet content", err);
    }
  }

  useEffect(() => {
    fetchData(); // initial load
    const timer = setInterval(fetchData, interval);
    return () => clearInterval(timer);
  }, [sheetUrl, interval]);

  return { data, loading };
}
