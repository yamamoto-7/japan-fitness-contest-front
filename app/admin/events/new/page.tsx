'use client';
import { useState } from 'react';
import { adminFetch } from '@/lib/adminClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EventNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '', organization: 'FWJ', start_date: '', end_date: '',
    location: '', official_url: '', is_published: true, participants: '' // カンマ区切り入力
  });
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false); // 送信中フラグ

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;        // 多重送信ガード
    setSubmitting(true);
    setMsg('');

    const payload = {
      ...form,
      participants: form.participants
        ? form.participants.split(',').map(s=>s.trim()).filter(Boolean)
        : [],
    };
    const res = await adminFetch('/api/admin/events', {
      method:'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type':'application/json' }
    });

    if (res.ok) {
      router.push('/admin/events/complete');
    } else {
      setMsg('登録に失敗しました');
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">大会登録</h1>
      <form onSubmit={submit} className="grid gap-3">
        <input className="border rounded px-3 py-2" placeholder="大会名"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <select className="border rounded px-3 py-2"
                value={form.organization} onChange={e=>setForm({...form, organization:e.target.value as any})}>
          <option value="FWJ">FWJ</option><option value="JBBF">JBBF</option><option value="IFBB">IFBB</option>
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" className="border rounded px-3 py-2"
                 value={form.start_date} onChange={e=>setForm({...form, start_date:e.target.value})}/>
          <input type="date" className="border rounded px-3 py-2"
                 value={form.end_date} onChange={e=>setForm({...form, end_date:e.target.value})}/>
        </div>
        <input className="border rounded px-3 py-2" placeholder="開催地"
               value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
        <input className="border rounded px-3 py-2" placeholder="公式URL"
               value={form.official_url} onChange={e=>setForm({...form, official_url:e.target.value})}/>
        {/* TODO: 出場選手の登録 */}
        {/* <input className="border rounded px-3 py-2" placeholder="出場選手（カンマ区切り）"
               value={form.participants} onChange={e=>setForm({...form, participants:e.target.value})}/> */}
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_published}
                 onChange={e=>setForm({...form, is_published:e.target.checked})}/>
          公開する
        </label>
        <button
          className="rounded bg-blue-600 text-white py-2 disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? '登録中…' : '登録'}
        </button>
      </form>
      {msg && <p className="text-sm">{msg}</p>}

      <div className="">
        <Link
          href="/admin/events"
          className="rounded bg-gray-600 text-white py-2 disabled:opacity-60"
        >
          大会一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
