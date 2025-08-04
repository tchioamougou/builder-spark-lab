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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  UserCog,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  Filter,
  CreditCard,
  Bell,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const etudiants = [
  {
    id: 1,
    numeroEtudiant: "ETU2024001",
    nom: "Marie Dupont",
    email: "marie.dupont@etud.univ.fr",
    telephone: "06 12 34 56 78",
    dateNaissance: "2002-05-15",
    filiere: "Pharmacie",
    niveau: "Année 1",
    statut: "Actif",
    dateInscription: "2023-09-01",
    statutFinancier: "À jour",
    moyenne: 14.5,
    avatar: "/placeholder.svg",
    adresse: "123 Rue de la Paix, 75001 Paris",
  },
  {
    id: 2,
    numeroEtudiant: "ETU2024002",
    nom: "Jean Martin",
    email: "jean.martin@etud.univ.fr",
    telephone: "06 98 76 54 32",
    dateNaissance: "2001-11-22",
    filiere: "Médecine",
    niveau: "Année 3",
    statut: "Actif",
    dateInscription: "2021-09-01",
    statutFinancier: "Retard",
    moyenne: 16.2,
    avatar: "/placeholder.svg",
    adresse: "456 Avenue des Champs, 75008 Paris",
  },
  {
    id: 3,
    numeroEtudiant: "ETU2024003",
    nom: "Sophie Laurent",
    email: "sophie.laurent@etud.univ.fr",
    telephone: "06 45 67 89 01",
    dateNaissance: "2003-03-10",
    filiere: "Kinésithérapie",
    niveau: "Année 2",
    statut: "Suspendu",
    dateInscription: "2022-09-01",
    statutFinancier: "À jour",
    moyenne: 11.8,
    avatar: "/placeholder.svg",
    adresse: "789 Boulevard Saint-Michel, 75005 Paris",
  },
];

const demandesInscription = [
  {
    id: 1,
    nom: "Pierre Dubois",
    email: "pierre.dubois@email.fr",
    telephone: "06 11 22 33 44",
    filiere: "Pharmacie",
    niveau: "Année 1",
    typeCandidat: "Nouveau",
    dateDepot: "2024-01-15",
    statut: "En attente scolarité",
    documentsManquants: ["Diplôme bac", "Certificat médical"],
    moyenneBac: 16.5,
  },
  {
    id: 2,
    nom: "Emma Wilson",
    email: "emma.wilson@email.fr",
    telephone: "06 55 66 77 88",
    filiere: "Médecine",
    niveau: "Année 1",
    typeCandidat: "Nouveau",
    dateDepot: "2024-01-12",
    statut: "Approuvé",
    documentsManquants: [],
    moyenneBac: 18.2,
  },
  {
    id: 3,
    nom: "Thomas Bernard",
    email: "thomas.bernard@email.fr",
    telephone: "06 99 88 77 66",
    filiere: "Kinésithérapie",
    niveau: "Année 2",
    typeCandidat: "Ancien",
    dateDepot: "2024-01-10",
    statut: "Rejeté",
    documentsManquants: [],
    moyenneBac: 14.0,
    motifRejet: "Dossier incomplet",
  },
];

const demandesAbsence = [
  {
    id: 1,
    etudiant: "Marie Dupont",
    numeroEtudiant: "ETU2024001",
    filiere: "Pharmacie Année 1",
    typeAbsence: "Maladie",
    dateDebut: "2024-01-20",
    dateFin: "2024-01-22",
    statut: "En attente",
    justificatif: "certificat_medical.pdf",
    motif: "Grippe avec fièvre",
  },
  {
    id: 2,
    etudiant: "Jean Martin",
    numeroEtudiant: "ETU2024002",
    filiere: "Médecine Année 3",
    typeAbsence: "Convocation officielle",
    dateDebut: "2024-01-25",
    dateFin: "2024-01-25",
    statut: "Approuvé",
    justificatif: "convocation_tribunal.pdf",
    motif: "Convocation au tribunal",
  },
  {
    id: 3,
    etudiant: "Sophie Laurent",
    numeroEtudiant: "ETU2024003",
    filiere: "Kinésithérapie Année 2",
    typeAbsence: "Familiale",
    dateDebut: "2024-01-18",
    dateFin: "2024-01-19",
    statut: "Rejeté",
    justificatif: null,
    motif: "Mariage cousin",
    motifRejet: "Motif non valable",
  },
];

