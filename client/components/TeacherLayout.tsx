import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Home,
  Users,
  Calendar,
  User,
  Bell,
  LogOut,
  GraduationCap,
  FileText,
  BarChart3,
  BookOpen,
  Clock,
  MessageSquare,
  Save,
  UserCheck,
  ChevronDown,
  Search,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeacherLayoutProps {
  children: ReactNode;
}

const getTeacherNavigation = (t: any) => [
  {
    name: t("navigation.teacherDashboard"),
    href: "/teacher/dashboard",
    icon: Home,
  },
  { name: t("common.students"), href: "/teacher/students", icon: Users },
  { name: t("teacher.enterGrades"), href: "/teacher/grades", icon: BarChart3 },
  { name: t("common.schedule"), href: "/teacher/schedule", icon: Calendar },
  { name: t("common.courses"), href: "/teacher/courses", icon: BookOpen },
  { name: t("common.documents"), href: "/teacher/documents", icon: FileText },
  {
    name: t("common.messages"),
    href: "/teacher/messages",
    icon: MessageSquare,
  },
  { name: t("common.profile"), href: "/teacher/profile", icon: User },
];

// Mock data for courses and students
const mockCourses = [
  {
    id: "1",
    name: "Anatomie générale",
    filiere: "Pharmacie",
    niveau: "Année 1",
  },
  {
    id: "2",
    name: "Physiologie spécialisée",
    filiere: "Médecine",
    niveau: "Année 2",
  },
  {
    id: "3",
    name: "TP Anatomie",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
  },
];

