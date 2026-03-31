import { DashboardShell } from "@/components/DashboardShell";
import clubsData from "@/data/clubs.json";
import type { Club } from "@/lib/types";

const clubs = clubsData as Club[];

export default function HomePage() {
  return <DashboardShell clubs={clubs} />;
}
