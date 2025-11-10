"use client";

import Link from "next/link";
import type { Event } from "@/types/domain";
import { formatDate, orgBadgeClass } from "@/lib/utils";
import Layout from "@/components/Layout";
import PageTitle from '../components/PageTitle';
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/fetchEvents";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    // 今はローカルJSONを返すだけ
    fetchEvents().then(setEvents);
  }, []);

  // 日付が新しい順にして上から3つくらい
  const sorted = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const upcoming = sorted.slice(0, 3);

  return (
    <Layout>
      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Hero */}
        <section className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <h1 className="text-3xl font-bold mb-2 text-red-700">Japan Fitness Contest Info</h1>
          <p className="text-gray-700 mb-4">
            JBBF・FWJ・日本人IFBBプロ選手の大会情報一覧を確認できるサイトです。
          </p>
          <div className="flex gap-3">
            <Link
              href="/calendar"
              className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              大会カレンダーへ
            </Link>
            <Link
              href="/results"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-700 border border-blue-100 hover:bg-blue-50 transition"
            >
              結果一覧へ
            </Link>
          </div>
        </section>

        {/* 直近の大会 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <PageTitle title="直近の大会" />
          </div>
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-gray-500">現在予定されている大会はありません。</p>
            ) : (
              upcoming.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between rounded-lg border bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      {formatDate(ev.date)} / {ev.location ?? "場所未定"}
                    </p>
                    <h3 className="text-gray-700 font-semibold">{ev.name}</h3>
                  </div>
                  <span className={orgBadgeClass(ev.organization)}>
                    {ev.organization}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
