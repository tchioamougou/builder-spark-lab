import { ReactNode, useState, useEffect, useRef } from "react";
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <header className="bg-gradient-to-r from-primary/95 via-primary to-primary/90 shadow-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 md:h-20 justify-between items-center min-w-0">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/teacher/dashboard" className="flex items-center">
                <div className="flex items-center bg-white/15 p-2 rounded-full shadow-md border border-white/10">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="ml-3 flex flex-col">
                  <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    EP<span className="text-amber-300">FPS</span>
                  </h1>
                  <span className="text-[10px] text-white/60 -mt-1 tracking-wider uppercase hidden md:inline-block">
                    Espace enseignant • {new Date().getFullYear()}
                  </span>
                </div>
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-1 md:space-x-3">
              {/* Search button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 h-9"
              >
                <Search className="h-4 w-4 mr-2" />
                <span className="text-xs">{t("common.search")}...</span>
              </Button>

              {/* Notifications dropdown */}
              <div className="relative" ref={notificationRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-white/10 hover:bg-white/20 text-white rounded-full p-2 h-9 w-9"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-amber-500 text-[10px] text-white font-bold rounded-full shadow-sm border border-white/20">
                    4
                  </span>
                </Button>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {t("common.notifications")}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                        4 nouvelles
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 border-l-4 border-orange-500">
                        <div className="flex items-start">
                          <div className="bg-orange-100 p-1.5 rounded-full mr-3">
                            <BarChart3 className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              23 notes à saisir
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Examens terminés
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 border-l-4 border-blue-500">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              5 nouveaux messages
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Questions d'étudiants
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <Link
                        to="/teacher/notifications"
                        className="text-xs font-medium text-primary hover:text-primary/80 flex items-center"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        Voir toutes <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User profile dropdown */}
              <div className="relative" ref={userMenuRef}>
                <div 
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 p-1.5 rounded-full cursor-pointer pr-3"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <Avatar className="h-7 w-7 border-2 border-white/30">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary-foreground text-primary font-medium text-xs">
                      {user?.nom
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-white flex items-center">
                      {user?.nom}
                      <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                    </div>
                    <div className="text-[10px] text-white/70 capitalize -mt-0.5">
                      {user?.specialite} • Enseignant
                    </div>
                  </div>
                </div>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.nom}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user?.specialite} • {t("auth.roles.teacher")}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/teacher/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.profile")}
                      </Link>
                      <Link
                        to="/teacher/messages"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.messages")}
                      </Link>
                      <Link
                        to="/teacher/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.settings")}
                      </Link>
                    </div>
                    <div className="py-1 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-red-500" />
                        {t("common.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Language switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 bg-gradient-to-b from-gray-50 to-white shadow-lg h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/50">
          <div className="p-4">
            {/* Quick Stats with futuristic design */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-amber-50 rounded-xl border border-primary/20 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Mes statistiques
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">{t("common.students")}:</span>
                  <span className="font-bold text-primary">127</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">Cours cette semaine:</span>
                  <span className="font-bold text-blue-600">12h</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">Notes à saisir:</span>
                  <span className="font-bold text-orange-600 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-1 animate-pulse"></div>
                    23
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-1">
              {getTeacherNavigation(t).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-md",
                      )}
                    >
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-white/20"
                            : "bg-gray-100 group-hover:bg-primary/10",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive
                              ? "text-white"
                              : "text-gray-600 group-hover:text-primary",
                          )}
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions with enhanced design */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <div className="w-1 h-1 bg-amber-400 rounded-full mr-2"></div>
                {t("common.quickActions")}
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100 text-green-700 hover:text-green-800 shadow-sm"
                  onClick={() => navigate("/teacher/grade-entry")}
                >
                  <div className="p-1 bg-green-100 rounded-lg mr-2">
                    <BarChart3 className="h-3 w-3 text-green-600" />
                  </div>
                  {t("teacher.enterGrades")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-orange-800 shadow-sm"
                  onClick={() => setIsAbsenceDialogOpen(true)}
                >
                  <div className="p-1 bg-orange-100 rounded-lg mr-2">
                    <Clock className="h-3 w-3 text-orange-600" />
                  </div>
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
