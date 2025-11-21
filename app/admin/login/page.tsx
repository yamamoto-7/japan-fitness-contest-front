'use client';
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/adminClient";
import { setAccessToken } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function AdminLogin() {
  const [loginID,setLoginID]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const router = useRouter();

  // ★ ログイン済なら強制リダイレクト
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        router.replace("/admin/events"); // ← 無限ループを避けるため replace を使う
      }
    }
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const res = await adminFetch('/api/admin/login', {
      method:'POST',
      body: JSON.stringify({ 
        login_id: loginID,
        password,
     }),
    });
    if (!res.ok) {
      setErr('ログインに失敗しました');
      return;
    }
    const data = await res.json(); // { access_token, expires_in ... }

    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', data.access_token);
    }
    
    router.push('/admin/events/');
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-xl font-semibold mb-4">管理ログイン</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="login ID"
               value={loginID} onChange={e=>setLoginID(e.target.value)} />
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full rounded bg-blue-600 text-white py-2">ログイン</button>
      </form>
    </main>
  );
}
