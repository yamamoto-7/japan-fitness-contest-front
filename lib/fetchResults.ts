import resultsData from "@/app/_data/results.json";
import type { Result } from "@/types/domain";

/**
 * 現状はローカルのモックを返すだけ。
 * 後でここを fetch(API_URL) に差し替える。
 */
export async function fetchResults(): Promise<Result[]> {
  // 将来APIにする想定なので一応asyncにしておく
  return resultsData as Result[];
}
