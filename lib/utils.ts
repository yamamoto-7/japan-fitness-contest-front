import type { Organization } from "@/types/domain";

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function orgBadgeClass(org: Organization) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  switch (org) {
    case "FWJ":
      return `${base} bg-blue-100 text-blue-700`;
    case "JBBF":
      return `${base} bg-red-100 text-red-700`;
    case "IFBB":
      return `${base} bg-purple-100 text-purple-700`;
  }
}

// 参加者 3人以上なら「... ほか」
export function renderParticipantsShort(list: string[]) {
  if (list.length <= 2) {
    return list.join("、");
  }
  const firstTwo = list.slice(0, 2).join("、");
  const restCount = list.length - 2;
  return `${firstTwo}、... ほか${restCount}名`;
}
