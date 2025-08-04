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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  Search,
  Plus,
  Edit,
  Save,
  Download,
  Upload,
  BookOpen,
  Calendar,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  evaluationType: string;
  subject: string;
  grade: number;
  maxGrade: number;
  date: string;
  comment?: string;
}

interface Course {
  id: string;
  name: string;
  filiere: string;
  niveau: string;
  students: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    name: "Anatomie générale",
    filiere: "Pharmacie",
    niveau: "Année 1",
    students: 45,
  },
  {
    id: "2",
    name: "Physiologie spécialisée",
    filiere: "Médecine",
    niveau: "Année 2",
    students: 38,
  },
  {
    id: "3",
    name: "TP Anatomie",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    students: 22,
  },
];

const mockGrades: Grade[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Marie Dupont",
    studentNumber: "ETU2024001",
    evaluationType: "Examen partiel",
    subject: "Anatomie générale",
    grade: 15.5,
    maxGrade: 20,
    date: "2024-01-15",
    comment: "Très bonne compréhension",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Jean Martin",
    studentNumber: "ETU2024002",
    evaluationType: "TP",
    subject: "Anatomie générale",
    grade: 12.0,
    maxGrade: 20,
    date: "2024-01-18",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Sophie Bernard",
    studentNumber: "ETU2024003",
    evaluationType: "Contrôle continu",
    subject: "Physiologie spécialisée",
    grade: 16.5,
    maxGrade: 20,
    date: "2024-01-20",
    comment: "Excellent travail",
  },
];

