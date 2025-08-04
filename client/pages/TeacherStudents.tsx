import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  BookOpen,
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  MessageSquare,
  BarChart3,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Award,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Student {
  id: string;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  filiere: string;
  niveau: string;
  statut: "actif" | "suspendu" | "diplome" | "abandonne" | "transfere";
  moyenne?: number;
  absences?: number;
  retards?: number;
  dateInscription: string;
  derniereConnexion?: string;
}

interface ClassGroup {
  id: string;
  nom: string;
  filiere: string;
  niveau: string;
  matiere: string;
  etudiants: Student[];
}

// Mock data - students in teacher's classes
const mockClassGroups: ClassGroup[] = [
  {
    id: "1",
    nom: "Anatomie générale",
    filiere: "Pharmacie",
    niveau: "Année 1",
    matiere: "Anatomie",
    etudiants: [
      {
        id: "1",
        numeroEtudiant: "ETU2024001",
        nom: "Dupont",
        prenom: "Marie",
        email: "marie.dupont@etud.univ.fr",
        telephone: "+33123456780",
        filiere: "Pharmacie",
        niveau: "Année 1",
        statut: "actif",
        moyenne: 15.2,
        absences: 2,
        retards: 1,
        dateInscription: "2023-09-01",
        derniereConnexion: "2024-01-20",
      },
      {
        id: "2",
        numeroEtudiant: "ETU2024002",
        nom: "Martin",
        prenom: "Jean",
        email: "jean.martin@etud.univ.fr",
        telephone: "+33123456781",
        filiere: "Pharmacie",
        niveau: "Année 1",
        statut: "actif",
        moyenne: 12.8,
        absences: 5,
        retards: 3,
        dateInscription: "2023-09-01",
        derniereConnexion: "2024-01-19",
      },
      {
        id: "3",
        numeroEtudiant: "ETU2024003",
        nom: "Bernard",
        prenom: "Sophie",
        email: "sophie.bernard@etud.univ.fr",
        filiere: "Pharmacie",
        niveau: "Année 1",
        statut: "actif",
        moyenne: 14.5,
        absences: 1,
        retards: 0,
        dateInscription: "2023-09-01",
        derniereConnexion: "2024-01-21",
      },
    ],
  },
  {
    id: "2",
    nom: "Physiologie spécialisée",
    filiere: "Médecine",
    niveau: "Année 2",
    matiere: "Physiologie",
    etudiants: [
      {
        id: "4",
        numeroEtudiant: "ETU2023015",
        nom: "Leroy",
        prenom: "Anne",
        email: "anne.leroy@etud.univ.fr",
        filiere: "Médecine",
        niveau: "Année 2",
        statut: "actif",
        moyenne: 16.3,
        absences: 0,
        retards: 1,
        dateInscription: "2022-09-01",
        derniereConnexion: "2024-01-21",
      },
      {
        id: "5",
        numeroEtudiant: "ETU2023020",
        nom: "Petit",
        prenom: "Paul",
        email: "paul.petit@etud.univ.fr",
        filiere: "Médecine",
        niveau: "Année 2",
        statut: "actif",
        moyenne: 13.7,
        absences: 3,
        retards: 2,
        dateInscription: "2022-09-01",
        derniereConnexion: "2024-01-20",
      },
    ],
  },
  {
    id: "3",
    nom: "TP Anatomie",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    matiere: "Anatomie",
    etudiants: [
      {
        id: "6",
        numeroEtudiant: "ETU2024045",
        nom: "Moreau",
        prenom: "Lucas",
        email: "lucas.moreau@etud.univ.fr",
        filiere: "Kinésithérapie",
        niveau: "Année 1",
        statut: "actif",
        moyenne: 11.8,
        absences: 4,
        retards: 2,
        dateInscription: "2023-09-01",
        derniereConnexion: "2024-01-18",
      },
      {
        id: "7",
        numeroEtudiant: "ETU2024046",
        nom: "Rousseau",
        prenom: "Emma",
        email: "emma.rousseau@etud.univ.fr",
        filiere: "Kinésithérapie",
        niveau: "Année 1",
        statut: "actif",
        moyenne: 15.1,
        absences: 1,
        retards: 0,
        dateInscription: "2023-09-01",
        derniereConnexion: "2024-01-21",
      },
    ],
  },
];

const statutLabels = {
  actif: { label: "Actif", color: "bg-green-100 text-green-800" },
  suspendu: { label: "Suspendu", color: "bg-red-100 text-red-800" },
  diplome: { label: "Diplômé", color: "bg-blue-100 text-blue-800" },
  abandonne: { label: "Abandon", color: "bg-gray-100 text-gray-800" },
  transfere: { label: "Transféré", color: "bg-yellow-100 text-yellow-800" },
};

