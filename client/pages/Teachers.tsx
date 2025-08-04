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
  GraduationCap,
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
  Award,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  Filter,
} from "lucide-react";

const enseignants = [
  {
    id: 1,
    nom: "Dr. Jean Martin",
    email: "jean.martin@univ.fr",
    telephone: "06 12 34 56 78",
    specialite: "Anatomie",
    type: "Permanent",
    statut: "Actif",
    dateRecrutement: "2020-09-01",
    coordonnateur: ["Pharmacie Année 1", "Médecine Année 1"],
    maquettes: ["Pharmacie", "Médecine"],
    avatar: "/placeholder.svg",
    experience: "15 ans",
    diplomes: ["Doctorat en Médecine", "HDR Anatomie"],
  },
  {
    id: 2,
    nom: "Dr. Sophie Laurent",
    email: "sophie.laurent@univ.fr",
    telephone: "06 98 76 54 32",
    specialite: "Pharmacologie",
    type: "Vacataire",
    statut: "Actif",
    dateRecrutement: "2022-01-15",
    coordonnateur: [],
    maquettes: ["Pharmacie"],
    avatar: "/placeholder.svg",
    experience: "8 ans",
    diplomes: ["Doctorat en Pharmacie", "Master Pharmacologie"],
  },
  {
    id: 3,
    nom: "Dr. Marie Dubois",
    email: "marie.dubois@univ.fr",
    telephone: "06 45 67 89 01",
    specialite: "Physiologie",
    type: "Permanent",
    statut: "En congé",
    dateRecrutement: "2019-03-10",
    coordonnateur: ["Kinésithérapie Année 2"],
    maquettes: ["Kinésithérapie", "Médecine"],
    avatar: "/placeholder.svg",
    experience: "12 ans",
    diplomes: ["Doctorat en Sciences", "Agrégation"],
  },
];

const candidatures = [
  {
    id: 1,
    nom: "Dr. Pierre Durand",
    email: "pierre.durand@email.fr",
    poste: "Enseignant Chimie",
    dateDepot: "2024-01-10",
    statut: "En attente RH",
    type: "Nouveau",
    experience: "5 ans",
    specialite: "Chimie organique",
    cv: "cv_durand.pdf",
    lettreMotivation: "lm_durand.pdf",
  },
  {
    id: 2,
    nom: "Dr. Emma Wilson",
    email: "emma.wilson@email.fr",
    poste: "Enseignant Anatomie",
    dateDepot: "2024-01-08",
    statut: "Approuvé RH",
    type: "Nouveau",
    experience: "10 ans",
    specialite: "Anatomie pathologique",
    cv: "cv_wilson.pdf",
    lettreMotivation: "lm_wilson.pdf",
  },
  {
    id: 3,
    nom: "Dr. Thomas Bernard",
    email: "thomas.bernard@email.fr",
    poste: "Enseignant Pharmacologie",
    dateDepot: "2024-01-05",
    statut: "Rejeté",
    type: "Ancien",
    experience: "3 ans",
    specialite: "Pharmacocinétique",
    cv: "cv_bernard.pdf",
    lettreMotivation: "lm_bernard.pdf",
    motifRejet: "Expérience insuffisante",
  },
];

