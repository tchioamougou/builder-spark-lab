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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Save,
  ArrowLeft,
  BookOpen,
  Users,
  Calculator,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UE {
  id: string;
  code: string;
  nom: string;
  filiere: string;
  niveau: string;
  coefficient: number;
  ccPourcentage: number; // 30%
  examenPourcentage: number; // 70%
}

interface Student {
  id: string;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  notes: {
    cc?: number;
    examen?: number;
    moyenne?: number;
  };
}

interface GradeEntry {
  studentId: string;
  cc: string;
  examen: string;
}

// Mock data for UEs
const mockUEs: UE[] = [
  {
    id: "ue1",
    code: "ANAT101",
    nom: "Anatomie générale",
    filiere: "Pharmacie",
    niveau: "Année 1",
    coefficient: 3,
    ccPourcentage: 30,
    examenPourcentage: 70,
  },
  {
    id: "ue2",
    code: "PHYS201",
    nom: "Physiologie spécialisée", 
    filiere: "Médecine",
    niveau: "Année 2",
    coefficient: 4,
    ccPourcentage: 30,
    examenPourcentage: 70,
  },
  {
    id: "ue3",
    code: "ANAT102",
    nom: "TP Anatomie pratique",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    coefficient: 2,
    ccPourcentage: 30,
    examenPourcentage: 70,
  },
  {
    id: "ue4",
    code: "ANAT103",
    nom: "Anatomie du membre supérieur",
    filiere: "Pharmacie",
    niveau: "Année 1",
    coefficient: 2,
    ccPourcentage: 30,
    examenPourcentage: 70,
  },
];

// Mock students data
const mockStudents: Student[] = [
  {
    id: "1",
    numeroEtudiant: "ETU2024001",
    nom: "Dupont",
    prenom: "Marie",
    notes: {},
  },
  {
    id: "2",
    numeroEtudiant: "ETU2024002",
    nom: "Martin",
    prenom: "Jean",
    notes: {},
  },
  {
    id: "3",
    numeroEtudiant: "ETU2024003",
    nom: "Bernard",
    prenom: "Sophie",
    notes: {},
  },
  {
    id: "4",
    numeroEtudiant: "ETU2024004",
    nom: "Moreau",
    prenom: "Lucas",
    notes: {},
  },
  {
    id: "5",
    numeroEtudiant: "ETU2024005",
    nom: "Rousseau",
    prenom: "Emma",
    notes: {},
  },
  {
    id: "6",
    numeroEtudiant: "ETU2024006",
    nom: "Leroy",
    prenom: "Paul",
    notes: {},
  },
  {
    id: "7",
    numeroEtudiant: "ETU2024007",
    nom: "Petit",
    prenom: "Anne",
    notes: {},
  },
];

