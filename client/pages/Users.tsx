import { Users } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function UsersPage() {
  return (
    <PlaceholderPage
      title="Gestion des utilisateurs"
      description="Gérez les utilisateurs, rôles et permissions du système éducatif"
      icon={<Users className="h-8 w-8 text-primary" />}
    />
  );
}
