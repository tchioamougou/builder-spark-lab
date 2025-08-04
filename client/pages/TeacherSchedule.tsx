import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  type: "cours" | "tp" | "reunion" | "examen";
  filiere: string;
  niveau: string;
  room: string;
  startTime: string;
  endTime: string;
  date: string;
  students: number;
  description?: string;
}

const mockSchedule: ScheduleEvent[] = [
  {
    id: "1",
    title: "Anatomie générale",
    type: "cours",
    filiere: "Pharmacie",
    niveau: "Année 1",
    room: "Amphi B",
    startTime: "09:00",
    endTime: "10:30",
    date: "2024-01-22",
    students: 45,
    description: "Chapitre 3: Le système cardiovasculaire",
  },
  {
    id: "2",
    title: "TP Physiologie",
    type: "tp",
    filiere: "Médecine",
    niveau: "Année 2",
    room: "Labo 3",
    startTime: "14:00",
    endTime: "15:30",
    date: "2024-01-22",
    students: 20,
    description: "Manipulation sur la circulation sanguine",
  },
  {
    id: "3",
    title: "Réunion pédagogique",
    type: "reunion",
    filiere: "Administration",
    niveau: "Équipe",
    room: "Salle de réunion",
    startTime: "16:00",
    endTime: "17:00",
    date: "2024-01-22",
    students: 8,
    description: "Planification des examens de fin de semestre",
  },
  {
    id: "4",
    title: "Examen Anatomie",
    type: "examen",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    room: "Salle 205",
    startTime: "10:00",
    endTime: "12:00",
    date: "2024-01-23",
    students: 22,
    description: "Examen partiel - Anatomie du membre supérieur",
  },
  {
    id: "5",
    title: "Cours Physiologie spécialisée",
    type: "cours",
    filiere: "Médecine",
    niveau: "Année 2",
    room: "Amphi A",
    startTime: "08:00",
    endTime: "09:30",
    date: "2024-01-24",
    students: 38,
    description: "Le système nerveux autonome",
  },
];

const typeLabels = {
  cours: { label: "Cours magistral", color: "bg-blue-100 text-blue-800" },
  tp: { label: "Travaux pratiques", color: "bg-green-100 text-green-800" },
  reunion: { label: "Réunion", color: "bg-purple-100 text-purple-800" },
  examen: { label: "Examen", color: "bg-red-100 text-red-800" },
};

export default function TeacherSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">("week");

  // Get current week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);
  const today = new Date();

  // Filter events for current week
  const weekEvents = mockSchedule.filter(event => {
    const eventDate = new Date(event.date);
    return weekDates.some(date => 
      date.toDateString() === eventDate.toDateString()
    );
  });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockSchedule.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get today's events
  const todayEvents = getEventsForDate(today);

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getTotalHours = () => {
    return weekEvents.reduce((total, event) => {
      const start = new Date(`2024-01-01 ${event.startTime}`);
      const end = new Date(`2024-01-01 ${event.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Emploi du Temps</h2>
            <p className="text-muted-foreground">
              Planning de vos cours et activités
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un événement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cours cette semaine
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weekEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Événements programmés
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volume horaire
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalHours()}h</div>
              <p className="text-xs text-muted-foreground">
                Total cette semaine
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Étudiants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {weekEvents.reduce((total, event) => total + event.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total à encadrer
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aujourd'hui
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Cours du jour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="week">Vue semaine</TabsTrigger>
            <TabsTrigger value="day">Vue jour</TabsTrigger>
            <TabsTrigger value="month">Vue mois</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            {/* Week Navigation */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>
                      Semaine du {weekDates[0].toLocaleDateString("fr-FR")} au{" "}
                      {weekDates[6].toLocaleDateString("fr-FR")}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Aujourd'hui
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weekDates.map((date, index) => {
                    const dayEvents = getEventsForDate(date);
                    const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className={`text-center p-2 rounded ${isToday(date) ? "bg-primary text-primary-foreground" : "bg-gray-50"}`}>
                          <div className="text-xs font-medium">{dayNames[index]}</div>
                          <div className="text-lg font-bold">{date.getDate()}</div>
                        </div>
                        <div className="space-y-1 min-h-[200px]">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-2 rounded-lg border-l-4 border-primary bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <div className="text-xs font-medium text-primary">
                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                              </div>
                              <div className="text-sm font-medium truncate">
                                {event.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {event.room}
                              </div>
                              <Badge size="sm" className={typeLabels[event.type].color}>
                                {typeLabels[event.type].label}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="day" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setDate(currentDate.getDate() - 1);
                      setCurrentDate(newDate);
                    }}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>{currentDate.toLocaleDateString("fr-FR", { 
                      weekday: "long", 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}</span>
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setDate(currentDate.getDate() + 1);
                      setCurrentDate(newDate);
                    }}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Aujourd'hui
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForDate(currentDate).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun cours prévu pour cette journée</p>
                    </div>
                  ) : (
                    getEventsForDate(currentDate)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((event) => (
                        <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={typeLabels[event.type].color}>
                                  {typeLabels[event.type].label}
                                </Badge>
                                <span className="text-sm font-medium text-primary">
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold">{event.title}</h3>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.room}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BookOpen className="h-4 w-4" />
                                  <span>{event.filiere} - {event.niveau}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{event.students} étudiants</span>
                                </div>
                                {event.description && (
                                  <div className="mt-2 text-sm">
                                    <strong>Description:</strong> {event.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vue mensuelle</CardTitle>
                <CardDescription>
                  Aperçu complet du mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Vue mensuelle - À implémenter</p>
                  <p className="text-sm">Cette fonctionnalité sera disponible prochainement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Today's Schedule Quick View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Programme d'aujourd'hui</span>
            </CardTitle>
            <CardDescription>
              Vos cours et activités du jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <p>Aucun cours prévu aujourd'hui</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-l-4 border-primary pl-4 py-2">
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.filiere} - {event.niveau} • {event.room}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        <Badge size="sm" className={typeLabels[event.type].color}>
                          {typeLabels[event.type].label}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
