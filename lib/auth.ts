let accessToken: string | null = null;
export function setAccessToken(t: string) { accessToken = t; }
export function getAccessToken() { return accessToken; }

export async function authedFetch(path: string, init: RequestInit = {}) {
  const withAuth = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return res;
  };

  let res = await withAuth();
  if (res.status === 401) {
    // refresh
    const ref = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (ref.ok) {
      const data = await ref.json();
      setAccessToken(data.access_token);
      res = await withAuth();
    }
  }
  return res;
}
