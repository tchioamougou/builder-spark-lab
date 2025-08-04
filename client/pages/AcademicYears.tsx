import { Calendar } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function AcademicYearsPage() {
  return (
    <PlaceholderPage
      title="Années académiques"
      description="Gérez les années académiques et calendriers de séquences"
      icon={<Calendar className="h-8 w-8 text-primary" />}
    />
  );
}
