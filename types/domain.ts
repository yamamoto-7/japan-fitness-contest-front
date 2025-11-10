export type Organization = "FWJ" | "JBBF" | "IFBB" | "ALL";

export type Event = {
  id: number;
  name: string;
  organization: Organization;
  date: string;
  location?: string;
  participants?: string[];
};

export type Result = {
  id: number;
  event_id: number;
  category: string;
  rank: string;
  athlete_name: string;
  note?: string | null;
  created_at?: string;
  updated_at?: string;
};
