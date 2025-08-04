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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  Search,
  Plus,
  Edit,
  Eye,
  FileText,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  code: string;
  filiere: string;
  niveau: string;
  semester: string;
  credits: number;
  totalHours: number;
  completedHours: number;
  students: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming" | "paused";
  description: string;
  objectives: string[];
  sessions: CourseSession[];
}

interface CourseSession {
  id: string;
  title: string;
  type: "cours" | "tp" | "td";
  date: string;
  duration: number;
  completed: boolean;
  attendance?: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    name: "Anatomie générale",
    code: "ANAT101",
    filiere: "Pharmacie",
    niveau: "Année 1",
    semester: "Semestre 1",
    credits: 6,
    totalHours: 45,
    completedHours: 30,
    students: 45,
    startDate: "2023-09-01",
    endDate: "2024-01-31",
    status: "active",
    description: "Introduction à l'anatomie humaine avec focus sur les systèmes cardiovasculaire, respiratoire et nerveux.",
    objectives: [
      "Comprendre la structure anatomique du corps humain",
      "Identifier les organes et leurs fonctions",
      "Maîtriser la terminologie anatomique",
      "Analyser les relations entre structure et fonction"
    ],
    sessions: [
      {
        id: "1",
        title: "Introduction à l'anatomie",
        type: "cours",
        date: "2024-01-15",
        duration: 1.5,
        completed: true,
        attendance: 44
      },
      {
        id: "2",
        title: "Système cardiovasculaire",
        type: "cours",
        date: "2024-01-18",
        duration: 2,
        completed: true,
        attendance: 43
      },
      {
        id: "3",
        title: "TP Dissection",
        type: "tp",
        date: "2024-01-22",
        duration: 3,
        completed: false
      }
    ]
  },
  {
    id: "2",
    name: "Physiologie spécialisée",
    code: "PHYS201",
    filiere: "Médecine",
    niveau: "Année 2",
    semester: "Semestre 2",
    credits: 8,
    totalHours: 60,
    completedHours: 45,
    students: 38,
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    status: "active",
    description: "Étude approfondie des mécanismes physiologiques complexes.",
    objectives: [
      "Analyser les mécanismes de régulation physiologique",
      "Comprendre les interactions entre systèmes",
      "Interpréter les données physiologiques",
      "Appliquer les connaissances en contexte clinique"
    ],
    sessions: [
      {
        id: "4",
        title: "Régulation hormonale",
        type: "cours",
        date: "2024-01-20",
        duration: 2,
        completed: true,
        attendance: 36
      },
      {
        id: "5",
        title: "TP Électrophysiologie",
        type: "tp",
        date: "2024-01-25",
        duration: 4,
        completed: false
      }
    ]
  },
  {
    id: "3",
    name: "TP Anatomie pratique",
    code: "TPAN101",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    semester: "Semestre 1",
    credits: 4,
    totalHours: 30,
    completedHours: 20,
    students: 22,
    startDate: "2023-09-15",
    endDate: "2024-01-15",
    status: "completed",
    description: "Travaux pratiques d'anatomie avec manipulation et observation directe.",
    objectives: [
      "Manipuler les préparations anatomiques",
      "Observer et identifier les structures",
      "Développer les compétences pratiques",
      "Comprendre l'anatomie palpatoire"
    ],
    sessions: [
      {
        id: "6",
        title: "Membre supérieur",
        type: "tp",
        date: "2024-01-10",
        duration: 3,
        completed: true,
        attendance: 22
      },
      {
        id: "7",
        title: "Membre inférieur",
        type: "tp",
        date: "2024-01-15",
        duration: 3,
        completed: true,
        attendance: 21
      }
    ]
  }
];

const statusLabels = {
  active: { label: "En cours", color: "bg-green-100 text-green-800" },
  completed: { label: "Terminé", color: "bg-blue-100 text-blue-800" },
  upcoming: { label: "À venir", color: "bg-yellow-100 text-yellow-800" },
  paused: { label: "En pause", color: "bg-gray-100 text-gray-800" },
};

const sessionTypeLabels = {
  cours: { label: "Cours magistral", color: "bg-blue-100 text-blue-800" },
  tp: { label: "Travaux pratiques", color: "bg-green-100 text-green-800" },
  td: { label: "Travaux dirigés", color: "bg-purple-100 text-purple-800" },
};