export default function TeacherStudents() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState("list");

  // Flatten all students for the overview
  const allStudents = mockClassGroups.flatMap((group) => group.etudiants);

  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.numeroEtudiant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "all" ||
      mockClassGroups.find((group) =>
        group.etudiants.some((s) => s.id === student.id),
      )?.id === selectedClass;

    return matchesSearch && matchesClass;
  });

  const getGradeColor = (moyenne: number) => {
    if (moyenne >= 16) return "text-green-600 bg-green-50";
    if (moyenne >= 14) return "text-blue-600 bg-blue-50";
    if (moyenne >= 12) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const handleContactStudent = (studentId: string) => {
    // Logic to contact student
    console.log("Contacting student:", studentId);
  };

  const handleViewStudentProfile = (studentId: string) => {
    // Navigate to student profile or show details
    console.log("Viewing student profile:", studentId);
  };

  const totalStudents = allStudents.length;
  const averageGrade =
    Math.round(
      (allStudents.reduce((sum, student) => sum + (student.moyenne || 0), 0) /
        totalStudents) *
        10,
    ) / 10;
  const totalAbsences = allStudents.reduce(
    (sum, student) => sum + (student.absences || 0),
    0,
  );
  const studentsWithIssues = allStudents.filter(
    (student) => (student.moyenne || 0) < 10 || (student.absences || 0) > 5,
  ).length;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes Étudiants</h2>
            <p className="text-muted-foreground">
              Suivi et gestion de vos étudiants par cours
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
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
                Dans {mockClassGroups.length} cours
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Moyenne générale
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageGrade}/20</div>
              <p className="text-xs text-muted-foreground">
                Toutes matières confondues
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total absences
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAbsences}</div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Étudiants à risque
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentsWithIssues}</div>
              <p className="text-xs text-muted-foreground">
                Moyenne &lt; 10 ou absences &gt; 5
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Liste des étudiants</TabsTrigger>
            <TabsTrigger value="classes">Par cours</TabsTrigger>
          </TabsList>

          {/* Students List Tab */}
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tous mes étudiants</CardTitle>
                <CardDescription>
                  Vue d'ensemble de tous vos étudiants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un étudiant..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select
                      value={selectedClass}
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par cours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les cours</SelectItem>
                        {mockClassGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Moyenne</TableHead>
                      <TableHead>Absences</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {student.prenom} {student.nom}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.numeroEtudiant}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.filiere}</div>
                            <div className="text-sm text-muted-foreground">
                              {student.niveau}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.moyenne && (
                            <Badge className={getGradeColor(student.moyenne)}>
                              {student.moyenne}/20
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {student.absences || 0} absences
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.retards || 0} retards
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statutLabels[student.statut].color}>
                            {statutLabels[student.statut].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {student.derniereConnexion &&
                              new Date(
                                student.derniereConnexion,
                              ).toLocaleDateString("fr-FR")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleViewStudentProfile(student.id)
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Voir le profil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Voir les notes
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleContactStudent(student.id)}
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                Envoyer un email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Envoyer un message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <div className="grid gap-6">
              {mockClassGroups.map((classGroup) => (
                <Card key={classGroup.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5" />
                          <span>{classGroup.nom}</span>
                        </CardTitle>
                        <CardDescription>
                          {classGroup.filiere} - {classGroup.niveau} •{" "}
                          {classGroup.etudiants.length} étudiants
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Saisir notes
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Exporter liste
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {Math.round(
                            (classGroup.etudiants.reduce(
                              (sum, student) => sum + (student.moyenne || 0),
                              0,
                            ) /
                              classGroup.etudiants.length) *
                              10,
                          ) / 10}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Moyenne classe
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {
                            classGroup.etudiants.filter(
                              (s) => (s.moyenne || 0) >= 10,
                            ).length
                          }
                          /{classGroup.etudiants.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Étudiants en réussite
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {classGroup.etudiants.reduce(
                            (sum, student) => sum + (student.absences || 0),
                            0,
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total absences
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Étudiant</TableHead>
                          <TableHead>Moyenne</TableHead>
                          <TableHead>Absences</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classGroup.etudiants.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {student.prenom} {student.nom}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.numeroEtudiant}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {student.moyenne && (
                                <Badge
                                  className={getGradeColor(student.moyenne)}
                                >
                                  {student.moyenne}/20
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">
                                  {student.absences || 0} absences
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.retards || 0} retards
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <BarChart3 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
