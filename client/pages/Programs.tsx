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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Eye,
  ChevronRight,
  ChevronDown,
  Building,
  Users,
  Clock,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  code: string;
  nom: string;
  description: string;
  credits: number;
  heures: number;
  enseignant: string;
  prerequis?: string[];
  statut: "actif" | "suspendu" | "archive";
  semestre: number;
  evaluation: string;
}

interface UE {
  id: string;
  code: string;
  nom: string;
  description: string;
  credits: number;
  modules: Module[];
  statut: "actif" | "suspendu" | "archive";
}

interface Domaine {
  id: string;
  nom: string;
  description: string;
  ues: UE[];
  statut: "actif" | "suspendu" | "archive";
}

interface Sequence {
  id: string;
  nom: string;
  description: string;
  duree: number; // en mois
  domaines: Domaine[];
  statut: "actif" | "suspendu" | "archive";
}

interface Maquette {
  id: string;
  nom: string;
  version: string;
  description: string;
  dateCreation: string;
  sequences: Sequence[];
  statut: "actif" | "brouillon" | "archive";
  totalCredits: number;
}

interface Filiere {
  id: string;
  nom: string;
  description: string;
  duree: number; // en années
  maquettes: Maquette[];
  statut: "actif" | "suspendu" | "archive";
  capaciteAccueil: number;
  fraisInscription: number;
}

