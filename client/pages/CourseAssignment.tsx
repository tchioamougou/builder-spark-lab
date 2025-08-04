import { useState } from "react";
import Layout from "@/components/Layout";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserPlus,
  Search,
  BookOpen,
  Users,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  User,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UE {
  id: string;
  code: string;
  nom: string;
  filiere: string;
  niveau: string;
  coefficient: number;
  heuresCoursTotal: number;
  heuresCM: number;
  heuresTD: number;
  heuresTP: number;
  semestre: string;
}

interface Teacher {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  statut: "permanent" | "vacataire";
  maxHeures: number;
  heuresAssignees: number;
}

interface Assignment {
  id: string;
  ueId: string;
  teacherId: string;
  role: "responsable" | "intervenant";
  heuresAssignees: number;
  typeIntervention: "cm" | "td" | "tp" | "cm_td" | "cm_tp" | "td_tp" | "all";
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
    heuresCoursTotal: 45,
    heuresCM: 20,
    heuresTD: 15,
    heuresTP: 10,
    semestre: "S1",
  },
  {
    id: "ue2",
    code: "PHYS201",
    nom: "Physiologie spécialisée",
    filiere: "Médecine",
    niveau: "Année 2",
    coefficient: 4,
    heuresCoursTotal: 60,
    heuresCM: 30,
    heuresTD: 20,
    heuresTP: 10,
    semestre: "S2",
  },
  {
    id: "ue3",
    code: "ANAT102",
    nom: "TP Anatomie pratique",
    filiere: "Kinésithérapie",
    niveau: "Année 1",
    coefficient: 2,
    heuresCoursTotal: 30,
    heuresCM: 5,
    heuresTD: 5,
    heuresTP: 20,
    semestre: "S1",
  },
  {
    id: "ue4",
    code: "BIOC101",
    nom: "Biochimie fondamentale",
    filiere: "Pharmacie",
    niveau: "Année 1",
    coefficient: 3,
    heuresCoursTotal: 50,
    heuresCM: 25,
    heuresTD: 15,
    heuresTP: 10,
    semestre: "S2",
  },
];

// Mock data for Teachers
const mockTeachers: Teacher[] = [
  {
    id: "t1",
    nom: "Martin",
    prenom: "Jean",
    email: "jean.martin@univ.fr",
    specialite: "Anatomie",
    statut: "permanent",
    maxHeures: 192,
    heuresAssignees: 120,
  },
  {
    id: "t2",
    nom: "Dubois",
    prenom: "Marie",
    email: "marie.dubois@univ.fr",
    specialite: "Physiologie",
    statut: "permanent",
    maxHeures: 192,
    heuresAssignees: 95,
  },
  {
    id: "t3",
    nom: "Leroy",
    prenom: "Pierre",
    email: "pierre.leroy@univ.fr",
    specialite: "Biochimie",
    statut: "vacataire",
    maxHeures: 96,
    heuresAssignees: 45,
  },
  {
    id: "t4",
    nom: "Bernard",
    prenom: "Sophie",
    email: "sophie.bernard@univ.fr",
    specialite: "Anatomie",
    statut: "permanent",
    maxHeures: 192,
    heuresAssignees: 80,
  },
];

// Mock assignments
const mockAssignments: Assignment[] = [
  {
    id: "a1",
    ueId: "ue1",
    teacherId: "t1",
    role: "responsable",
    heuresAssignees: 45,
    typeIntervention: "all",
  },
  {
    id: "a2",
    ueId: "ue2",
    teacherId: "t2",
    role: "responsable",
    heuresAssignees: 50,
    typeIntervention: "cm_td",
  },
  {
    id: "a3",
    ueId: "ue2",
    teacherId: "t4",
    role: "intervenant",
    heuresAssignees: 10,
    typeIntervention: "tp",
  },
];

const roleLabels = {
  responsable: { label: "Responsable", color: "bg-blue-100 text-blue-800" },
  intervenant: { label: "Intervenant", color: "bg-green-100 text-green-800" },
};

const typeInterventionLabels = {
  cm: "Cours Magistral",
  td: "Travaux Dirigés",
  tp: "Travaux Pratiques",
  cm_td: "CM + TD",
  cm_tp: "CM + TP",
  td_tp: "TD + TP",
  all: "Tous types",
};