const offresEmploi = [
  {
    id: 1,
    titre: "Enseignant en Anatomie",
    departement: "Sciences biomédicales",
    type: "CDI",
    datePublication: "2024-01-01",
    dateLimite: "2024-02-01",
    statut: "Ouverte",
    candidatures: 12,
    description: "Enseigner l'anatomie générale et spécialisée",
  },
  {
    id: 2,
    titre: "Vacataire Chimie organique",
    departement: "Sciences de base",
    type: "Vacation",
    datePublication: "2023-12-15",
    dateLimite: "2024-01-15",
    statut: "Fermée",
    candidatures: 8,
    description: "Cours magistraux et travaux pratiques",
  },
  {
    id: 3,
    titre: "Coordonnateur Pharmacie",
    departement: "Sciences pharmaceutiques",
    type: "CDI",
    datePublication: "2024-01-05",
    dateLimite: "2024-02-15",
    statut: "Ouverte",
    candidatures: 5,
    description: "Coordination pédagogique et administrative",
  },
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedStatut, setSelectedStatut] = useState("Tous");
  const [isCreateOfferDialogOpen, setIsCreateOfferDialogOpen] = useState(false);
  const [isCreateTeacherDialogOpen, setIsCreateTeacherDialogOpen] =
    useState(false);

  const filteredEnseignants = enseignants.filter((enseignant) => {
    const matchesSearch =
      enseignant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.specialite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "Tous" || enseignant.type === selectedType;
    const matchesStatut =
      selectedStatut === "Tous" || enseignant.statut === selectedStatut;
    return matchesSearch && matchesType && matchesStatut;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Actif":
      case "Ouverte":
      case "Approuvé RH":
        return "bg-green-100 text-green-800";
      case "En congé":
      case "En attente RH":
        return "bg-yellow-100 text-yellow-800";
      case "Inactif":
      case "Fermée":
      case "Rejeté":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Permanent":
      case "CDI":
        return "bg-blue-100 text-blue-800";
      case "Vacataire":
      case "Vacation":
        return "bg-purple-100 text-purple-800";
      case "Nouveau":
        return "bg-green-100 text-green-800";
      case "Ancien":
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
              Gestion des enseignants
            </h2>
            <p className="text-muted-foreground">
              Gérez les candidatures, profils et assignations des enseignants
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Dialog
              open={isCreateOfferDialogOpen}
              onOpenChange={setIsCreateOfferDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Offre d'emploi
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Publier une offre d'emploi</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle offre d'emploi pour recruter des
                    enseignants.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="titre" className="text-right">
                      Titre du poste
                    </Label>
                    <Input
                      id="titre"
                      className="col-span-3"
                      placeholder="ex: Enseignant en Anatomie"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dept" className="text-right">
                      Département
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le département" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="base">Sciences de base</SelectItem>
                        <SelectItem value="bio">
                          Sciences biomédicales
                        </SelectItem>
                        <SelectItem value="pharma">
                          Sciences pharmaceutiques
                        </SelectItem>
                        <SelectItem value="humaines">
                          Sciences humaines
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeContrat" className="text-right">
                      Type de contrat
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cdi">CDI</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="cdd">CDD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateLimite" className="text-right">
                      Date limite
                    </Label>
                    <Input id="dateLimite" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Publier l'offre</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isCreateTeacherDialogOpen}
              onOpenChange={setIsCreateTeacherDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel enseignant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Créer un profil enseignant</DialogTitle>
                  <DialogDescription>
                    Ajoutez directement un nouvel enseignant au système.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nomEns" className="text-right">
                      Nom complet
                    </Label>
                    <Input id="nomEns" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="emailEns" className="text-right">
                      Email
                    </Label>
                    <Input id="emailEns" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telEns" className="text-right">
                      Téléphone
                    </Label>
                    <Input id="telEns" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="specialiteEns" className="text-right">
                      Spécialité
                    </Label>
                    <Input id="specialiteEns" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeEns" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="vacataire">Vacataire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="experienceEns" className="text-right">
                      Expérience
                    </Label>
                    <Input
                      id="experienceEns"
                      className="col-span-3"
                      placeholder="ex: 10 ans"
                    />
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
        <Tabs defaultValue="enseignants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enseignants">Enseignants</TabsTrigger>
            <TabsTrigger value="candidatures">Candidatures</TabsTrigger>
            <TabsTrigger value="offres">Offres d'emploi</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Enseignants Tab */}
          <TabsContent value="enseignants" className="space-y-4">
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
                        placeholder="Rechercher un enseignant..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous les types</SelectItem>
                      <SelectItem value="Permanent">Permanents</SelectItem>
                      <SelectItem value="Vacataire">Vacataires</SelectItem>
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
                      <SelectItem value="En congé">En congé</SelectItem>
                      <SelectItem value="Inactif">Inactifs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Teachers Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Enseignants ({filteredEnseignants.length})
                </CardTitle>
                <CardDescription>
                  Liste de tous les enseignants de l'établissement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Enseignant</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Maquettes</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnseignants.map((enseignant) => (
                      <TableRow key={enseignant.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={enseignant.avatar} />
                              <AvatarFallback>
                                {enseignant.nom
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {enseignant.nom}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {enseignant.email}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {enseignant.telephone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {enseignant.specialite}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {enseignant.experience}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(enseignant.type)}
                          >
                            {enseignant.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {enseignant.maquettes.map((maquette, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {maquette}
                              </Badge>
                            ))}
                            {enseignant.coordonnateur.length > 0 && (
                              <div className="text-xs text-primary font-medium">
                                Coordonnateur:{" "}
                                {enseignant.coordonnateur.join(", ")}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatutColor(enseignant.statut)}
                          >
                            {enseignant.statut}
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
                                <Award className="mr-2 h-4 w-4" />
                                Gérer les maquettes
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {enseignant.statut === "Actif" ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Désactiver
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activer
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

          {/* Candidatures Tab */}
          <TabsContent value="candidatures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidatures en cours</CardTitle>
                <CardDescription>
                  Gérez les candidatures pour les postes d'enseignants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Poste</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date dépôt</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidatures.map((candidature) => (
                      <TableRow key={candidature.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{candidature.nom}</div>
                            <div className="text-sm text-muted-foreground">
                              {candidature.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {candidature.specialite}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {candidature.poste}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {candidature.experience}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(candidature.type)}
                          >
                            {candidature.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidature.dateDepot).toLocaleDateString(
                            "fr-FR",
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              variant="secondary"
                              className={getStatutColor(candidature.statut)}
                            >
                              {candidature.statut}
                            </Badge>
                            {candidature.motifRejet && (
                              <div className="text-xs text-red-600">
                                {candidature.motifRejet}
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
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir le dossier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger CV
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {candidature.statut === "En attente RH" && (
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
                              {candidature.statut === "Approuvé RH" && (
                                <DropdownMenuItem>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Convertir en profil
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

          {/* Offres Tab */}
          <TabsContent value="offres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offres d'emploi</CardTitle>
                <CardDescription>
                  Gérez les offres d'emploi publiées sur la vitrine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Poste</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Candidatures</TableHead>
                      <TableHead>Date limite</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offresEmploi.map((offre) => (
                      <TableRow key={offre.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{offre.titre}</div>
                            <div className="text-sm text-muted-foreground">
                              {offre.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{offre.departement}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(offre.type)}
                          >
                            {offre.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {offre.candidatures}
                        </TableCell>
                        <TableCell>
                          {new Date(offre.dateLimite).toLocaleDateString(
                            "fr-FR",
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatutColor(offre.statut)}
                          >
                            {offre.statut}
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir candidatures
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {offre.statut === "Ouverte"
                                  ? "Fermer l'offre"
                                  : "Rouvrir l'offre"}
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

          {/* Statistiques Tab */}
          <TabsContent value="statistiques" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Enseignants
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    124 permanents, 32 vacataires
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Candidatures
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">
                    15 en attente, 7 approuvées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Offres actives
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 CDI, 1 vacation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Coordonnateurs
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">
                    Pour les 16 maquettes
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
