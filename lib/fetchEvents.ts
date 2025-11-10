import eventsData from "@/app/_data/events.json";
import type { Event } from "@/types/domain";

/**
 * 現状はローカルのモックを返すだけ。
 * 後でここを fetch(API_URL) に差し替える。
 */
export async function fetchEvents(): Promise<Event[]> {
  // 将来APIにする想定なので一応asyncにしておく
  return eventsData as Event[];
}

// TODO: Laravel環境作成後 
// const API_BASE =
//   process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// export async function fetchEvents(): Promise<Event[]> {
//   try {
//     const res = await fetch(`${API_BASE}/api/events`, {
//       // CSRのときだけcacheしないようにするならここでオプションつける
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("failed to fetch events");
//     }
//     const data = await res.json();
//     return data as Event[];
//   } catch (e) {
//     // 失敗したらとりあえず空配列返す or モックにフォールバック
//     return [];
//   }
// }
