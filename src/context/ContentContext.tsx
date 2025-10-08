import React, { createContext, useContext, useEffect, useState } from "react";

interface GroupEntry {
    [key: string]: string;
}

interface ComponentContent {
    groups?: GroupEntry[];                       // Explicit groups property
    [key: string]: string | GroupEntry[] | undefined; // Allow strings, arrays, or undefined
}
interface ContentContextType {
    content: Record<string, ComponentContent>;
    loading: boolean;
    error?: string;
}

const ContentContext = createContext<ContentContextType>({
    content: {},
    loading: true,
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<Record<string, ComponentContent>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const jsonUrl = new URL(`${import.meta.env.BASE_URL}cache.json`, window.location.origin).href;
        console.log("🌀 Fetching content from:", jsonUrl);

        fetch(jsonUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch cache.json: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (!data || !data.data) throw new Error("Invalid content format");
                setContent(data.data);
                console.log("✅ CMS Content loaded:", data.data);
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

export function useContent(component: string): ComponentContent {
    const { content } = useContext(ContentContext);
    return content[component] || {};
}
