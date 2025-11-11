// "use client";

// import { useEffect, useMemo, useState } from "react";
// import type { Event, Result, Organization } from "@/types/domain";
// import { formatDate, orgBadgeClass } from "@/lib/utils";
// import Layout from "@/components/Layout";
// import PageTitle from "@/components/PageTitle";
// import { fetchEvents } from "@/lib/fetchEvents";
// import { fetchResults } from "@/lib/fetchResults";

// export default function ResultsPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   useEffect(() => {
//     // 今はローカルJSONを返すだけ
//     fetchEvents().then(setEvents);
//   }, []);

//   const [results, setResults] = useState<Result[]>([]);
//   useEffect(() => {
//     // 今はローカルJSONを返すだけ
//     fetchResults().then(setResults);
//   }, []);

//   // 組織の選択肢は events から引っ張る
//   const organizations = Array.from(
//     new Set(events.map((e) => e.organization)),
//   ) as Organization[];

//   const [selectedOrg, setSelectedOrg] = useState<Organization | "ALL">("ALL");

//   // event_id → event を引けるように
//   const eventMap = useMemo(() => {
//     const m = new Map<number, Event>();
//     events.forEach((e) => m.set(e.id, e));
//     return m;
//   }, []);

//   // 絞り込み
//   const filtered = useMemo(() => {
//     return results.filter((r) => {
//       const ev = eventMap.get(r.event_id);
//       if (!ev) return false; // イベントがなければ表示しない
//       if (selectedOrg === "ALL") return true;
//       return ev.organization === selectedOrg;
//     });
//   }, [results, eventMap, selectedOrg]);

//   return (
//     <Layout>
//       <main className="mx-auto max-w-4xl px-4 py-8">
//         <PageTitle title="大会結果" />

//         {/* 組織フィルタ */}
//         <div className="mb-6 flex flex-wrap gap-3">
//           <button
//             onClick={() => setSelectedOrg("ALL")}
//             className={`rounded-md px-4 py-2 text-sm font-medium transition ${
//               selectedOrg === "ALL"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             すべて
//           </button>
//           {organizations.map((org) => (
//             <button
//               key={org}
//               onClick={() => setSelectedOrg(org)}
//               className={`rounded-md px-4 py-2 text-sm font-medium transition ${
//                 selectedOrg === org
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {org}
//             </button>
//           ))}
//         </div>

//         {/* 結果一覧 */}
//         <div className="space-y-3">
//           {filtered.length === 0 ? (
//             <p className="text-gray-700">該当する結果がありません。</p>
//           ) : (
//             filtered.map((res) => {
//               const ev = eventMap.get(res.event_id);
//               if (!ev) return null;

//               return (
//                 <div
//                   key={res.id}
//                   className="rounded-lg border bg-white px-4 py-3 space-y-2"
//                 >
//                   <div className="flex items-center justify-between gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">
//                         {formatDate(ev.date)}・{ev.location ?? "場所未定"}
//                       </p>
//                       <h2 className="text-gray-800 font-semibold">
//                         {ev.name}
//                       </h2>
//                     </div>
//                     <span className={orgBadgeClass(ev.organization)}>
//                       {ev.organization}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
//                     <span className="rounded bg-gray-100 px-2 py-1">
//                       {res.category}
//                     </span>
//                     <span className="rounded bg-blue-50 px-2 py-1 font-semibold">
//                       {res.rank}位
//                     </span>
//                     <span>{res.athlete_name}</span>
//                     {res.note ? (
//                       <span className="text-gray-400 text-xs">※{res.note}</span>
//                     ) : null}
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </main>
//     </Layout>
//   );
// }
