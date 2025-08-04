import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              {icon || (
                <Construction className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Cette page est en cours de développement. Continuez à interagir
              avec l'assistant pour implémenter le contenu spécifique de cette
              section.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au tableau de bord
                </Link>
              </Button>
              <Button>Demander l'implémentation</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
