import { Building2 } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function AdminPage() {
  return (
    <PlaceholderPage
      title="Administration"
      description="Configuration système et paramètres administratifs"
      icon={<Building2 className="h-8 w-8 text-primary" />}
    />
  );
}