const activitesPortail = [
  {
    id: 1,
    etudiant: "Marie Dupont",
    action: "Téléchargement bulletin",
    date: "2024-01-20 14:30",
    details: "Bulletin Séquence 1",
  },
  {
    id: 2,
    etudiant: "Jean Martin",
    action: "Soumission rapport stage",
    date: "2024-01-20 10:15",
    details: "Rapport stage hôpital",
  },
  {
    id: 3,
    etudiant: "Sophie Laurent",
    action: "Demande absence",
    date: "2024-01-19 16:45",
    details: "Absence pour raisons familiales",
  },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("Toutes");
  const [selectedStatut, setSelectedStatut] = useState("Tous");
  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] =
    useState(false);

  const filteredEtudiants = etudiants.filter((etudiant) => {
    const matchesSearch =
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.numeroEtudiant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere =
      selectedFiliere === "Toutes" || etudiant.filiere === selectedFiliere;
    const matchesStatut =
      selectedStatut === "Tous" || etudiant.statut === selectedStatut;
    return matchesSearch && matchesFiliere && matchesStatut;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Actif":
      case "Approuvé":
      case "À jour":
        return "bg-green-100 text-green-800";
      case "Suspendu":
      case "En attente":
      case "En attente scolarité":
        return "bg-yellow-100 text-yellow-800";
      case "Inactif":
      case "Rejeté":
      case "Retard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Nouveau":
        return "bg-green-100 text-green-800";
      case "Ancien":
        return "bg-blue-100 text-blue-800";
      case "Maladie":
        return "bg-red-100 text-red-800";
      case "Convocation officielle":
        return "bg-purple-100 text-purple-800";
      case "Familiale":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Gestion des étudiants
            </h2>
            <p className="text-muted-foreground">
              Gérez les dossiers centralisés et le portail étudiant
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer étudiants
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Template import
            </Button>
            <Dialog
              open={isCreateStudentDialogOpen}
              onOpenChange={setIsCreateStudentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel étudiant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Créer un profil étudiant</DialogTitle>
                  <DialogDescription>
                    Ajoutez directement un nouvel étudiant au système.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nomEtud" className="text-right">
                      Nom complet
                    </Label>
                    <Input id="nomEtud" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="emailEtud" className="text-right">
                      Email
                    </Label>
                    <Input id="emailEtud" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telEtud" className="text-right">
                      Téléphone
                    </Label>
                    <Input id="telEtud" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="naissanceEtud" className="text-right">
                      Date naissance
                    </Label>
                    <Input
                      id="naissanceEtud"
                      type="date"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="filiereEtud" className="text-right">
                      Filière
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner la filière" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pharmacie">Pharmacie</SelectItem>
                        <SelectItem value="medecine">Médecine</SelectItem>
                        <SelectItem value="kine">Kinésithérapie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="niveauEtud" className="text-right">
                      Niveau
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annee1">Année 1</SelectItem>
                        <SelectItem value="annee2">Année 2</SelectItem>
                        <SelectItem value="annee3">Année 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Créer le profil</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="etudiants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="etudiants">Étudiants</TabsTrigger>
            <TabsTrigger value="demandes">Demandes inscription</TabsTrigger>
            <TabsTrigger value="absences">Demandes absence</TabsTrigger>
            <TabsTrigger value="portail">Activité portail</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Étudiants Tab */}
          <TabsContent value="etudiants" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres et recherche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un étudiant..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select
                    value={selectedFiliere}
                    onValueChange={setSelectedFiliere}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toutes">Toutes filières</SelectItem>
                      <SelectItem value="Pharmacie">Pharmacie</SelectItem>
                      <SelectItem value="Médecine">Médecine</SelectItem>
                      <SelectItem value="Kinésithérapie">
                        Kinésithérapie
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStatut}
                    onValueChange={setSelectedStatut}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous les statuts</SelectItem>
                      <SelectItem value="Actif">Actifs</SelectItem>
                      <SelectItem value="Suspendu">Suspendus</SelectItem>
                      <SelectItem value="Inactif">Inactifs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Students Table */}
            <Card>
              <CardHeader>
                <CardTitle>Étudiants ({filteredEtudiants.length})</CardTitle>
                <CardDescription>
                  Dossiers centralisés de tous les étudiants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Programme</TableHead>
                      <TableHead>Académique</TableHead>
                      <TableHead>Financier</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEtudiants.map((etudiant) => (
                      <TableRow key={etudiant.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={etudiant.avatar} />
                              <AvatarFallback>
                                {etudiant.nom
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{etudiant.nom}</div>
                              <div className="text-sm text-muted-foreground">
                                {etudiant.numeroEtudiant}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {etudiant.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {etudiant.filiere}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {etudiant.niveau}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Inscrit:{" "}
                              {new Date(etudiant.dateInscription).getFullYear()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              Moyenne: {etudiant.moyenne}/20
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Né le:{" "}
                              {new Date(
                                etudiant.dateNaissance,
                              ).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatutColor(etudiant.statutFinancier)}
                          >
                            {etudiant.statutFinancier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatutColor(etudiant.statut)}
                          >
                            {etudiant.statut}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir le dossier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Bulletin de notes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Statut financier
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {etudiant.statut === "Actif" ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Suspendre
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Réactiver
                                  </>
                                )}
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

          {/* Demandes inscription Tab */}
          <TabsContent value="demandes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'inscription</CardTitle>
                <CardDescription>
                  Validation des candidatures d'entrée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Programme demandé</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandesInscription.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{demande.nom}</div>
                            <div className="text-sm text-muted-foreground">
                              {demande.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {demande.telephone}
                            </div>
                            {demande.moyenneBac && (
                              <div className="text-xs text-blue-600">
                                Bac: {demande.moyenneBac}/20
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{demande.filiere}</div>
                            <div className="text-sm text-muted-foreground">
                              {demande.niveau}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(demande.typeCandidat)}
                          >
                            {demande.typeCandidat}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {demande.documentsManquants.length === 0 ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">Complet</span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center text-red-600">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Manquants:</span>
                                </div>
                                {demande.documentsManquants.map((doc, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs text-red-600 ml-5"
                                  >
                                    • {doc}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              variant="secondary"
                              className={getStatutColor(demande.statut)}
                            >
                              {demande.statut}
                            </Badge>
                            {demande.motifRejet && (
                              <div className="text-xs text-red-600">
                                {demande.motifRejet}
                              </div>
                            )}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir la demande
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Enrichir le dossier
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {demande.statut === "En attente scolarité" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approuver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeter
                                  </DropdownMenuItem>
                                </>
                              )}
                              {demande.statut === "Approuvé" && (
                                <DropdownMenuItem>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Convertir en étudiant
                                </DropdownMenuItem>
                              )}
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

          {/* Demandes absence Tab */}
          <TabsContent value="absences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'absence</CardTitle>
                <CardDescription>
                  Gestion des demandes et justificatifs d'absence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Type absence</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Justificatif</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandesAbsence.map((absence) => (
                      <TableRow key={absence.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {absence.etudiant}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {absence.numeroEtudiant}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {absence.filiere}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge
                              variant="secondary"
                              className={getTypeColor(absence.typeAbsence)}
                            >
                              {absence.typeAbsence}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">
                              {absence.motif}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              Du{" "}
                              {new Date(absence.dateDebut).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                            <div>
                              Au{" "}
                              {new Date(absence.dateFin).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {absence.justificatif ? (
                            <div className="flex items-center text-green-600">
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-sm">Fourni</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm">Manquant</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              variant="secondary"
                              className={getStatutColor(absence.statut)}
                            >
                              {absence.statut}
                            </Badge>
                            {absence.motifRejet && (
                              <div className="text-xs text-red-600">
                                {absence.motifRejet}
                              </div>
                            )}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              {absence.justificatif && (
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Télécharger justificatif
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {absence.statut === "En attente" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approuver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeter
                                  </DropdownMenuItem>
                                </>
                              )}
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

          {/* Portail Tab */}
          <TabsContent value="portail" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activité du portail étudiant</CardTitle>
                <CardDescription>
                  Dernières actions des étudiants sur le portail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activitesPortail.map((activite) => (
                    <div
                      key={activite.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <UserCog className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{activite.etudiant}</div>
                          <div className="text-sm text-muted-foreground">
                            {activite.action}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activite.details}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activite.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistiques Tab */}
          <TabsContent value="statistiques" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Étudiants
                  </CardTitle>
                  <UserCog className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    2,785 actifs, 62 suspendus
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Demandes inscription
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">
                    32 en attente, 12 approuvées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Demandes absence
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    8 en attente, 5 approuvées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Retards financiers
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">À relancer</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats by Program */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par filière</CardTitle>
                <CardDescription>
                  Nombre d'étudiants par programme d'études
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Pharmacie</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        1,247 étudiants
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "44%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="font-medium">Médecine</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        1,128 étudiants
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <span className="font-medium">Kinésithérapie</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        472 étudiants
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "16%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
