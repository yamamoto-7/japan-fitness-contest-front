"use client";

import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { formatDate, orgBadgeClass } from "@/lib/utils";
import type { Event } from "@/types/domain";
import PageTitle from "@/components/PageTitle";
import { fetchEvents } from "@/lib/fetchEvents";
import Loading from "@/components/Loading";

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(toDateKey(today));

  const calendarDays = useMemo(
    () => buildCalendarDays(year, month),
    [year, month],
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach((ev) => {
      const key = toDateKey(new Date(ev.date));
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    });
    return map;
  }, [events]);

  const selectedEvents = eventsByDate.get(selectedDate) ?? [];

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  
  if (loading) {
    return <Loading />
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* 見出し */}
        <header className="space-y-2">
          <PageTitle title="大会情報" />
          <p className="text-sm text-slate-500">
            カレンダーの日付をクリックすると、その日の大会が下に表示されます。
          </p>
        </header>

        {/* カレンダーカード */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                ←
              </button>
              <div className="text-sm font-semibold text-slate-800">
                {year}年 {month + 1}月
              </div>
              <button
                onClick={handleNextMonth}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                →
              </button>
            </div>
          </div>

          {/* 曜日 */}
          <div className="grid grid-cols-7 rounded-lg overflow-hidden border border-slate-100">
            <div className="col-span-7 grid grid-cols-7 bg-slate-50 text-center text-xs text-slate-500">
              {["日", "月", "火", "水", "木", "金", "土"].map((w) => (
                <div key={w} className="py-2">
                  {w}
                </div>
              ))}
            </div>
            {/* 日付 */}
            <div className="col-span-7 grid grid-cols-7 bg-slate-100 gap-px">
              {calendarDays.map((day) => {
                const key = toDateKey(day.date);
                const hasEvents = eventsByDate.has(key);
                const isCurrentMonth = day.inCurrentMonth;
                const isSelected = selectedDate === key;
                const eventsOfDay = hasEvents ? eventsByDate.get(key)! : [];

                return (
                  <button
                    key={key + day.inCurrentMonth}
                    onClick={() => setSelectedDate(key)}
                    className={[
                      // ← 高さを決めつつ縦方向に並べる
                      "relative h-24 px-1 pt-1 text-left transition flex flex-col",
                      isCurrentMonth
                        ? "bg-white text-slate-700"
                        : "bg-slate-50 text-slate-300",
                      isSelected ? "ring-2 ring-blue-400 z-10" : "",
                    ].join(" ")}
                  >
                    {/* 日付は一番上に固定 */}
                    <div className="text-xs">{day.date.getDate()}</div>

                    {/* イベント表示は下側に寄せる */}
                    {eventsOfDay.length > 0 && (
                      <div className="mt-auto space-y-1 pb-1">
                        {eventsOfDay.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            className="truncate rounded bg-blue-50 px-1 text-[10px] text-blue-700"
                          >
                            {ev.name}
                          </div>
                        ))}
                        {eventsOfDay.length > 2 ? (
                          <div className="text-[10px] text-slate-400">…</div>
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 選択日の大会一覧 */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-600">
            {selectedDate.replaceAll("-", "/")} の大会
          </h2>
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-slate-400">
                この日には登録された大会がありません。
              </p>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3"
                  >
                    <div>
                      <p className="text-xs text-slate-400">
                        {formatDate(ev.date)}・{ev.location ?? "場所未定"}
                      </p>
                      <h3 className="text-slate-800 font-semibold">
                        {ev.name}
                      </h3>
                      {ev.participants && ev.participants.length > 0 ? (
                        <p className="text-xs text-slate-500 mt-1">
                          出場選手:{" "}
                          {renderParticipantsShort(ev.participants)}
                        </p>
                      ) : null}
                    </div>
                    <span className={orgBadgeClass(ev.organization)}>
                      {ev.organization}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function buildCalendarDays(year: number, month: number) {
  // 今月の1日
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay(); // 0:日
  // 今月の末日
  const lastDay = new Date(year, month + 1, 0); // 翌月0日＝今月末
  const daysInMonth = lastDay.getDate();

  const days: { date: Date; inCurrentMonth: boolean }[] = [];

  // 前月分を埋める
  for (let i = 0; i < startDayOfWeek; i++) {
    const d = new Date(year, month, 1 - (startDayOfWeek - i));
    days.push({ date: d, inCurrentMonth: false });
  }

  // 今月分
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), inCurrentMonth: true });
  }

  // 42マス（7x6）になるまで次月を入れる
  while (days.length < 42) {
    const last = days[days.length - 1].date;
    const next = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() + 1,
    );
    days.push({
      date: next,
      inCurrentMonth: next.getMonth() === month,
    });
  }

  return days;
}

function toDateKey(d: Date) {
  // yyyy-mm-dd
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// 参加者 3人以上なら「... ほかX名」
function renderParticipantsShort(list: string[]) {
  if (list.length <= 2) {
    return list.join("、");
  }
  const firstTwo = list.slice(0, 2).join("、");
  const restCount = list.length - 2;
  return `${firstTwo}、... ほか${restCount}名`;
}