export default function TeacherGrades() {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState({
    studentName: "",
    evaluationType: "",
    subject: "",
    grade: "",
    maxGrade: "20",
    comment: "",
  });

  const { toast } = useToast();

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourse === "all" || grade.subject === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 70) return "text-blue-600 bg-blue-50";
    if (percentage >= 50) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const handleAddGrade = () => {
    if (!newGrade.studentName || !newGrade.evaluationType || !newGrade.subject || !newGrade.grade) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const grade: Grade = {
      id: Date.now().toString(),
      studentId: Date.now().toString(),
      studentName: newGrade.studentName,
      studentNumber: `ETU${Date.now().toString().slice(-6)}`,
      evaluationType: newGrade.evaluationType,
      subject: newGrade.subject,
      grade: parseFloat(newGrade.grade),
      maxGrade: parseFloat(newGrade.maxGrade),
      date: new Date().toISOString().split("T")[0],
      comment: newGrade.comment || undefined,
    };

    setGrades([...grades, grade]);
    setNewGrade({
      studentName: "",
      evaluationType: "",
      subject: "",
      grade: "",
      maxGrade: "20",
      comment: "",
    });
    setIsAddGradeOpen(false);
    
    toast({
      title: "Note ajoutée",
      description: "La note a été ajoutée avec succès.",
    });
  };

  const handleEditGrade = () => {
    if (!editingGrade) return;

    setGrades(grades.map(grade => 
      grade.id === editingGrade.id ? editingGrade : grade
    ));
    setIsEditGradeOpen(false);
    setEditingGrade(null);
    
    toast({
      title: "Note modifiée",
      description: "La note a été modifiée avec succès.",
    });
  };

  const averageGrade = grades.length > 0 
    ? Math.round((grades.reduce((sum, grade) => sum + (grade.grade / grade.maxGrade) * 20, 0) / grades.length) * 10) / 10
    : 0;

  const totalStudents = new Set(grades.map(g => g.studentId)).size;
  const gradesPending = 23; // Mock data
  const recentGrades = grades.slice(-5);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Notes</h2>
            <p className="text-muted-foreground">
              Saisie et suivi des évaluations de vos étudiants
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/teacher/grade-entry")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Saisie par UE
            </Button>
            <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Saisir note
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Saisir une nouvelle note</DialogTitle>
                  <DialogDescription>
                    Entrez les détails de l'évaluation
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Étudiant</Label>
                    <Input
                      id="student"
                      placeholder="Nom de l'étudiant"
                      value={newGrade.studentName}
                      onChange={(e) => setNewGrade({...newGrade, studentName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evaluation">Type d'évaluation</Label>
                    <Select
                      value={newGrade.evaluationType}
                      onValueChange={(value) => setNewGrade({...newGrade, evaluationType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Examen partiel">Examen partiel</SelectItem>
                        <SelectItem value="Examen final">Examen final</SelectItem>
                        <SelectItem value="TP">Travaux pratiques</SelectItem>
                        <SelectItem value="Contrôle continu">Contrôle continu</SelectItem>
                        <SelectItem value="Projet">Projet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matière</Label>
                    <Select
                      value={newGrade.subject}
                      onValueChange={(value) => setNewGrade({...newGrade, subject: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses.map((course) => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name}
                          </SelectItem>
                        ))}
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
                        placeholder="15.5"
                        value={newGrade.grade}
                        onChange={(e) => setNewGrade({...newGrade, grade: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxGrade">Barème</Label>
                      <Input
                        id="maxGrade"
                        type="number"
                        value={newGrade.maxGrade}
                        onChange={(e) => setNewGrade({...newGrade, maxGrade: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="comment">Commentaire (optionnel)</Label>
                    <Input
                      id="comment"
                      placeholder="Commentaire sur la performance"
                      value={newGrade.comment}
                      onChange={(e) => setNewGrade({...newGrade, comment: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddGradeOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddGrade}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total notes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{grades.length}</div>
              <p className="text-xs text-muted-foreground">Notes saisies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageGrade}/20</div>
              <p className="text-xs text-muted-foreground">Toutes matières</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants évalués</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Ayant des notes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradesPending}</div>
              <p className="text-xs text-muted-foreground">Notes à saisir</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="grades" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grades">Toutes les notes</TabsTrigger>
            <TabsTrigger value="recent">Notes récentes</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Liste des notes</CardTitle>
                <CardDescription>
                  Gestion de toutes vos évaluations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Filtrer par matière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les matières</SelectItem>
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Matière</TableHead>
                      <TableHead>Type d'évaluation</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Commentaire</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{grade.studentName}</div>
                            <div className="text-sm text-muted-foreground">
                              {grade.studentNumber}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{grade.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{grade.evaluationType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(grade.grade, grade.maxGrade)}>
                            {grade.grade}/{grade.maxGrade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(grade.date).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-32 truncate">
                            {grade.comment || "-"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingGrade(grade);
                              setIsEditGradeOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notes récentes</CardTitle>
                <CardDescription>
                  Les 5 dernières notes saisies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{grade.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {grade.subject} - {grade.evaluationType}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getGradeColor(grade.grade, grade.maxGrade)}>
                          {grade.grade}/{grade.maxGrade}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(grade.date).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Statistiques par matière</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCourses.map((course) => {
                      const courseGrades = grades.filter(g => g.subject === course.name);
                      const average = courseGrades.length > 0 
                        ? Math.round((courseGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 20, 0) / courseGrades.length) * 10) / 10
                        : 0;
                      
                      return (
                        <div key={course.id} className="border rounded-lg p-4">
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {course.filiere} - {course.niveau}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Moyenne: <strong>{average}/20</strong></span>
                            <span>Notes saisies: <strong>{courseGrades.length}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { range: "16-20", label: "Très bien", color: "bg-green-500" },
                      { range: "14-16", label: "Bien", color: "bg-blue-500" },
                      { range: "12-14", label: "Assez bien", color: "bg-yellow-500" },
                      { range: "10-12", label: "Passable", color: "bg-orange-500" },
                      { range: "0-10", label: "Insuffisant", color: "bg-red-500" },
                    ].map((category) => {
                      const count = grades.filter(grade => {
                        const normalizedGrade = (grade.grade / grade.maxGrade) * 20;
                        const [min, max] = category.range.split('-').map(Number);
                        return normalizedGrade >= min && normalizedGrade < max;
                      }).length;
                      const percentage = grades.length > 0 ? Math.round((count / grades.length) * 100) : 0;
                      
                      return (
                        <div key={category.range} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${category.color}`}></div>
                          <div className="flex-1 flex justify-between">
                            <span className="text-sm">{category.label} ({category.range})</span>
                            <span className="text-sm font-medium">{count} ({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Grade Dialog */}
        <Dialog open={isEditGradeOpen} onOpenChange={setIsEditGradeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la note</DialogTitle>
            </DialogHeader>
            {editingGrade && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Note</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={editingGrade.grade}
                      onChange={(e) => setEditingGrade({
                        ...editingGrade,
                        grade: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Barème</Label>
                    <Input
                      type="number"
                      value={editingGrade.maxGrade}
                      onChange={(e) => setEditingGrade({
                        ...editingGrade,
                        maxGrade: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Commentaire</Label>
                  <Input
                    value={editingGrade.comment || ""}
                    onChange={(e) => setEditingGrade({
                      ...editingGrade,
                      comment: e.target.value
                    })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditGradeOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditGrade}>Modifier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
