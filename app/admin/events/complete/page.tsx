// app/admin/events/complete/page.tsx
"use client";

import Link from "next/link";

export default function EventCreateCompletePage() {
  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">大会登録</h1>
      <p className="mb-6 text-green-500 font-medium">登録しました🎉</p>

      <div className="space-y-3">
        <Link
          href="/admin/events"
          className="block w-full rounded bg-blue-600 text-white py-2"
        >
          大会一覧へ戻る
        </Link>
        <Link
          href="/admin/events/new"
          className="block w-full rounded border border-gray-300 py-2"
        >
          もう一件登録する
        </Link>
      </div>
    </main>
  );
}
