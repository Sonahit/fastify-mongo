export const parseToken = (t?: string) => t && t.split(/\s+/).filter(Boolean).pop();
