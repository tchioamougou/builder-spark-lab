import { BookOpen } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function ProgramsPage() {
  return (
    <PlaceholderPage
      title="Programmes académiques"
      description="Gérez les filières, maquettes, séquences, domaines, modules et UE"
      icon={<BookOpen className="h-8 w-8 text-primary" />}
    />
  );
}
