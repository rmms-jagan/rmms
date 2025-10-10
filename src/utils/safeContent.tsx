// utils/safeContent.ts
export function safeText(value: unknown, fallback = ""): string {
    return typeof value === "string" ? value : fallback;
  }
  