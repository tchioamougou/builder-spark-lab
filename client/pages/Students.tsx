import { UserCog } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function StudentsPage() {
  return (
    <PlaceholderPage
      title="Gestion des étudiants"
      description="Gérez les dossiers centralisés et portail étudiant"
      icon={<UserCog className="h-8 w-8 text-primary" />}
    />
  );
}