const mockStudents = [
  { id: "1", name: "Marie Dupont", numeroEtudiant: "ETU2024001" },
  { id: "2", name: "Jean Martin", numeroEtudiant: "ETU2024002" },
  { id: "3", name: "Sophie Bernard", numeroEtudiant: "ETU2024003" },
  { id: "4", name: "Lucas Moreau", numeroEtudiant: "ETU2024045" },
  { id: "5", name: "Emma Rousseau", numeroEtudiant: "ETU2024046" },
];

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  // State for dialogs
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isAbsenceDialogOpen, setIsAbsenceDialogOpen] = useState(false);

  // State for grade form
  const [gradeForm, setGradeForm] = useState({
    course: "",
    student: "",
    evaluationType: "",
    grade: "",
    maxGrade: "20",
    comment: "",
  });

  // State for absence form
  const [absenceForm, setAbsenceForm] = useState({
    course: "",
    date: new Date().toISOString().split("T")[0],
    session: "",
    students: [] as string[],
    comment: "",
  });

  const handleSubmitGrade = () => {
    if (
      !gradeForm.course ||
      !gradeForm.student ||
      !gradeForm.evaluationType ||
      !gradeForm.grade
    ) {
      toast({
        title: t("common.error"),
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Note saisie",
      description: "La note a été enregistrée avec succès.",
    });

    setGradeForm({
      course: "",
      student: "",
      evaluationType: "",
      grade: "",
      maxGrade: "20",
      comment: "",
    });
    setIsGradeDialogOpen(false);
  };

  const handleSubmitAbsence = () => {
    if (
      !absenceForm.course ||
      !absenceForm.session ||
      absenceForm.students.length === 0
    ) {
      toast({
        title: t("common.error"),
        description:
          "Veuillez remplir tous les champs obligatoires et sélectionner au moins un étudiant.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Absences signalées",
      description: `${absenceForm.students.length} absence(s) signalée(s) avec succès.`,
    });

    setAbsenceForm({
      course: "",
      date: new Date().toISOString().split("T")[0],
      session: "",
      students: [],
      comment: "",
    });
    setIsAbsenceDialogOpen(false);
  };

  const handleStudentToggle = (studentId: string) => {
    setAbsenceForm((prev) => ({
      ...prev,
      students: prev.students.includes(studentId)
        ? prev.students.filter((id) => id !== studentId)
        : [...prev.students, studentId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">
                  {t("navigation.teacherDashboard")}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700">
                    {user?.nom}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.specialite}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("auth.roles.teacher")}
                  </div>
                </div>
              </div>

              {/* Language switcher */}
              <LanguageSwitcher />

              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">
                  {t("common.logout")}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 bg-white shadow-sm h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto border-b lg:border-b-0 lg:border-r">
          <div className="p-4">
            {/* Quick Stats */}
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Mes statistiques
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("common.students")}:</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cours cette semaine:</span>
                  <span className="font-medium">12h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Notes à saisir:</span>
                  <span className="font-medium text-orange-600">23</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2">
              {getTeacherNavigation(t).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {t("common.quickActions")}
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/teacher/grade-entry")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t("teacher.enterGrades")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setIsAbsenceDialogOpen(true)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Signaler absence
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">{children}</main>
      </div>

      {/* Grade Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Saisir une note</DialogTitle>
            <DialogDescription>
              Enregistrer une note pour un étudiant
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade-course">Cours</Label>
              <Select
                value={gradeForm.course}
                onValueChange={(value) =>
                  setGradeForm({ ...gradeForm, course: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un cours" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} - {course.filiere} {course.niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade-student">Étudiant</Label>
              <Select
                value={gradeForm.student}
                onValueChange={(value) =>
                  setGradeForm({ ...gradeForm, student: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un étudiant" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.numeroEtudiant})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="evaluation-type">Type d'évaluation</Label>
              <Select
                value={gradeForm.evaluationType}
                onValueChange={(value) =>
                  setGradeForm({ ...gradeForm, evaluationType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type d'évaluation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="examen_partiel">Examen partiel</SelectItem>
                  <SelectItem value="examen_final">Examen final</SelectItem>
                  <SelectItem value="tp">Travaux pratiques</SelectItem>
                  <SelectItem value="controle_continu">
                    Contrôle continu
                  </SelectItem>
                  <SelectItem value="projet">Projet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="grade">Note</Label>
                <Input
                  id="grade"
                  type="number"
                  step="0.1"
                  min="0"
                  max={gradeForm.maxGrade}
                  placeholder="15.5"
                  value={gradeForm.grade}
                  onChange={(e) =>
                    setGradeForm({ ...gradeForm, grade: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-grade">Barème</Label>
                <Input
                  id="max-grade"
                  type="number"
                  value={gradeForm.maxGrade}
                  onChange={(e) =>
                    setGradeForm({ ...gradeForm, maxGrade: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="grade-comment">Commentaire (optionnel)</Label>
              <Textarea
                id="grade-comment"
                placeholder="Commentaire sur la performance de l'étudiant..."
                value={gradeForm.comment}
                onChange={(e) =>
                  setGradeForm({ ...gradeForm, comment: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGradeDialogOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSubmitGrade}>
              <Save className="h-4 w-4 mr-2" />
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Absence Dialog */}
      <Dialog open={isAbsenceDialogOpen} onOpenChange={setIsAbsenceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Signaler des absences</DialogTitle>
            <DialogDescription>
              Marquer les étudiants absents pour une séance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="absence-course">Cours</Label>
                <Select
                  value={absenceForm.course}
                  onValueChange={(value) =>
                    setAbsenceForm({ ...absenceForm, course: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un cours" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} - {course.filiere} {course.niveau}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="absence-date">Date</Label>
                <Input
                  id="absence-date"
                  type="date"
                  value={absenceForm.date}
                  onChange={(e) =>
                    setAbsenceForm({ ...absenceForm, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-type">Type de séance</Label>
              <Select
                value={absenceForm.session}
                onValueChange={(value) =>
                  setAbsenceForm({ ...absenceForm, session: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type de séance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cours">Cours magistral</SelectItem>
                  <SelectItem value="tp">Travaux pratiques</SelectItem>
                  <SelectItem value="td">Travaux dirigés</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Étudiants absents</Label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                <div className="space-y-3">
                  {mockStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={absenceForm.students.includes(student.id)}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                      <Label
                        htmlFor={`student-${student.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {student.name} ({student.numeroEtudiant})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {absenceForm.students.length} étudiant(s) sélectionné(s)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="absence-comment">Commentaire (optionnel)</Label>
              <Textarea
                id="absence-comment"
                placeholder="Motif ou commentaire sur les absences..."
                value={absenceForm.comment}
                onChange={(e) =>
                  setAbsenceForm({ ...absenceForm, comment: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAbsenceDialogOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSubmitAbsence}>
              <UserCheck className="h-4 w-4 mr-2" />
              Signaler les absences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
