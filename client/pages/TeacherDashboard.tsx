import TeacherLayout from "@/components/TeacherLayout";
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
import {
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";

const myClasses = [
  {
    id: 1,
    nom: "Anatomie générale",
    filiere: "Pharmacie Année 1",
    etudiants: 45,
    prochainCours: "2024-01-22 10:00",
    salle: "Amphi B",
    notesEnAttente: 12,
  },
  {
    id: 2,
    nom: "Physiologie spécialisée",
    filiere: "Médecine Année 2",
    etudiants: 38,
    prochainCours: "2024-01-23 14:00",
    salle: "Salle 205",
    notesEnAttente: 0,
  },
  {
    id: 3,
    nom: "TP Anatomie",
    filiere: "Kinésithérapie Année 1",
    etudiants: 22,
    prochainCours: "2024-01-24 09:00",
    salle: "Labo 1",
    notesEnAttente: 22,
  },
];

const todaySchedule = [
  {
    id: 1,
    time: "09:00 - 10:30",
    title: "Cours Anatomie générale",
    class: "Pharmacie Année 1",
    room: "Amphi B",
    type: "Cours magistral",
  },
  {
    id: 2,
    time: "14:00 - 15:30",
    title: "TP Physiologie",
    class: "Médecine Année 2",
    room: "Labo 3",
    type: "Travaux pratiques",
  },
  {
    id: 3,
    time: "16:00 - 17:00",
    title: "Réunion pédagogique",
    class: "Équipe enseignante",
    room: "Salle de réunion",
    type: "Réunion",
  },
];

const recentMessages = [
  {
    id: 1,
    from: "Marie Dupont",
    subject: "Question sur le cours d'anatomie",
    preview: "Bonjour professeur, j'aurais une question concernant...",
    date: "2024-01-20",
    read: false,
  },
  {
    id: 2,
    from: "Secrétariat",
    subject: "Planning des examens finalisé",
    preview: "Le planning des examens de fin de semestre est...",
    date: "2024-01-19",
    read: true,
  },
  {
    id: 3,
    from: "Jean Martin",
    subject: "Demande de rendez-vous",
    preview: "Pourriez-vous me recevoir cette semaine pour...",
    date: "2024-01-18",
    read: false,
  },
];

const studentStats = [
  {
    filiere: "Pharmacie Année 1",
    moyenne: 13.8,
    taux_reussite: 82,
    absences: 5,
  },
  {
    filiere: "Médecine Année 2",
    moyenne: 15.2,
    taux_reussite: 89,
    absences: 2,
  },
  {
    filiere: "Kinésithérapie Année 1",
    moyenne: 14.1,
    taux_reussite: 86,
    absences: 3,
  },
];

export default function TeacherDashboard() {
  const { user } = useAuth();

  const getGradeColor = (moyenne: number) => {
    if (moyenne >= 16) return "text-green-600";
    if (moyenne >= 14) return "text-blue-600";
    if (moyenne >= 12) return "text-orange-600";
    return "text-red-600";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cours magistral":
        return "bg-blue-100 text-blue-800";
      case "Travaux pratiques":
        return "bg-green-100 text-green-800";
      case "Réunion":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bonjour, {user?.nom}!
          </h2>
          <p className="text-muted-foreground">
            Espace enseignant - {user?.specialite}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mes étudiants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                Répartis sur 3 filières
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cours cette semaine
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12h</div>
              <p className="text-xs text-muted-foreground">
                8 séances programmées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notes à saisir
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">
                2 évaluations en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Messages non lus
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Questions étudiants
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* My Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Mes cours</span>
              </CardTitle>
              <CardDescription>
                Vue d'ensemble de vos enseignements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myClasses.map((classe) => (
                  <div key={classe.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{classe.nom}</div>
                        <div className="text-sm text-muted-foreground">
                          {classe.filiere}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {classe.etudiants} étudiants
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(classe.prochainCours).toLocaleDateString(
                              "fr-FR",
                            )}
                          </span>
                        </div>
                      </div>
                      {classe.notesEnAttente > 0 && (
                        <Badge variant="destructive">
                          {classe.notesEnAttente} notes
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Gérer tous mes cours
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Emploi du temps aujourd'hui</span>
              </CardTitle>
              <CardDescription>Vos cours et réunions du jour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between border-l-4 border-primary pl-4"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.class}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.room}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{event.time}</div>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(event.type)}
                      >
                        {event.type}
                      </Badge>
                    </div>
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

        {/* Student Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Statistiques de mes classes</span>
            </CardTitle>
            <CardDescription>
              Performance et suivi de vos étudiants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {studentStats.map((stat, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="font-medium mb-2">{stat.filiere}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Moyenne classe:</span>
                      <span
                        className={`font-medium ${getGradeColor(stat.moyenne)}`}
                      >
                        {stat.moyenne}/20
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux de réussite:</span>
                      <span className="font-medium">{stat.taux_reussite}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Absences cette semaine:</span>
                      <span className="font-medium">{stat.absences}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Messages récents</span>
            </CardTitle>
            <CardDescription>
              Communications avec vos étudiants et collègues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    message.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-medium ${!message.read ? "text-blue-900" : "text-gray-900"}`}
                    >
                      {message.subject}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      De: {message.from}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {message.preview}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(message.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  {!message.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <MessageSquare className="h-4 w-4 mr-2" />
              Voir tous les messages
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
                <BarChart3 className="h-6 w-6" />
                <span>Saisir des notes</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Voir mes étudiants</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Créer un document</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Clock className="h-6 w-6" />
                <span>Signaler absence</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
