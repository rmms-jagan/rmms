import React, { createContext, useContext, useEffect, useState } from "react";

interface ContentEntry {
  component: string;
  key: string;
  value: string;
}

interface ContentContextType {
  content: Record<string, Record<string, string>>;
  loading: boolean;
  error?: string;
}

const ContentContext = createContext<ContentContextType>({
  content: {},
  loading: true,
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // ✅ Use Vite's base URL dynamically
    const jsonUrl = `${import.meta.env.BASE_URL}cache.json`;
    console.log("🌀 Fetching content from:", jsonUrl);

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // ✅ Transform flat sheet data into { component: { key: value } } shape
        const grouped: Record<string, Record<string, string>> = {};
        data.data.forEach((item: ContentEntry) => {
          if (!grouped[item.component]) grouped[item.component] = {};
          grouped[item.component][item.key] = item.value;
        });

        setContent(grouped);
        console.log("✅ Content loaded:", grouped);
      })
      .catch((err) => {
        console.error("❌ Error loading content:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
};

export function useContent(component: string) {
  const { content } = useContext(ContentContext);
  return content[component] || {};
}