export default function CourseAssignment() {
  const { toast } = useToast();
  
  const [ues, setUes] = useState<UE[]>(mockUEs);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedUE, setSelectedUE] = useState<UE | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    teacherId: "",
    role: "intervenant" as "responsable" | "intervenant",
    typeIntervention: "" as Assignment["typeIntervention"],
    heuresAssignees: "",
  });

  const filteredUEs = ues.filter((ue) =>
    ue.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ue.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ue.filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUEAssignments = (ueId: string) => {
    return assignments.filter(a => a.ueId === ueId);
  };

  const getTeacherInfo = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId);
  };

  const getUEInfo = (ueId: string) => {
    return ues.find(ue => ue.id === ueId);
  };

  const getTotalAssignedHours = (ueId: string) => {
    return assignments
      .filter(a => a.ueId === ueId)
      .reduce((total, a) => total + a.heuresAssignees, 0);
  };

  const getResponsableForUE = (ueId: string) => {
    const responsableAssignment = assignments.find(a => a.ueId === ueId && a.role === "responsable");
    return responsableAssignment ? getTeacherInfo(responsableAssignment.teacherId) : null;
  };

  const handleAssignTeacher = () => {
    if (!selectedUE || !newAssignment.teacherId || !newAssignment.typeIntervention || !newAssignment.heuresAssignees) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Check if teacher is already assigned as responsable
    const existingResponsable = assignments.find(
      a => a.ueId === selectedUE.id && a.role === "responsable"
    );

    if (newAssignment.role === "responsable" && existingResponsable) {
      toast({
        title: "Erreur",
        description: "Cette UE a déjà un enseignant responsable.",
        variant: "destructive",
      });
      return;
    }

    // Check if teacher is already assigned to this UE
    const existingAssignment = assignments.find(
      a => a.ueId === selectedUE.id && a.teacherId === newAssignment.teacherId
    );

    if (existingAssignment) {
      toast({
        title: "Erreur",
        description: "Cet enseignant est déjà assigné à cette UE.",
        variant: "destructive",
      });
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      ueId: selectedUE.id,
      teacherId: newAssignment.teacherId,
      role: newAssignment.role,
      heuresAssignees: parseInt(newAssignment.heuresAssignees),
      typeIntervention: newAssignment.typeIntervention,
    };

    setAssignments([...assignments, assignment]);

    // Update teacher's assigned hours
    setTeachers(prev => prev.map(teacher => 
      teacher.id === newAssignment.teacherId
        ? { ...teacher, heuresAssignees: teacher.heuresAssignees + parseInt(newAssignment.heuresAssignees) }
        : teacher
    ));

    toast({
      title: "Assignation créée",
      description: `L'enseignant a été assigné à l'UE ${selectedUE.code} avec succès.`,
    });

    // Reset form
    setNewAssignment({
      teacherId: "",
      role: "intervenant",
      typeIntervention: "",
      heuresAssignees: "",
    });
    setIsAssignDialogOpen(false);
    setSelectedUE(null);
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    setAssignments(prev => prev.filter(a => a.id !== assignmentId));

    // Update teacher's assigned hours
    setTeachers(prev => prev.map(teacher => 
      teacher.id === assignment.teacherId
        ? { ...teacher, heuresAssignees: teacher.heuresAssignees - assignment.heuresAssignees }
        : teacher
    ));

    toast({
      title: "Assignation supprimée",
      description: "L'assignation a été supprimée avec succès.",
    });
  };

  const getTeacherWorkload = (teacherId: string): { current: number; max: number; percentage: number } => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return { current: 0, max: 0, percentage: 0 };
    
    return {
      current: teacher.heuresAssignees,
      max: teacher.maxHeures,
      percentage: Math.round((teacher.heuresAssignees / teacher.maxHeures) * 100),
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Assignation des UE</h2>
            <p className="text-muted-foreground">
              Gestion de l'assignation des unités d'enseignement aux enseignants
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total UE</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ues.length}</div>
              <p className="text-xs text-muted-foreground">Unités d'enseignement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enseignants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="text-xs text-muted-foreground">
                {teachers.filter(t => t.statut === "permanent").length} permanents, {teachers.filter(t => t.statut === "vacataire").length} vacataires
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">UE assignées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ues.filter(ue => getResponsableForUE(ue.id)).length}
              </div>
              <p className="text-xs text-muted-foreground">Avec responsable</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">UE sans responsable</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ues.filter(ue => !getResponsableForUE(ue.id)).length}
              </div>
              <p className="text-xs text-muted-foreground">À assigner</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une UE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="ues" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ues">Unités d'Enseignement</TabsTrigger>
            <TabsTrigger value="teachers">Charge Enseignants</TabsTrigger>
            <TabsTrigger value="assignments">Toutes les Assignations</TabsTrigger>
          </TabsList>

          <TabsContent value="ues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des assignations par UE</CardTitle>
                <CardDescription>
                  Assignez les enseignants responsables et intervenants pour chaque UE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>UE</TableHead>
                      <TableHead>Filière/Niveau</TableHead>
                      <TableHead>Volume horaire</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Intervenants</TableHead>
                      <TableHead>Heures assignées</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUEs.map((ue) => {
                      const ueAssignments = getUEAssignments(ue.id);
                      const responsable = getResponsableForUE(ue.id);
                      const intervenants = ueAssignments.filter(a => a.role === "intervenant");
                      const totalAssigned = getTotalAssignedHours(ue.id);
                      const isFullyAssigned = totalAssigned >= ue.heuresCoursTotal;

                      return (
                        <TableRow key={ue.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ue.code}</div>
                              <div className="text-sm text-muted-foreground">{ue.nom}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ue.filiere}</div>
                              <div className="text-sm text-muted-foreground">{ue.niveau} - {ue.semestre}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>Total: {ue.heuresCoursTotal}h</div>
                              <div className="text-muted-foreground">
                                CM: {ue.heuresCM}h | TD: {ue.heuresTD}h | TP: {ue.heuresTP}h
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {responsable ? (
                              <div className="flex items-center space-x-2">
                                <Badge className={roleLabels.responsable.color}>
                                  {responsable.prenom} {responsable.nom}
                                </Badge>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-red-600">
                                Non assigné
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {intervenants.map((assignment) => {
                                const teacher = getTeacherInfo(assignment.teacherId);
                                return teacher ? (
                                  <div key={assignment.id} className="flex items-center justify-between">
                                    <Badge className={roleLabels.intervenant.color} size="sm">
                                      {teacher.prenom} {teacher.nom}
                                    </Badge>
                                    <div className="text-xs text-muted-foreground ml-2">
                                      {assignment.heuresAssignees}h
                                    </div>
                                  </div>
                                ) : null;
                              })}
                              {intervenants.length === 0 && (
                                <span className="text-sm text-muted-foreground">Aucun</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${isFullyAssigned ? "text-green-600" : "text-orange-600"}`}>
                                {totalAssigned}h / {ue.heuresCoursTotal}h
                              </span>
                              {isFullyAssigned ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUE(ue);
                                setIsAssignDialogOpen(true);
                              }}
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Assigner
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Charge de travail des enseignants</CardTitle>
                <CardDescription>
                  Vue d'ensemble de la charge horaire de chaque enseignant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Enseignant</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Charge actuelle</TableHead>
                      <TableHead>UE assignées</TableHead>
                      <TableHead>Progression</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => {
                      const workload = getTeacherWorkload(teacher.id);
                      const teacherAssignments = assignments.filter(a => a.teacherId === teacher.id);
                      const uniqueUEs = new Set(teacherAssignments.map(a => a.ueId));

                      return (
                        <TableRow key={teacher.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{teacher.prenom} {teacher.nom}</div>
                              <div className="text-sm text-muted-foreground">{teacher.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{teacher.specialite}</TableCell>
                          <TableCell>
                            <Badge variant={teacher.statut === "permanent" ? "default" : "outline"}>
                              {teacher.statut === "permanent" ? "Permanent" : "Vacataire"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {workload.current}h / {workload.max}h
                              </div>
                              <div className="text-muted-foreground">
                                {workload.percentage}% de charge
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {Array.from(uniqueUEs).map((ueId) => {
                                const ue = getUEInfo(ueId);
                                const assignment = teacherAssignments.find(a => a.ueId === ueId);
                                return ue && assignment ? (
                                  <div key={ueId} className="flex items-center justify-between">
                                    <span className="text-sm">{ue.code}</span>
                                    <Badge className={roleLabels[assignment.role].color} size="sm">
                                      {roleLabels[assignment.role].label}
                                    </Badge>
                                  </div>
                                ) : null;
                              })}
                              {uniqueUEs.size === 0 && (
                                <span className="text-sm text-muted-foreground">Aucune UE</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  workload.percentage >= 90 ? "bg-red-500" :
                                  workload.percentage >= 70 ? "bg-orange-500" :
                                  "bg-green-500"
                                }`}
                                style={{ width: `${Math.min(workload.percentage, 100)}%` }}
                              ></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les assignations</CardTitle>
                <CardDescription>
                  Liste complète de toutes les assignations UE/Enseignant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>UE</TableHead>
                      <TableHead>Enseignant</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Type d'intervention</TableHead>
                      <TableHead>Heures</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => {
                      const ue = getUEInfo(assignment.ueId);
                      const teacher = getTeacherInfo(assignment.teacherId);

                      return (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            {ue && (
                              <div>
                                <div className="font-medium">{ue.code}</div>
                                <div className="text-sm text-muted-foreground">{ue.nom}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {teacher && (
                              <div>
                                <div className="font-medium">{teacher.prenom} {teacher.nom}</div>
                                <div className="text-sm text-muted-foreground">{teacher.specialite}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={roleLabels[assignment.role].color}>
                              {roleLabels[assignment.role].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {typeInterventionLabels[assignment.typeIntervention]}
                          </TableCell>
                          <TableCell>{assignment.heuresAssignees}h</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Supprimer l'assignation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer cette assignation ? Cette action ne peut pas être annulée.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRemoveAssignment(assignment.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assignment Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assigner un enseignant</DialogTitle>
              <DialogDescription>
                {selectedUE && `Assignation pour l'UE ${selectedUE.code} - ${selectedUE.nom}`}
              </DialogDescription>
            </DialogHeader>
            {selectedUE && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Volume total:</span> {selectedUE.heuresCoursTotal}h
                    </div>
                    <div>
                      <span className="font-medium">CM:</span> {selectedUE.heuresCM}h
                    </div>
                    <div>
                      <span className="font-medium">TD:</span> {selectedUE.heuresTD}h
                    </div>
                    <div>
                      <span className="font-medium">TP:</span> {selectedUE.heuresTP}h
                    </div>
                    <div>
                      <span className="font-medium">Assigné:</span> {getTotalAssignedHours(selectedUE.id)}h
                    </div>
                    <div>
                      <span className="font-medium">Restant:</span> {selectedUE.heuresCoursTotal - getTotalAssignedHours(selectedUE.id)}h
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Enseignant</Label>
                    <Select
                      value={newAssignment.teacherId}
                      onValueChange={(value) => setNewAssignment({...newAssignment, teacherId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un enseignant" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => {
                          const workload = getTeacherWorkload(teacher.id);
                          return (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{teacher.prenom} {teacher.nom}</span>
                                <span className="text-xs text-muted-foreground ml-4">
                                  {workload.current}h/{workload.max}h ({workload.percentage}%)
                                </span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select
                      value={newAssignment.role}
                      onValueChange={(value) => setNewAssignment({...newAssignment, role: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="responsable">Responsable UE</SelectItem>
                        <SelectItem value="intervenant">Intervenant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type d'intervention</Label>
                    <Select
                      value={newAssignment.typeIntervention}
                      onValueChange={(value) => setNewAssignment({...newAssignment, typeIntervention: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">Cours Magistral ({selectedUE.heuresCM}h)</SelectItem>
                        <SelectItem value="td">Travaux Dirigés ({selectedUE.heuresTD}h)</SelectItem>
                        <SelectItem value="tp">Travaux Pratiques ({selectedUE.heuresTP}h)</SelectItem>
                        <SelectItem value="cm_td">CM + TD ({selectedUE.heuresCM + selectedUE.heuresTD}h)</SelectItem>
                        <SelectItem value="cm_tp">CM + TP ({selectedUE.heuresCM + selectedUE.heuresTP}h)</SelectItem>
                        <SelectItem value="td_tp">TD + TP ({selectedUE.heuresTD + selectedUE.heuresTP}h)</SelectItem>
                        <SelectItem value="all">Tous types ({selectedUE.heuresCoursTotal}h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Heures assignées</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="1"
                      max={selectedUE.heuresCoursTotal - getTotalAssignedHours(selectedUE.id)}
                      placeholder="Nombre d'heures"
                      value={newAssignment.heuresAssignees}
                      onChange={(e) => setNewAssignment({...newAssignment, heuresAssignees: e.target.value})}
                    />
                  </div>
                </div>

                {/* Current assignments for this UE */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Assignations actuelles pour cette UE :</h4>
                  <div className="space-y-2">
                    {getUEAssignments(selectedUE.id).map((assignment) => {
                      const teacher = getTeacherInfo(assignment.teacherId);
                      return teacher ? (
                        <div key={assignment.id} className="flex items-center justify-between text-sm">
                          <span>{teacher.prenom} {teacher.nom}</span>
                          <div className="flex items-center space-x-2">
                            <Badge className={roleLabels[assignment.role].color} size="sm">
                              {roleLabels[assignment.role].label}
                            </Badge>
                            <span>{assignment.heuresAssignees}h</span>
                          </div>
                        </div>
                      ) : null;
                    })}
                    {getUEAssignments(selectedUE.id).length === 0 && (
                      <span className="text-sm text-muted-foreground">Aucune assignation</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAssignTeacher}>
                <Save className="h-4 w-4 mr-2" />
                Assigner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
