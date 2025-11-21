"use client";

import Link from "next/link";

export default function EventCreateCompletePage() {
  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">大会一覧画面</h1>

      <div className="space-y-3">
        <Link
          href="/admin/events/new"
          className="block w-full rounded bg-blue-600 text-white py-2"
        >
          大会登録画面へ
        </Link>
      </div>

      <div>TODO: 大会一覧を表示する</div>
    </main>
  );
}
