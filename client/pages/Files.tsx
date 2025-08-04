import { FileText } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function FilesPage() {
  return (
    <PlaceholderPage
      title="Gestion des dossiers"
      description="Gérez les documents, demandes et justificatifs"
      icon={<FileText className="h-8 w-8 text-primary" />}
    />
  );
}
