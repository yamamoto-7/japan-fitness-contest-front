import type { Event } from "@/types/domain";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE}/api/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const raw = await res.json();

  const mapped: Event[] = raw.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      organization: item.organization,
      // 👇 カレンダーが見るのは date なので start_date をここに入れる
      date: item.start_date,
      location: item.location ?? "",
      participants: item.participants ?? [],
    };
  });

  return mapped;
}