export default function TeacherGradeEntry() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedFiliere, setSelectedFiliere] = useState<string>("");
  const [selectedNiveau, setSelectedNiveau] = useState<string>("");
  const [selectedUE, setSelectedUE] = useState<string>("");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [grades, setGrades] = useState<Record<string, GradeEntry>>({});

  // Get unique filieres
  const filieres = Array.from(new Set(mockUEs.map(ue => ue.filiere)));

  // Get niveaux for selected filiere
  const niveaux = selectedFiliere 
    ? Array.from(new Set(mockUEs.filter(ue => ue.filiere === selectedFiliere).map(ue => ue.niveau)))
    : [];

  // Get UEs for selected filiere and niveau
  const availableUEs = mockUEs.filter(
    ue => ue.filiere === selectedFiliere && ue.niveau === selectedNiveau
  );

  const selectedUEData = mockUEs.find(ue => ue.id === selectedUE);

  const calculateMoyenne = (cc: number, examen: number, ue: UE): number => {
    return Math.round(((cc * ue.ccPourcentage + examen * ue.examenPourcentage) / 100) * 100) / 100;
  };

  const handleGradeChange = (studentId: string, type: 'cc' | 'examen', value: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: value,
      }
    }));
  };

  const getStudentMoyenne = (studentId: string): number | null => {
    const studentGrades = grades[studentId];
    if (!studentGrades || !selectedUEData) return null;
    
    const cc = parseFloat(studentGrades.cc || '0');
    const examen = parseFloat(studentGrades.examen || '0');
    
    if (studentGrades.cc && studentGrades.examen) {
      return calculateMoyenne(cc, examen, selectedUEData);
    }
    
    return null;
  };

  const getMoyenneColor = (moyenne: number): string => {
    if (moyenne >= 16) return "text-green-600 bg-green-50";
    if (moyenne >= 14) return "text-blue-600 bg-blue-50";
    if (moyenne >= 10) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const handleSaveGrades = () => {
    if (!selectedUE) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une unité d'enseignement.",
        variant: "destructive",
      });
      return;
    }

    const completedGrades = Object.entries(grades).filter(
      ([_, grade]) => grade.cc && grade.examen
    );

    if (completedGrades.length === 0) {
      toast({
        title: "Erreur", 
        description: "Veuillez saisir au moins une note complète (CC + Examen).",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit to your API
    toast({
      title: "Notes sauvegardées",
      description: `${completedGrades.length} notes sauvegardées avec succès pour ${selectedUEData?.nom}.`,
    });

    // Reset form
    setGrades({});
  };

  const handleReset = () => {
    setSelectedFiliere("");
    setSelectedNiveau("");
    setSelectedUE("");
    setGrades({});
  };

  const completedCount = Object.values(grades).filter(g => g.cc && g.examen).length;
  const totalStudents = students.length;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/teacher/grades')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Saisir des Notes</h2>
              <p className="text-muted-foreground">
                Saisie des notes par unité d'enseignement
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
            <Button onClick={handleSaveGrades} disabled={!selectedUE}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        {/* Selection Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Sélection de l'Unité d'Enseignement</span>
            </CardTitle>
            <CardDescription>
              Choisissez la filière, le niveau et l'UE pour saisir les notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filiere">Filière</Label>
                <Select
                  value={selectedFiliere}
                  onValueChange={(value) => {
                    setSelectedFiliere(value);
                    setSelectedNiveau("");
                    setSelectedUE("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une filière" />
                  </SelectTrigger>
                  <SelectContent>
                    {filieres.map((filiere) => (
                      <SelectItem key={filiere} value={filiere}>
                        {filiere}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="niveau">Niveau</Label>
                <Select
                  value={selectedNiveau}
                  onValueChange={(value) => {
                    setSelectedNiveau(value);
                    setSelectedUE("");
                  }}
                  disabled={!selectedFiliere}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveaux.map((niveau) => (
                      <SelectItem key={niveau} value={niveau}>
                        {niveau}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ue">Unité d'Enseignement</Label>
                <Select
                  value={selectedUE}
                  onValueChange={setSelectedUE}
                  disabled={!selectedNiveau}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une UE" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUEs.map((ue) => (
                      <SelectItem key={ue.id} value={ue.id}>
                        {ue.code} - {ue.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedUEData && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Code:</span> {selectedUEData.code}
                  </div>
                  <div>
                    <span className="font-medium">Coefficient:</span> {selectedUEData.coefficient}
                  </div>
                  <div>
                    <span className="font-medium">CC:</span> {selectedUEData.ccPourcentage}%
                  </div>
                  <div>
                    <span className="font-medium">Examen:</span> {selectedUEData.examenPourcentage}%
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        {selectedUE && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total étudiants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">Dans cette UE</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notes complètes</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCount}</div>
                <p className="text-xs text-muted-foreground">CC + Examen saisis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progression</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((completedCount / totalStudents) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Notes saisies</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Restant</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents - completedCount}</div>
                <p className="text-xs text-muted-foreground">À compléter</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grades Table */}
        {selectedUE && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Saisie des Notes - {selectedUEData?.nom}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    CC: {selectedUEData?.ccPourcentage}%
                  </Badge>
                  <Badge variant="outline">
                    Examen: {selectedUEData?.examenPourcentage}%
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Saisissez les notes de contrôle continu et d'examen final. La moyenne sera calculée automatiquement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">N° Étudiant</TableHead>
                    <TableHead>Nom et Prénom</TableHead>
                    <TableHead className="w-[120px]">CC ({selectedUEData?.ccPourcentage}%)</TableHead>
                    <TableHead className="w-[120px]">Examen ({selectedUEData?.examenPourcentage}%)</TableHead>
                    <TableHead className="w-[120px]">Moyenne</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const studentGrades = grades[student.id] || { cc: '', examen: '' };
                    const moyenne = getStudentMoyenne(student.id);
                    const isComplete = studentGrades.cc && studentGrades.examen;
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono text-sm">
                          {student.numeroEtudiant}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {student.prenom} {student.nom}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            step="0.25"
                            placeholder="0.00"
                            value={studentGrades.cc}
                            onChange={(e) => handleGradeChange(student.id, 'cc', e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            step="0.25"
                            placeholder="0.00"
                            value={studentGrades.examen}
                            onChange={(e) => handleGradeChange(student.id, 'examen', e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          {moyenne !== null ? (
                            <Badge className={getMoyenneColor(moyenne)}>
                              {moyenne.toFixed(2)}/20
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {isComplete ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complet
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              En cours
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <strong>Instructions:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Saisissez les notes sur 20</li>
                    <li>La moyenne est calculée automatiquement : CC ({selectedUEData?.ccPourcentage}%) + Examen ({selectedUEData?.examenPourcentage}%)</li>
                    <li>Les notes peuvent être saisies avec des décimales (ex: 15.75)</li>
                    <li>Assurez-vous de sauvegarder vos saisies avant de quitter</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}
