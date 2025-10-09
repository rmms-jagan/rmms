import React, { createContext, useContext, useEffect, useState } from "react";

interface GroupEntry {
  [key: string]: string;
}

interface ComponentContent {
  groups?: GroupEntry[]; // Explicit groups property
  [key: string]: string | GroupEntry[] | undefined;
}

interface ContentContextType {
  content: Record<string, ComponentContent>;
  loading: boolean;
  error?: string;
  language: string;
  setLanguage: (lang: string) => void;
}

const ContentContext = createContext<ContentContextType>({
  content: {},
  loading: true,
  language: "en",
  setLanguage: () => {},
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, ComponentContent>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en");

  // ✅ Fetch language-specific JSON
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(undefined);

      try {
        // Build URL for selected language
        const jsonUrl = new URL(
          `${import.meta.env.BASE_URL}content_${language}.json`,
          window.location.origin
        ).href;

        console.log(`🌐 Fetching content for [${language}] →`, jsonUrl);

        const res = await fetch(jsonUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${jsonUrl}: ${res.status}`);

        const data = await res.json();
        if (!data || !data.data) throw new Error("Invalid content format");

        setContent(data.data);
        console.log(`✅ Loaded CMS content (${language})`, data.data);
      } catch (err: any) {
        console.error(`❌ Error loading content for ${language}:`, err);

        // 🔁 fallback to English if available
        if (language !== "en") {
          try {
            const fallbackUrl = new URL(
              `${import.meta.env.BASE_URL}content_en.json`,
              window.location.origin
            ).href;
            console.warn("⚠️ Falling back to English:", fallbackUrl);
            const res = await fetch(fallbackUrl);
            const data = await res.json();
            setContent(data.data);
          } catch {
            setError(err.message);
          }
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  // ✅ Persist language choice
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <ContentContext.Provider value={{ content, loading, error, language, setLanguage }}>
      {children}
    </ContentContext.Provider>
  );
};

export function useContent(component: string): ComponentContent {
  const { content } = useContext(ContentContext);
  return content[component] || {};
}

export function useLanguage() {
  const { language, setLanguage } = useContext(ContentContext);
  return { language, setLanguage };
}
