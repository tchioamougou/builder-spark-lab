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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { generateSchedulePDF } from "@/lib/pdf-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useState } from "react";

const weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const scheduleData = [
  {
    id: 1,
    day: "Lundi",
    time: "09:00-10:30",
    subject: "Anatomie générale",
    type: "Cours magistral",
    teacher: "Dr. Jean Martin",
    room: "Amphi A",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 2,
    day: "Lundi",
    time: "14:00-15:30",
    subject: "TP Chimie organique",
    type: "Travaux pratiques",
    teacher: "Dr. Sophie Laurent",
    room: "Labo 2",
    color: "bg-green-100 border-green-300 text-green-800",
  },
  {
    id: 3,
    day: "Mardi",
    time: "10:00-11:30",
    subject: "Physiologie",
    type: "Cours magistral",
    teacher: "Dr. Marie Dubois",
    room: "Amphi B",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 4,
    day: "Mardi",
    time: "15:00-16:30",
    subject: "Mathématiques appliquées",
    type: "TD",
    teacher: "Prof. Pierre Durand",
    room: "Salle 201",
    color: "bg-purple-100 border-purple-300 text-purple-800",
  },
  {
    id: 5,
    day: "Mercredi",
    time: "09:00-10:30",
    subject: "Chimie analytique",
    type: "Cours magistral",
    teacher: "Dr. Emma Wilson",
    room: "Amphi A",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 6,
    day: "Jeudi",
    time: "14:00-17:00",
    subject: "TP Anatomie",
    type: "Travaux pratiques",
    teacher: "Dr. Jean Martin",
    room: "Labo Anatomie",
    color: "bg-green-100 border-green-300 text-green-800",
  },
  {
    id: 7,
    day: "Vendredi",
    time: "10:00-12:00",
    subject: "Pharmacologie générale",
    type: "Cours magistral",
    teacher: "Dr. Thomas Bernard",
    room: "Amphi C",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
];

const upcomingExams = [
  {
    id: 1,
    subject: "Anatomie générale",
    date: "2024-01-25",
    time: "09:00-11:00",
    room: "Amphi A",
    type: "Examen final",
    duration: "2h",
  },
  {
    id: 2,
    subject: "Chimie organique",
    date: "2024-01-27",
    time: "14:00-15:30",
    room: "Amphi B",
    type: "Contrôle continu",
    duration: "1h30",
  },
  {
    id: 3,
    subject: "Physiologie",
    date: "2024-01-30",
    time: "10:00-12:00",
    room: "Amphi C",
    type: "Examen final",
    duration: "2h",
  },
];

const todayClasses = [
  {
    id: 1,
    time: "09:00-10:30",
    subject: "Anatomie générale",
    type: "Cours magistral",
    teacher: "Dr. Jean Martin",
    room: "Amphi A",
    status: "À venir",
  },
  {
    id: 2,
    time: "14:00-15:30",
    subject: "TP Chimie organique",
    type: "Travaux pratiques",
    teacher: "Dr. Sophie Laurent",
    room: "Labo 2",
    status: "À venir",
  },
];

export default function StudentSchedule() {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(
    "Semaine du 22-26 Janvier 2024",
  );
  const [filterType, setFilterType] = useState("Tous");
  const [filterTeacher, setFilterTeacher] = useState("Tous");

  const handleExportSchedule = () => {
    if (user) {
      generateSchedulePDF(scheduleData, user);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cours magistral":
        return "bg-blue-100 text-blue-800";
      case "Travaux pratiques":
        return "bg-green-100 text-green-800";
      case "TD":
        return "bg-purple-100 text-purple-800";
      case "Examen final":
        return "bg-red-100 text-red-800";
      case "Contrôle continu":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé":
        return "bg-gray-100 text-gray-800";
      case "En cours":
        return "bg-green-100 text-green-800";
      case "À venir":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getClassesForDay = (day: string) => {
    return scheduleData.filter((item) => {
      const matchesDay = item.day === day;
      const matchesType = filterType === "Tous" || item.type === filterType;
      const matchesTeacher =
        filterTeacher === "Tous" || item.teacher === filterTeacher;
      return matchesDay && matchesType && matchesTeacher;
    });
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Emploi du temps
            </h2>
            <p className="text-muted-foreground">
              Votre planning de cours et examens - {user?.filiere}{" "}
              {user?.niveau}
            </p>
          </div>

          <div className="flex space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les types</SelectItem>
                <SelectItem value="Cours magistral">
                  Cours magistraux
                </SelectItem>
                <SelectItem value="Travaux pratiques">
                  Travaux pratiques
                </SelectItem>
                <SelectItem value="TD">TD</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTeacher} onValueChange={setFilterTeacher}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Enseignant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les enseignants</SelectItem>
                <SelectItem value="Dr. Jean Martin">Dr. Jean Martin</SelectItem>
                <SelectItem value="Dr. Sophie Laurent">
                  Dr. Sophie Laurent
                </SelectItem>
                <SelectItem value="Dr. Marie Dubois">
                  Dr. Marie Dubois
                </SelectItem>
                <SelectItem value="Prof. Pierre Durand">
                  Prof. Pierre Durand
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportSchedule}>
              <Download className="h-4 w-4 mr-2" />
              Exporter PDF
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <h3 className="text-lg font-semibold">{currentWeek}</h3>
                <p className="text-sm text-muted-foreground">
                  Année académique 2023-2024
                </p>
              </div>

              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Cours d'aujourd'hui</span>
            </CardTitle>
            <CardDescription>Lundi 22 Janvier 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((classe) => (
                <div
                  key={classe.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {classe.time.split("-")[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {classe.time.split("-")[1]}
                      </div>
                    </div>
                    <div className="h-8 w-1 bg-primary rounded"></div>
                    <div>
                      <div className="font-medium">{classe.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        {classe.teacher}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {classe.room}
                        </span>
                        <Badge
                          variant="secondary"
                          className={getTypeColor(classe.type)}
                        >
                          {classe.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(classe.status)}
                  >
                    {classe.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="weekly">Vue hebdomadaire</TabsTrigger>
            <TabsTrigger value="exams">Examens</TabsTrigger>
            <TabsTrigger value="monthly">Vue mensuelle</TabsTrigger>
          </TabsList>

          {/* Weekly View Tab */}
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planning de la semaine</CardTitle>
                <CardDescription>
                  Emploi du temps détaillé par jour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-4">
                  {/* Time column */}
                  <div className="space-y-2">
                    <div className="h-12 flex items-center justify-center font-medium text-sm">
                      Heure
                    </div>
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="h-16 flex items-center justify-center text-xs text-muted-foreground border-t"
                      >
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Days columns */}
                  {weekdays.map((day) => (
                    <div key={day} className="space-y-2">
                      <div className="h-12 flex items-center justify-center font-medium text-sm bg-gray-50 rounded">
                        {day}
                      </div>
                      <div className="space-y-1 min-h-[600px] relative">
                        {getClassesForDay(day).map((classe) => (
                          <div
                            key={classe.id}
                            className={`p-2 rounded border-l-4 text-xs ${classe.color}`}
                          >
                            <div className="font-medium">{classe.time}</div>
                            <div className="font-semibold">
                              {classe.subject}
                            </div>
                            <div>{classe.teacher}</div>
                            <div className="flex items-center text-xs mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {classe.room}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Examens à venir</span>
                </CardTitle>
                <CardDescription>
                  Planning des évaluations et contrôles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <div>
                              <div className="font-semibold">
                                {exam.subject}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(exam.date).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {exam.time} ({exam.duration})
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {exam.room}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={getTypeColor(exam.type)}
                        >
                          {exam.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly View Tab */}
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vue mensuelle</CardTitle>
                <CardDescription>Aperçu du mois en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-2 text-center font-medium text-sm bg-gray-50 rounded"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className="aspect-square border rounded p-1 text-sm"
                    >
                      <div className="font-medium">{day}</div>
                      {/* Sample events for some days */}
                      {day === 22 && (
                        <div className="mt-1">
                          <div className="bg-blue-100 text-blue-800 text-xs px-1 rounded mb-1">
                            Anatomie
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs px-1 rounded">
                            TP Chimie
                          </div>
                        </div>
                      )}
                      {day === 25 && (
                        <div className="mt-1">
                          <div className="bg-red-100 text-red-800 text-xs px-1 rounded">
                            Examen
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Heures cette semaine
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18h</div>
              <p className="text-xs text-muted-foreground">
                7 séances de cours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cours magistraux
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12h</div>
              <p className="text-xs text-muted-foreground">
                5 cours cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Travaux pratiques
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6h</div>
              <p className="text-xs text-muted-foreground">
                2 TP cette semaine
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
              <p className="text-xs text-muted-foreground">
                Dans les 2 prochaines semaines
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
