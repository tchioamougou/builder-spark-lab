import { GraduationCap } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function TeachersPage() {
  return (
    <PlaceholderPage
      title="Gestion des enseignants"
      description="Gérez les dossiers, candidatures et assignations des enseignants"
      icon={<GraduationCap className="h-8 w-8 text-primary" />}
    />
  );
}
