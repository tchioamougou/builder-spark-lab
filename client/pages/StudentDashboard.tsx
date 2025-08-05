import StudentLayout from "@/components/StudentLayout";
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
  GraduationCap,
  Award,
  Target,
  Activity,
} from "lucide-react";

const recentGrades = [
  {
    id: 1,
    ue: "Anatomie générale",
    note: 15.5,
    coefficient: 3,
    date: "2024-01-18",
    type: "Examen final",
    status: "excellent",
  },
  {
    id: 2,
    ue: "Chimie organique",
    note: 13.2,
    coefficient: 2,
    date: "2024-01-15",
    type: "Contrôle continu",
    status: "good",
  },
  {
    id: 3,
    ue: "Physiologie",
    note: 16.8,
    coefficient: 3,
    date: "2024-01-12",
    type: "TP",
    status: "excellent",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Examen - Microbiologie",
    date: "2024-01-25",
    time: "08:00",
    type: "exam",
    salle: "Amphi A",
  },
  {
    id: 2,
    title: "TP - Histologie",
    date: "2024-01-26",
    time: "14:00",
    type: "tp",
    salle: "Labo 2",
  },
  {
    id: 3,
    title: "Cours - Pharmacologie",
    date: "2024-01-27",
    time: "10:00",
    type: "course",
    salle: "Salle 15",
  },
];

const achievements = [
  {
    id: 1,
    title: "Étudiant exemplaire",
    description: "Moyenne > 15/20 pendant 3 mois consécutifs",
    icon: Award,
    earned: true,
    date: "Déc 2023",
  },
  {
    id: 2,
    title: "Participation active",
    description: "100% de présence aux TP",
    icon: Activity,
    earned: true,
    date: "Jan 2024",
  },
  {
    id: 3,
    title: "Objectif atteint",
    description: "Validation de tous les modules",
    icon: Target,
    earned: false,
    progress: 85,
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const handleDownloadBulletin = () => {
    if (user) {
      generateBulletinPDF(user);
    }
  };

  const getGradeColor = (note: number) => {
    if (note >= 16) return "text-green-600 bg-green-50";
    if (note >= 14) return "text-blue-600 bg-blue-50";
    if (note >= 12) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return AlertCircle;
      case "tp":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "exam":
        return "text-red-600 bg-red-50";
      case "tp":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-purple-600 bg-purple-50";
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header Section with Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bonjour, {user?.nom} ! 👋
              </h1>
              <p className="text-white/80 text-lg">
                {user?.filiere} • {user?.niveau} • {user?.numeroEtudiant}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">14.5</div>
                <div className="text-sm text-white/80">Moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-white/80">Présence</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Moyenne générale</p>
                    <p className="text-2xl font-bold text-blue-600">14.5/20</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={72.5} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">+0.3 ce mois</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Crédits validés</p>
                    <p className="text-2xl font-bold text-green-600">45/60</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    15 crédits restants
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Prochains examens</p>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-full">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    Dans les 7 prochains jours
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Statut financier</p>
                    <p className="text-sm font-bold text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />À jour
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    Dernière échéance payée
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Dernières Notes
                    </CardTitle>
                    <CardDescription>
                      Vos résultats les plus récents
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <motion.div
                      key={grade.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {grade.ue}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{grade.type}</span>
                          <span>•</span>
                          <span>{grade.date}</span>
                          <span>•</span>
                          <span>Coef. {grade.coefficient}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.note)}`}
                        >
                          {grade.note}/20
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Événements à venir
                </CardTitle>
                <CardDescription>Votre agenda cette semaine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`p-2 rounded-lg ${getEventColor(event.type)}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 truncate">
                            {event.title}
                          </h5>
                          <div className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} •{" "}
                            {event.time}
                          </div>
                          <div className="text-xs text-gray-400">
                            {event.salle}
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

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Accomplissements & Objectifs
              </CardTitle>
              <CardDescription>
                Vos réussites et objectifs en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                        achievement.earned
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.earned
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {achievement.title}
                          </h5>
                          {achievement.earned && (
                            <div className="text-xs text-green-600 font-medium">
                              {achievement.date}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      {!achievement.earned && achievement.progress && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progression</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress
                            value={achievement.progress}
                            className="h-2"
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleDownloadBulletin}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Télécharger bulletin
                </Button>
                <AbsenceRequestDialog
                  trigger={
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Signaler absence
                    </Button>
                  }
                />
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Demander attestation
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Mettre à jour profil
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </StudentLayout>
  );
}
