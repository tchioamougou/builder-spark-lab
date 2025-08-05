import TeacherLayout from "@/components/TeacherLayout";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  GraduationCap,
  Award,
  Target,
  Bell,
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
    moyenneClasse: 14.2,
    tauxPresence: 92,
  },
  {
    id: 2,
    nom: "Physiologie spécialisée",
    filiere: "Médecine Année 2",
    etudiants: 38,
    prochainCours: "2024-01-23 14:00",
    salle: "Salle 205",
    notesEnAttente: 0,
    moyenneClasse: 15.8,
    tauxPresence: 88,
  },
  {
    id: 3,
    nom: "TP Anatomie",
    filiere: "Kinésithérapie Année 1",
    etudiants: 22,
    prochainCours: "2024-01-24 09:00",
    salle: "Labo 3",
    notesEnAttente: 5,
    moyenneClasse: 13.5,
    tauxPresence: 95,
  },
];

const upcomingSessions = [
  {
    id: 1,
    title: "Anatomie générale - Cours magistral",
    time: "10:00 - 12:00",
    date: "2024-01-22",
    salle: "Amphi B",
    etudiants: 45,
    type: "course",
  },
  {
    id: 2,
    title: "TP Anatomie - Système nerveux",
    time: "14:00 - 16:00",
    date: "2024-01-22",
    salle: "Labo 3",
    etudiants: 22,
    type: "tp",
  },
  {
    id: 3,
    title: "Physiologie - Examen partiel",
    time: "08:00 - 10:00",
    date: "2024-01-23",
    salle: "Salle 205",
    etudiants: 38,
    type: "exam",
  },
];

const recentMessages = [
  {
    id: 1,
    student: "Marie Dupont",
    subject: "Question sur le cours d'anatomie",
    time: "Il y a 2h",
    unread: true,
  },
  {
    id: 2,
    student: "Jean Martin",
    subject: "Demande de rendez-vous",
    time: "Il y a 5h",
    unread: true,
  },
  {
    id: 3,
    student: "Sophie Bernard",
    subject: "Rattrapage TP",
    time: "Hier",
    unread: false,
  },
];

const teachingStats = [
  {
    label: "Heures de cours ce mois",
    value: 48,
    total: 60,
    icon: Clock,
    color: "blue",
  },
  {
    label: "Étudiants suivis",
    value: 127,
    trend: "+12%",
    icon: Users,
    color: "green",
  },
  {
    label: "Notes à saisir",
    value: 23,
    urgent: true,
    icon: BarChart3,
    color: "orange",
  },
  {
    label: "Satisfaction moyenne",
    value: 4.7,
    total: 5,
    icon: Star,
    color: "purple",
  },
];

export default function TeacherDashboard() {
  const { user } = useAuth();

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "exam":
        return AlertCircle;
      case "tp":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case "exam":
        return "text-red-600 bg-red-50 border-red-200";
      case "tp":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-purple-600 bg-purple-50 border-purple-200";
    }
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      orange: "text-orange-600 bg-orange-50",
      purple: "text-purple-600 bg-purple-50",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bonjour, {user?.nom} ! 👨‍🏫
              </h1>
              <p className="text-white/80 text-lg">
                {user?.specialite} • Enseignant à l'EPFPS
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-white/80">Étudiants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-white/80">Cours aujourd'hui</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-white/80">Notes à saisir</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachingStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Card
                  className={`border-l-4 hover:shadow-lg transition-shadow ${
                    stat.color === "blue"
                      ? "border-l-blue-500"
                      : stat.color === "green"
                        ? "border-l-green-500"
                        : stat.color === "orange"
                          ? "border-l-orange-500"
                          : "border-l-purple-500"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                          <p
                            className={`text-2xl font-bold ${
                              stat.color === "blue"
                                ? "text-blue-600"
                                : stat.color === "green"
                                  ? "text-green-600"
                                  : stat.color === "orange"
                                    ? "text-orange-600"
                                    : "text-purple-600"
                            }`}
                          >
                            {stat.value}
                            {stat.total && `/${stat.total}`}
                          </p>
                          {stat.trend && (
                            <span className="text-sm text-green-600 font-medium">
                              {stat.trend}
                            </span>
                          )}
                          {stat.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-full ${getStatColor(stat.color)}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    {stat.total && stat.label.includes("Heures") && (
                      <div className="mt-4">
                        <Progress
                          value={(stat.value / stat.total) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.total - stat.value} heures restantes ce mois
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Classes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Mes Classes
                    </CardTitle>
                    <CardDescription>
                      Vue d'ensemble de vos enseignements
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Gérer tout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myClasses.map((classe, index) => (
                    <motion.div
                      key={classe.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {classe.nom}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {classe.filiere}
                          </p>
                        </div>
                        {classe.notesEnAttente > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {classe.notesEnAttente} notes
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {classe.etudiants}
                          </div>
                          <div className="text-xs text-gray-500">Étudiants</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {classe.moyenneClasse}
                          </div>
                          <div className="text-xs text-gray-500">Moyenne</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {classe.tauxPresence}%
                          </div>
                          <div className="text-xs text-gray-500">Présence</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          {new Date(classe.prochainCours).toLocaleString()}
                        </div>
                        <div className="text-gray-600">{classe.salle}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Séances à venir
                </CardTitle>
                <CardDescription>
                  Vos cours et examens aujourd'hui et demain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSessions.map((session, index) => {
                    const Icon = getSessionIcon(session.type);
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className={`p-3 border rounded-lg ${getSessionColor(session.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white/50">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{session.title}</h5>
                            <div className="text-sm opacity-80 mt-1">
                              {session.time} • {session.salle}
                            </div>
                            <div className="text-xs opacity-70 mt-1">
                              {session.etudiants} ��tudiants
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Messages and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Messages récents
                    </CardTitle>
                    <CardDescription>
                      Communications avec vos étudiants
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {recentMessages.filter((m) => m.unread).length} non lus
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className={`p-3 rounded-lg border hover:shadow-sm transition-shadow ${
                        message.unread
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-gray-900">
                              {message.student}
                            </h5>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {message.subject}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Actions rapides
                </CardTitle>
                <CardDescription>
                  Accès direct aux fonctionnalités principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button className="justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Saisir des notes</div>
                        <div className="text-xs opacity-80">
                          23 notes en attente
                        </div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Gérer les étudiants</div>
                        <div className="text-xs opacity-80">127 étudiants</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Créer un document</div>
                        <div className="text-xs opacity-80">
                          Cours, exercices, etc.
                        </div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Signaler absences</div>
                        <div className="text-xs opacity-80">
                          Pour les cours d'aujourd'hui
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TeacherLayout>
  );
}
