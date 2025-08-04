import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeacherLayoutProps {
  children: ReactNode;
}

const teacherNavigation = [
  { name: "Mon tableau de bord", href: "/teacher/dashboard", icon: Home },
  { name: "Mes étudiants", href: "/teacher/students", icon: Users },
  { name: "Gestion des notes", href: "/teacher/grades", icon: BarChart3 },
  { name: "Emploi du temps", href: "/teacher/schedule", icon: Calendar },
  { name: "Mes cours", href: "/teacher/courses", icon: BookOpen },
  { name: "Documents de cours", href: "/teacher/documents", icon: FileText },
  { name: "Messages", href: "/teacher/messages", icon: MessageSquare },
  { name: "Mon profil", href: "/teacher/profile", icon: User },
];

// Mock data for courses and students
const mockCourses = [
  { id: "1", name: "Anatomie générale", filiere: "Pharmacie", niveau: "Année 1" },
  { id: "2", name: "Physiologie spécialisée", filiere: "Médecine", niveau: "Année 2" },
  { id: "3", name: "TP Anatomie", filiere: "Kinésithérapie", niveau: "Année 1" },
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
  const { user, logout } = useAuth();
  const { toast } = useToast();

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
    if (!gradeForm.course || !gradeForm.student || !gradeForm.evaluationType || !gradeForm.grade) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit to your API
    toast({
      title: "Note saisie",
      description: "La note a été enregistrée avec succès.",
    });

    // Reset form and close dialog
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
    if (!absenceForm.course || !absenceForm.session || absenceForm.students.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires et sélectionner au moins un étudiant.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit to your API
    toast({
      title: "Absences signalées",
      description: `${absenceForm.students.length} absence(s) signalée(s) avec succès.`,
    });

    // Reset form and close dialog
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
    setAbsenceForm(prev => ({
      ...prev,
      students: prev.students.includes(studentId)
        ? prev.students.filter(id => id !== studentId)
        : [...prev.students, studentId]
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
                  Espace Enseignant
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
                  <div className="text-xs text-gray-500">Enseignant</div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            {/* Quick Stats */}
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Mes statistiques
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Étudiants:</span>
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
              {teacherNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
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
                Actions rapides
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setIsGradeDialogOpen(true)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Saisir notes
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
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
