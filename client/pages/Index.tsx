import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  UserCheck,
  School,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const stats = [
  {
    title: "Étudiants inscrits",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Enseignants actifs",
    value: "156",
    change: "+3%",
    changeType: "positive" as const,
    icon: GraduationCap,
  },
  {
    title: "Programmes académiques",
    value: "24",
    change: "0%",
    changeType: "neutral" as const,
    icon: BookOpen,
  },
  {
    title: "Année académique courante",
    value: "2023-2024",
    change: "Semestre 2",
    changeType: "neutral" as const,
    icon: Calendar,
  },
];

const recentActivities = [
  {
    id: 1,
    type: "inscription",
    title: "Nouvelle inscription validée",
    description: "Marie Dupont - Pharmacie Année 1",
    time: "Il y a 2 heures",
    icon: UserCheck,
    status: "success",
  },
  {
    id: 2,
    type: "demande",
    title: "Demande d'absence en attente",
    description: "Jean Martin - Médecine Année 3",
    time: "Il y a 4 heures",
    icon: Clock,
    status: "pending",
  },
  {
    id: 3,
    type: "programme",
    title: "Nouvelle maquette créée",
    description: "Pharmacie Année 2 - Séquence 1",
    time: "Il y a 1 jour",
    icon: FileText,
    status: "info",
  },
  {
    id: 4,
    type: "enseignant",
    title: "Candidature enseignant approuvée",
    description: "Dr. Sophie Laurent - Anatomie",
    time: "Il y a 2 jours",
    icon: CheckCircle,
    status: "success",
  },
];

const pendingTasks = [
  {
    id: 1,
    title: "Valider 12 demandes d'inscription",
    priority: "high",
    module: "Scolarité",
  },
  {
    id: 2,
    title: "Réviser 3 candidatures enseignants",
    priority: "medium",
    module: "RH",
  },
  {
    id: 3,
    title: "Finaliser calendrier séquence 2",
    priority: "high",
    module: "Administration",
  },
  {
    id: 4,
    title: "Traiter 8 justificatifs d'absence",
    priority: "low",
    module: "Scolarité",
  },
];

export default function Index() {
  const navigate = useNavigate();

  const handlePendingTask = (taskTitle: string, module: string) => {
    // Navigate based on task type and module
    if (taskTitle.includes("demandes d'inscription") || module === "Scolarité") {
      navigate('/students');
    } else if (taskTitle.includes("candidatures enseignants") || module === "RH") {
      navigate('/teachers');
    } else if (taskTitle.includes("calendrier")) {
      navigate('/academic-years');
    } else if (taskTitle.includes("justificatifs")) {
      navigate('/files');
    } else {
      navigate('/admin');
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Tableau de bord
          </h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre établissement d'enseignement supérieur
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5" />
                <span>Activités récentes</span>
              </CardTitle>
              <CardDescription>
                Dernières actions dans le système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-100 text-green-600"
                          : activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Tâches en attente</span>
              </CardTitle>
              <CardDescription>
                Actions nécessitant votre attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority === "high"
                            ? "Urgent"
                            : task.priority === "medium"
                              ? "Moyen"
                              : "Faible"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.module}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePendingTask(task.title, task.module)}
                    >
                      Traiter
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accès direct aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                variant="outline"
                onClick={() => navigate('/user-management')}
              >
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Gérer les utilisateurs</span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                variant="outline"
                onClick={() => navigate('/programs')}
              >
                <BookOpen className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Programmes académiques</span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                variant="outline"
                onClick={() => navigate('/files')}
              >
                <FileText className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">Demandes en attente</span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                variant="outline"
                onClick={() => navigate('/academic-years')}
              >
                <Calendar className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">Calendrier académique</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