const mockFilieres: Filiere[] = [
  {
    id: "1",
    nom: "Pharmacie",
    description: "Formation en sciences pharmaceutiques",
    duree: 5,
    statut: "actif",
    capaciteAccueil: 120,
    fraisInscription: 3500,
    maquettes: [
      {
        id: "1",
        nom: "Maquette Pharmacie 2023",
        version: "2023.1",
        description: "Maquette officielle pour l'année académique 2023-2024",
        dateCreation: "2023-06-01",
        statut: "actif",
        totalCredits: 300,
        sequences: [
          {
            id: "1",
            nom: "Séquence 1 - Bases scientifiques",
            description: "Formation aux sciences fondamentales",
            duree: 12,
            statut: "actif",
            domaines: [
              {
                id: "1",
                nom: "Sciences Chimiques",
                description: "Chimie générale et organique",
                statut: "actif",
                ues: [
                  {
                    id: "1",
                    code: "UE-CHIM-001",
                    nom: "Chimie Générale",
                    description: "Fondamentaux de la chimie",
                    credits: 6,
                    statut: "actif",
                    modules: [
                      {
                        id: "1",
                        code: "MOD-CHIM-001",
                        nom: "Chimie Générale I",
                        description: "Atomes, liaisons chimiques, équilibres",
                        credits: 3,
                        heures: 45,
                        enseignant: "Dr. Durand",
                        statut: "actif",
                        semestre: 1,
                        evaluation: "Examen écrit + TP",
                      },
                      {
                        id: "2",
                        code: "MOD-CHIM-002",
                        nom: "Chimie Générale II",
                        description: "Thermodynamique, cinétique chimique",
                        credits: 3,
                        heures: 45,
                        enseignant: "Dr. Durand",
                        statut: "actif",
                        semestre: 1,
                        evaluation: "Examen écrit + TP",
                        prerequis: ["MOD-CHIM-001"],
                      },
                    ],
                  },
                  {
                    id: "2",
                    code: "UE-CHIM-002",
                    nom: "Chimie Organique",
                    description: "Chimie du carbone et mécanismes réactionnels",
                    credits: 8,
                    statut: "actif",
                    modules: [
                      {
                        id: "3",
                        code: "MOD-CHIM-003",
                        nom: "Chimie Organique Fondamentale",
                        description: "Structures, nomenclature, réactivité",
                        credits: 4,
                        heures: 60,
                        enseignant: "Pr. Martin",
                        statut: "actif",
                        semestre: 2,
                        evaluation: "Examen écrit + TP",
                      },
                      {
                        id: "4",
                        code: "MOD-CHIM-004",
                        nom: "Mécanismes Réactionnels",
                        description: "Étude des mécanismes de réaction",
                        credits: 4,
                        heures: 60,
                        enseignant: "Pr. Martin",
                        statut: "actif",
                        semestre: 2,
                        evaluation: "Examen oral + Projet",
                        prerequis: ["MOD-CHIM-003"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    nom: "Médecine",
    description: "Formation médicale générale",
    duree: 6,
    statut: "actif",
    capaciteAccueil: 80,
    fraisInscription: 4000,
    maquettes: [],
  },
];

const statutLabels = {
  actif: { label: "Actif", color: "bg-green-100 text-green-800" },
  suspendu: { label: "Suspendu", color: "bg-red-100 text-red-800" },
  archive: { label: "Archivé", color: "bg-gray-100 text-gray-800" },
  brouillon: { label: "Brouillon", color: "bg-yellow-100 text-yellow-800" },
};

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filieres, setFilieres] = useState<Filiere[]>(mockFilieres);
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere | null>(null);
  const [selectedMaquette, setSelectedMaquette] = useState<Maquette | null>(
    null,
  );
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isFiliereDialogOpen, setIsFiliereDialogOpen] = useState(false);
  const [isMaquetteDialogOpen, setIsMaquetteDialogOpen] = useState(false);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isCreateFiliereOpen, setIsCreateFiliereOpen] = useState(false);
  const [isViewMaquetteOpen, setIsViewMaquetteOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filiereToDelete, setFiliereToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleCreateFiliere = () => {
    const newFiliere: Filiere = {
      id: Date.now().toString(),
      maquettes: [],
      ...formData,
    } as Filiere;

    setFilieres([...filieres, newFiliere]);
    toast({
      title: "Filière créée",
      description: "La nouvelle filière a été créée avec succès.",
    });
    setIsCreateFiliereOpen(false);
    setFormData({});
  };

  const handleDeleteFiliere = (filiereId: string) => {
    setFilieres((filieres) => filieres.filter((f) => f.id !== filiereId));
    toast({
      title: "Filière supprimée",
      description: "La filière a été supprimée définitivement.",
      variant: "destructive",
    });
  };

  const handleChangeStatus = (type: string, id: string, newStatus: string) => {
    if (type === "filiere") {
      setFilieres((filieres) =>
        filieres.map((f) =>
          f.id === id ? { ...f, statut: newStatus as any } : f,
        ),
      );
    }
    toast({
      title: "Statut modifié",
      description: `Le statut a été changé en "${statutLabels[newStatus as keyof typeof statutLabels].label}".`,
    });
  };

  const calculateTotalCredits = (maquette: Maquette): number => {
    return maquette.sequences.reduce(
      (total, sequence) =>
        total +
        sequence.domaines.reduce(
          (seqTotal, domaine) =>
            seqTotal +
            domaine.ues.reduce((domTotal, ue) => domTotal + ue.credits, 0),
          0,
        ),
      0,
    );
  };

  const filteredFilieres = filieres.filter((filiere) => {
    const matchesSearch =
      filiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatut =
      filterStatut === "all" || filiere.statut === filterStatut;

    return matchesSearch && matchesStatut;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Gestion des Programmes Académiques
            </h2>
            <p className="text-muted-foreground">
              Configuration des filières, maquettes et modules d'enseignement
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter structure
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer maquette
            </Button>
            <Button onClick={() => setIsCreateFiliereOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle filière
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Filières actives
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filieres.filter((f) => f.statut === "actif").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Programmes proposés
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Maquettes validées
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filieres.reduce(
                  (total, f) =>
                    total +
                    f.maquettes.filter((m) => m.statut === "actif").length,
                  0,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Structures pédagogiques
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Modules enseignés
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filieres.reduce(
                  (total, f) =>
                    total +
                    f.maquettes.reduce(
                      (maqTotal, m) =>
                        maqTotal +
                        m.sequences.reduce(
                          (seqTotal, s) =>
                            seqTotal +
                            s.domaines.reduce(
                              (domTotal, d) =>
                                domTotal +
                                d.ues.reduce(
                                  (ueTotal, u) => ueTotal + u.modules.length,
                                  0,
                                ),
                              0,
                            ),
                          0,
                        ),
                      0,
                    ),
                  0,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Unités d'enseignement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Capacité d'accueil
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filieres.reduce((total, f) => total + f.capaciteAccueil, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Étudiants maximum</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="filieres" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="filieres">
              Filières ({filieres.length})
            </TabsTrigger>
            <TabsTrigger value="maquettes">Maquettes pédagogiques</TabsTrigger>
            <TabsTrigger value="modules">Modules d'enseignement</TabsTrigger>
            <TabsTrigger value="calendrier">Calendrier académique</TabsTrigger>
          </TabsList>

          {/* Filieres Tab */}
          <TabsContent value="filieres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filières d'études</CardTitle>
                <CardDescription>
                  Gestion des programmes de formation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une filière..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select
                      value={filterStatut}
                      onValueChange={setFilterStatut}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="suspendu">Suspendu</SelectItem>
                        <SelectItem value="archive">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filière</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Capacité</TableHead>
                      <TableHead>Frais</TableHead>
                      <TableHead>Maquettes</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFilieres.map((filiere) => (
                      <TableRow key={filiere.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{filiere.nom}</div>
                            <div className="text-sm text-muted-foreground">
                              {filiere.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{filiere.duree} ans</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{filiere.capaciteAccueil}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">
                            {filiere.fraisInscription}€
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {filiere.maquettes.length} maquette(s)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statutLabels[filiere.statut].color}>
                            {statutLabels[filiere.statut].label}
                          </Badge>
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
                                onClick={() => {
                                  setSelectedFiliere(filiere);
                                  setFormData(filiere);
                                  setIsFiliereDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouvelle maquette
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Voir maquettes
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {filiere.statut === "actif" ? (
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleChangeStatus(
                                      "filiere",
                                      filiere.id,
                                      "suspendu",
                                    )
                                  }
                                >
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Suspendre
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  className="text-green-600"
                                  onClick={() =>
                                    handleChangeStatus(
                                      "filiere",
                                      filiere.id,
                                      "actif",
                                    )
                                  }
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activer
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeStatus(
                                    "filiere",
                                    filiere.id,
                                    "archive",
                                  )
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Archiver
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setFiliereToDelete(filiere.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
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

          {/* Maquettes Tab */}
          <TabsContent value="maquettes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maquettes pédagogiques</CardTitle>
                <CardDescription>
                  Structure hiérarchique des programmes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filieres.map((filiere) => (
                    <div key={filiere.id} className="border rounded-lg p-4">
                      <Collapsible>
                        <CollapsibleTrigger
                          onClick={() =>
                            toggleExpanded(`filiere-${filiere.id}`)
                          }
                          className="flex items-center justify-between w-full text-left"
                        >
                          <div className="flex items-center space-x-2">
                            {expandedItems.has(`filiere-${filiere.id}`) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <Building className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold">{filiere.nom}</span>
                            <Badge
                              className={statutLabels[filiere.statut].color}
                            >
                              {statutLabels[filiere.statut].label}
                            </Badge>
                          </div>
                          <Badge variant="outline">
                            {filiere.maquettes.length} maquette(s)
                          </Badge>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 ml-6">
                          {filiere.maquettes.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                              <p>Aucune maquette définie pour cette filière</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Créer une maquette
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {filiere.maquettes.map((maquette) => (
                                <div
                                  key={maquette.id}
                                  className="border rounded-lg p-3 bg-gray-50"
                                >
                                  <Collapsible>
                                    <CollapsibleTrigger
                                      onClick={() =>
                                        toggleExpanded(
                                          `maquette-${maquette.id}`,
                                        )
                                      }
                                      className="flex items-center justify-between w-full text-left"
                                    >
                                      <div className="flex items-center space-x-2">
                                        {expandedItems.has(
                                          `maquette-${maquette.id}`,
                                        ) ? (
                                          <ChevronDown className="h-4 w-4" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4" />
                                        )}
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">
                                          {maquette.nom}
                                        </span>
                                        <Badge variant="secondary">
                                          {maquette.version}
                                        </Badge>
                                        <Badge
                                          className={
                                            statutLabels[maquette.statut].color
                                          }
                                        >
                                          {statutLabels[maquette.statut].label}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-sm text-muted-foreground">
                                          {calculateTotalCredits(maquette)}{" "}
                                          crédits
                                        </span>
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-3 ml-6">
                                      <div className="space-y-2">
                                        {maquette.sequences.map((sequence) => (
                                          <div
                                            key={sequence.id}
                                            className="border rounded p-2 bg-white"
                                          >
                                            <Collapsible>
                                              <CollapsibleTrigger
                                                onClick={() =>
                                                  toggleExpanded(
                                                    `sequence-${sequence.id}`,
                                                  )
                                                }
                                                className="flex items-center justify-between w-full text-left"
                                              >
                                                <div className="flex items-center space-x-2">
                                                  {expandedItems.has(
                                                    `sequence-${sequence.id}`,
                                                  ) ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                  ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                  )}
                                                  <Calendar className="h-4 w-4 text-purple-600" />
                                                  <span className="font-medium">
                                                    {sequence.nom}
                                                  </span>
                                                  <Badge variant="outline">
                                                    {sequence.duree} mois
                                                  </Badge>
                                                </div>
                                                <Badge variant="outline">
                                                  {sequence.domaines.length}{" "}
                                                  domaine(s)
                                                </Badge>
                                              </CollapsibleTrigger>
                                              <CollapsibleContent className="mt-2 ml-6">
                                                <div className="space-y-1">
                                                  {sequence.domaines.map(
                                                    (domaine) => (
                                                      <div
                                                        key={domaine.id}
                                                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                                      >
                                                        <div className="flex items-center space-x-2">
                                                          <Target className="h-4 w-4 text-orange-600" />
                                                          <span className="text-sm font-medium">
                                                            {domaine.nom}
                                                          </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                          <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                          >
                                                            {domaine.ues.reduce(
                                                              (total, ue) =>
                                                                total +
                                                                ue.credits,
                                                              0,
                                                            )}{" "}
                                                            crédits
                                                          </Badge>
                                                          <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                          >
                                                            {domaine.ues.length}{" "}
                                                            UE
                                                          </Badge>
                                                        </div>
                                                      </div>
                                                    ),
                                                  )}
                                                </div>
                                              </CollapsibleContent>
                                            </Collapsible>
                                          </div>
                                        ))}
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </div>
                              ))}
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Modules d'enseignement</CardTitle>
                <CardDescription>
                  Détail des unités d'enseignement et modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filieres.map((filiere) =>
                    filiere.maquettes.map((maquette) =>
                      maquette.sequences.map((sequence) =>
                        sequence.domaines.map((domaine) =>
                          domaine.ues.map((ue) => (
                            <div key={ue.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <BookOpen className="h-5 w-5 text-blue-600" />
                                  <span className="font-semibold">
                                    {ue.nom}
                                  </span>
                                  <Badge variant="outline">{ue.code}</Badge>
                                  <Badge className="bg-blue-100 text-blue-800">
                                    {ue.credits} crédits
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {filiere.nom} → {sequence.nom} → {domaine.nom}
                                </div>
                              </div>
                              <div className="grid gap-2">
                                {ue.modules.map((module) => (
                                  <div
                                    key={module.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium">
                                          {module.nom}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {module.code}
                                        </Badge>
                                        <Badge
                                          className={
                                            statutLabels[module.statut].color
                                          }
                                        >
                                          {statutLabels[module.statut].label}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-muted-foreground mb-2">
                                        {module.description}
                                      </div>
                                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                        <span>{module.credits} crédits</span>
                                        <span>{module.heures}h</span>
                                        <span>S{module.semestre}</span>
                                        <span>{module.enseignant}</span>
                                        <span>{module.evaluation}</span>
                                      </div>
                                      {module.prerequis &&
                                        module.prerequis.length > 0 && (
                                          <div className="mt-2">
                                            <span className="text-xs text-red-600">
                                              Prérequis:{" "}
                                              {module.prerequis.join(", ")}
                                            </span>
                                          </div>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedModule(module);
                                          setFormData(module);
                                          setIsModuleDialogOpen(true);
                                        }}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )),
                        ),
                      ),
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendrier Tab */}
          <TabsContent value="calendrier" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier académique</CardTitle>
                <CardDescription>
                  Planning des périodes d'enseignement et d'évaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>
                    Fonctionnalité de calendrier académique en cours de
                    développement
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Configurer le calendrier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Filiere Dialog */}
        <Dialog
          open={isCreateFiliereOpen}
          onOpenChange={setIsCreateFiliereOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle filière</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la filière</Label>
                <Input
                  id="nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duree">Durée (années)</Label>
                <Input
                  id="duree"
                  type="number"
                  value={formData.duree || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, duree: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacite">Capacité d'accueil</Label>
                <Input
                  id="capacite"
                  type="number"
                  value={formData.capaciteAccueil || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capaciteAccueil: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frais">Frais d'inscription (€)</Label>
                <Input
                  id="frais"
                  type="number"
                  value={formData.fraisInscription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fraisInscription: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={formData.statut || "actif"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, statut: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                    <SelectItem value="archive">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateFiliereOpen(false);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleCreateFiliere}>Créer la filière</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Filiere Dialog */}
        <Dialog
          open={isFiliereDialogOpen}
          onOpenChange={setIsFiliereDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier la filière</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nom">Nom de la filière</Label>
                <Input
                  id="edit-nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duree">Durée (années)</Label>
                <Input
                  id="edit-duree"
                  type="number"
                  value={formData.duree || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, duree: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacite">Capacité d'accueil</Label>
                <Input
                  id="edit-capacite"
                  type="number"
                  value={formData.capaciteAccueil || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capaciteAccueil: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-frais">Frais d'inscription (€)</Label>
                <Input
                  id="edit-frais"
                  type="number"
                  value={formData.fraisInscription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fraisInscription: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsFiliereDialogOpen(false);
                  setSelectedFiliere(null);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  if (selectedFiliere) {
                    setFilieres((filieres) =>
                      filieres.map((f) =>
                        f.id === selectedFiliere.id ? { ...f, ...formData } : f,
                      ),
                    );
                    toast({
                      title: "Filière modifiée",
                      description:
                        "Les informations ont été mises à jour avec succès.",
                    });
                    setIsFiliereDialogOpen(false);
                    setSelectedFiliere(null);
                    setFormData({});
                  }
                }}
              >
                Modifier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Module Dialog */}
        <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier le module</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="module-nom">Nom du module</Label>
                <Input
                  id="module-nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-code">Code du module</Label>
                <Input
                  id="module-code"
                  value={formData.code || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="module-description">Description</Label>
                <Textarea
                  id="module-description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-credits">Crédits</Label>
                <Input
                  id="module-credits"
                  type="number"
                  value={formData.credits || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      credits: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-heures">Heures d'enseignement</Label>
                <Input
                  id="module-heures"
                  type="number"
                  value={formData.heures || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, heures: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-enseignant">
                  Enseignant responsable
                </Label>
                <Input
                  id="module-enseignant"
                  value={formData.enseignant || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, enseignant: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-semestre">Semestre</Label>
                <Select
                  value={formData.semestre?.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, semestre: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Semestre 1</SelectItem>
                    <SelectItem value="2">Semestre 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="module-evaluation">Mode d'évaluation</Label>
                <Input
                  id="module-evaluation"
                  value={formData.evaluation || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, evaluation: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsModuleDialogOpen(false);
                  setSelectedModule(null);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Module modifié",
                    description:
                      "Les informations du module ont été mises à jour.",
                  });
                  setIsModuleDialogOpen(false);
                  setSelectedModule(null);
                  setFormData({});
                }}
              >
                Modifier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera définitivement la filière et toutes ses maquettes.
                Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {
                setDeleteDialogOpen(false);
                setFiliereToDelete(null);
              }}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (filiereToDelete) {
                    handleDeleteFiliere(filiereToDelete);
                  }
                  setDeleteDialogOpen(false);
                  setFiliereToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
