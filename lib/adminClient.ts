const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export async function adminFetch(path: string, init: RequestInit = {}) {
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('adminToken');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init.headers || {}),
  };

  // ★ Authorization ヘッダ付与
  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers,
  });
  return res;
}