export default function TeacherCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredCourses = mockCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCourses = mockCourses.filter(course => course.status === "active");
  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);
  const totalHours = mockCourses.reduce((sum, course) => sum + course.completedHours, 0);
  const averageProgress = Math.round(
    mockCourses.reduce((sum, course) => sum + (course.completedHours / course.totalHours) * 100, 0) / mockCourses.length
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const upcomingSessions = mockCourses
    .flatMap(course => course.sessions)
    .filter(session => !session.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes Cours</h2>
            <p className="text-muted-foreground">
              Gestion et suivi de vos enseignements
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau cours
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cours actifs
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                En cours cette année
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total étudiants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Tous cours confondus
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Heures enseignées
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}h</div>
              <p className="text-xs text-muted-foreground">
                Cette année académique
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Progression moyenne
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress}%</div>
              <p className="text-xs text-muted-foreground">
                Avancement des cours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">Mes cours</TabsTrigger>
            <TabsTrigger value="sessions">Prochaines séances</TabsTrigger>
            <TabsTrigger value="planning">Planification</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => {
                const progress = Math.round((course.completedHours / course.totalHours) * 100);
                const nextSession = course.sessions.find(s => !s.completed);
                
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription className="space-y-1">
                            <div>{course.code}</div>
                            <div>{course.filiere} - {course.niveau}</div>
                          </CardDescription>
                        </div>
                        <Badge className={statusLabels[course.status].color}>
                          {statusLabels[course.status].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress 
                          value={progress} 
                          className={`h-2 ${getProgressColor(progress)}`}
                        />
                        <div className="text-xs text-muted-foreground">
                          {course.completedHours}h / {course.totalHours}h
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students} étudiants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>{course.credits} crédits</span>
                        </div>
                      </div>

                      {/* Next Session */}
                      {nextSession && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-900">
                            Prochaine séance
                          </div>
                          <div className="text-sm text-blue-700">
                            {nextSession.title}
                          </div>
                          <div className="text-xs text-blue-600 flex items-center space-x-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(nextSession.date).toLocaleDateString("fr-FR")}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{nextSession.duration}h</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prochaines séances</CardTitle>
                <CardDescription>
                  Vos cours et TP à venir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => {
                    const course = mockCourses.find(c => c.sessions.some(s => s.id === session.id));
                    
                    return (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge className={sessionTypeLabels[session.type].color}>
                              {sessionTypeLabels[session.type].label}
                            </Badge>
                            <div className="font-medium">{session.title}</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {course?.name} - {course?.filiere} {course?.niveau}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(session.date).toLocaleDateString("fr-FR")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.duration}h</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{course?.students} étudiants</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Démarrer
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planification des cours</CardTitle>
                <CardDescription>
                  Vue d'ensemble de vos enseignements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Planification avancée - À venir</p>
                  <p className="text-sm">Cette fonctionnalité sera disponible prochainement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Course Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedCourse?.name}</span>
                <Badge className={selectedCourse ? statusLabels[selectedCourse.status].color : ""}>
                  {selectedCourse ? statusLabels[selectedCourse.status].label : ""}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                {selectedCourse?.code} - {selectedCourse?.filiere} {selectedCourse?.niveau}
              </DialogDescription>
            </DialogHeader>
            
            {selectedCourse && (
              <div className="space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedCourse.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Objectifs pédagogiques</h4>
                      <ul className="space-y-1">
                        {selectedCourse.objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold">{selectedCourse.students}</div>
                        <div className="text-sm text-muted-foreground">Étudiants</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold">{selectedCourse.credits}</div>
                        <div className="text-sm text-muted-foreground">Crédits</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold">{selectedCourse.totalHours}h</div>
                        <div className="text-sm text-muted-foreground">Volume total</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold">{selectedCourse.completedHours}h</div>
                        <div className="text-sm text-muted-foreground">Réalisées</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Progression</h4>
                      <Progress 
                        value={(selectedCourse.completedHours / selectedCourse.totalHours) * 100} 
                        className="h-3"
                      />
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round((selectedCourse.completedHours / selectedCourse.totalHours) * 100)}% terminé
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sessions */}
                <div>
                  <h4 className="font-medium mb-4">Séances de cours</h4>
                  <div className="space-y-2">
                    {selectedCourse.sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {session.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                          <div>
                            <div className="font-medium">{session.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleDateString("fr-FR")} • {session.duration}h
                              {session.attendance && (
                                <span> • {session.attendance}/{selectedCourse.students} présents</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={sessionTypeLabels[session.type].color}>
                          {sessionTypeLabels[session.type].label}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
