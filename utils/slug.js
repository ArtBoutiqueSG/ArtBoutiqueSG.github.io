// utils/slug.js
export function toSlug(text) {
  if (!text) return "";
  // normalize spaces, trim
  text = String(text).trim().toLowerCase();

  // replace multiple spaces/tabs/newlines with single space
  text = text.replace(/\s+/g, "-");

 
  return text || "";
}