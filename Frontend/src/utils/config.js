const RAW_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://speccheck-5.onrender.com').toString();

// Sanitize misconfigured values like trailing 'null' and redundant slashes
const CLEAN_BASE = RAW_BASE.replace(/null$/i, '').replace(/\/+$/, '');

export const API_BASE = CLEAN_BASE || 'https://speccheck-5.onrender.com';

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export function fileUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (typeof pathOrUrl === 'string' && /^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(String(pathOrUrl), `${API_BASE}/`).toString();
}
