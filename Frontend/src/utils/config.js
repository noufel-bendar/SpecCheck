const RAW_BASE = String(import.meta.env.VITE_API_BASE_URL || 'https://speccheck-5.onrender.com').trim();

// Fix common misconfigs: trailing "null", missing colon in protocol, trailing slashes
let CLEAN_BASE = RAW_BASE
  // remove trailing 'null' optionally followed by a slash
  .replace(/null\/?$/i, '')
  // fix 'https//' or 'http//' by inserting the missing ':'
  .replace(/^(https?)(\/\/)/i, '$1:$2')
  // trim trailing slashes
  .replace(/\/+$/, '');

export const API_BASE = CLEAN_BASE || 'https://speccheck-5.onrender.com';

export function apiUrl(path) {
  const normalized = String(path || '').startsWith('/') ? String(path) : `/${String(path || '')}`;
  return `${API_BASE}${normalized}`;
}

export function fileUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  let s = String(pathOrUrl).trim();
  // fix 'https//' or 'http//' missing colon
  s = s.replace(/^(https?)(\/\/)/i, '$1:$2');
  // already an absolute URL
  if (/^https?:\/\//i.test(s)) return s;
  // if a protocol-relative URL like //host/path
  if (s.startsWith('//')) return new URL(s, `${API_BASE}/`).toString();
  // if the string accidentally embeds a full URL later, extract it
  const httpsIdx = s.indexOf('https://');
  if (httpsIdx > 0) return s.slice(httpsIdx);
  const httpIdx = s.indexOf('http://');
  if (httpIdx > 0) return s.slice(httpIdx);
  // treat as relative to API_BASE
  const rel = s.startsWith('/') ? s : `/${s}`;
  return `${API_BASE}${rel}`;
}
