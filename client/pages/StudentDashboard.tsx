import StudentLayout from "@/components/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { generateBulletinPDF } from "@/lib/pdf-utils";
import AbsenceRequestDialog from "@/components/AbsenceRequestDialog";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Bell,
  User,
  CreditCard,
} from "lucide-react";

const recentGrades = [
  {
    id: 1,
    ue: "Anatomie générale",
    note: 15.5,
    coefficient: 3,
    date: "2024-01-18",
    type: "Examen final",
  },
  {
    id: 2,
    ue: "Chimie organique",
    note: 13.2,
    coefficient: 2,
    date: "2024-01-15",
    type: "Contrôle continu",
  },
  {
    id: 3,
    ue: "Physiologie",
    note: 16.8,
    coefficient: 3,
    date: "2024-01-12",
    type: "TP",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Examen Pharmacologie",
    date: "2024-01-25",
    time: "09:00",
    room: "Amphi A",
    type: "Examen",
  },
  {
    id: 2,
    title: "TP Chimie analytique",
    date: "2024-01-23",
    time: "14:00",
    room: "Labo 3",
    type: "TP",
  },
  {
    id: 3,
    title: "Cours Anatomie",
    date: "2024-01-22",
    time: "10:00",
    room: "Amphi B",
    type: "Cours",
  },
];

const notifications = [
  {
    id: 1,
    title: "Nouveau bulletin disponible",
    message: "Votre bulletin de la séquence 1 est disponible",
    date: "2024-01-20",
    type: "bulletin",
    read: false,
  },
  {
    id: 2,
    title: "Rappel: Inscription stage",
    message: "N'oubliez pas de vous inscrire pour votre stage",
    date: "2024-01-19",
    type: "reminder",
    read: false,
  },
  {
    id: 3,
    title: "Demande absence approuvée",
    message: "Votre demande d'absence du 15/01 a été approuvée",
    date: "2024-01-18",
    type: "approval",
    read: true,
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [isAbsenceDialogOpen, setIsAbsenceDialogOpen] = useState(false);

  const handleDownloadBulletin = () => {
    if (user) {
      generateBulletinPDF(user);
    }
  };

  const getGradeColor = (note: number) => {
    if (note >= 16) return "text-green-600";
    if (note >= 14) return "text-blue-600";
    if (note >= 12) return "text-orange-600";
    if (note >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Examen":
        return "bg-red-100 text-red-800";
      case "TP":
        return "bg-blue-100 text-blue-800";
      case "Cours":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bulletin":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "reminder":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bonjour, {user?.nom.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord - {user?.filiere} {user?.niveau}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Moyenne générale
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.5/20</div>
              <p className="text-xs text-muted-foreground">
                +0.3 depuis le dernier semestre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Crédits validés
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45/60</div>
              <p className="text-xs text-muted-foreground">
                75% de progression
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prochains examens
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Statut financier
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">À jour</div>
              <p className="text-xs text-muted-foreground">
                Dernier paiement: 15/01/2024
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Dernières notes</span>
              </CardTitle>
              <CardDescription>Vos notes les plus récentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{grade.ue}</div>
                      <div className="text-sm text-muted-foreground">
                        {grade.type} • Coef. {grade.coefficient} •{" "}
                        {new Date(grade.date).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <div
                      className={`text-xl font-bold ${getGradeColor(grade.note)}`}
                    >
                      {grade.note}/20
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <FileText className="h-4 w-4 mr-2" />
                Voir toutes mes notes
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Emploi du temps</span>
              </CardTitle>
              <CardDescription>Vos prochains cours et examens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("fr-FR")} à{" "}
                        {event.time} • {event.room}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getEventTypeColor(event.type)}
                    >
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                Voir tout l'emploi du temps
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications récentes</span>
            </CardTitle>
            <CardDescription>Messages et alertes importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    notification.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-medium ${!notification.read ? "text-blue-900" : "text-gray-900"}`}
                    >
                      {notification.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {notification.message}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Bell className="h-4 w-4 mr-2" />
              Voir toutes les notifications
            </Button>
          </CardContent>
        </Card>

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
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Download className="h-6 w-6" />
                <span>Télécharger bulletin</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Clock className="h-6 w-6" />
                <span>Signaler absence</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Demander attestation</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <User className="h-6 w-6" />
                <span>Mettre à jour profil</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
