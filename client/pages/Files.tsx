import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  File,
  FileImage,
  FileSpreadsheet,
  User,
  Calendar,
  Folder,
  Archive,
  Filter,
} from "lucide-react";

const documents = [
  {
    id: 1,
    nom: "Bulletin S1 - Marie Dupont",
    type: "Bulletin",
    proprietaire: "Marie Dupont",
    typeProprietaire: "Étudiant",
    filiere: "Pharmacie",
    dateCreation: "2024-01-15",
    taille: "245 KB",
    format: "PDF",
    statut: "Validé",
    telechargements: 3,
  },
  {
    id: 2,
    nom: "CV - Dr. Jean Martin",
    type: "CV Enseignant",
    proprietaire: "Dr. Jean Martin",
    typeProprietaire: "Enseignant",
    filiere: "Anatomie",
    dateCreation: "2023-12-10",
    taille: "1.2 MB",
    format: "PDF",
    statut: "Approuvé",
    telechargements: 8,
  },
  {
    id: 3,
    nom: "Rapport Stage - Sophie Laurent",
    type: "Rapport",
    proprietaire: "Sophie Laurent",
    typeProprietaire: "Étudiant",
    filiere: "Kinésithérapie",
    dateCreation: "2024-01-18",
    taille: "3.4 MB",
    format: "PDF",
    statut: "En révision",
    telechargements: 1,
  },
  {
    id: 4,
    nom: "Justificatif médical - Pierre Dubois",
    type: "Justificatif",
    proprietaire: "Pierre Dubois",
    typeProprietaire: "Étudiant",
    filiere: "Médecine",
    dateCreation: "2024-01-20",
    taille: "156 KB",
    format: "JPG",
    statut: "En attente",
    telechargements: 0,
  },
];

const demandes = [
  {
    id: 1,
    demandeur: "Marie Dupont",
    type: "Relevé de notes",
    filiere: "Pharmacie Année 1",
    datedemande: "2024-01-20",
    statut: "En cours",
    motif: "Candidature master",
    documentsDemandes: ["Relevé S1", "Relevé S2"],
    delaiTraitement: "3-5 jours",
  },
  {
    id: 2,
    demandeur: "Dr. Sophie Laurent",
    type: "Attestation emploi",
    filiere: "Pharmacologie",
    datedemande: "2024-01-18",
    statut: "Prêt",
    motif: "Dossier bancaire",
    documentsDemandes: ["Attestation CDI"],
    delaiTraitement: "1-2 jours",
  },
  {
    id: 3,
    demandeur: "Jean Martin",
    type: "Duplicata diplôme",
    filiere: "Médecine Année 6",
    datedemande: "2024-01-15",
    statut: "Rejeté",
    motif: "Perte diplôme",
    documentsDemandes: ["Diplôme original"],
    delaiTraitement: "5-10 jours",
    motifRejet: "Déclaration de perte manquante",
  },
];

const modeles = [
  {
    id: 1,
    nom: "Bulletin de notes",
    description: "Modèle standard pour les bulletins semestriels",
    type: "Bulletin",
    dateCreation: "2023-09-01",
    version: "v2.1",
    utilisations: 1247,
  },
  {
    id: 2,
    nom: "Attestation de scolarité",
    description: "Attestation standard pour les étudiants",
    type: "Attestation",
    dateCreation: "2023-09-01",
    version: "v1.3",
    utilisations: 856,
  },
  {
    id: 3,
    nom: "Fiche d'évaluation enseignant",
    description: "Grille d'évaluation des performances",
    type: "Évaluation",
    dateCreation: "2023-10-15",
    version: "v1.0",
    utilisations: 124,
  },
  {
    id: 4,
    nom: "Rapport de stage",
    description: "Template pour les rapports de stage",
    type: "Rapport",
    dateCreation: "2023-11-01",
    version: "v3.2",
    utilisations: 432,
  },
];

const archives = [
  {
    id: 1,
    nom: "Bulletins 2022-2023",
    description: "Tous les bulletins de l'année précédente",
    dateArchivage: "2023-07-15",
    taille: "124 MB",
    documents: 2847,
    type: "Bulletins",
  },
  {
    id: 2,
    nom: "Dossiers candidatures enseignants 2023",
    description: "CVs et lettres de motivation archivés",
    dateArchivage: "2023-12-31",
    taille: "67 MB",
    documents: 156,
    type: "Candidatures",
  },
  {
    id: 3,
    nom: "Rapports de stage 2022-2023",
    description: "Rapports validés année précédente",
    dateArchivage: "2023-08-30",
    taille: "298 MB",
    documents: 432,
    type: "Rapports",
  },
];

export default function FilesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedStatut, setSelectedStatut] = useState("Tous");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.proprietaire.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "Tous" || doc.type === selectedType;
    const matchesStatut =
      selectedStatut === "Tous" || doc.statut === selectedStatut;
    return matchesSearch && matchesType && matchesStatut;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Validé":
      case "Approuvé":
      case "Prêt":
        return "bg-green-100 text-green-800";
      case "En révision":
      case "En cours":
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Rejeté":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bulletin":
        return "bg-blue-100 text-blue-800";
      case "CV Enseignant":
        return "bg-purple-100 text-purple-800";
      case "Rapport":
        return "bg-green-100 text-green-800";
      case "Justificatif":
        return "bg-orange-100 text-orange-800";
      case "Attestation":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-600" />;
      case "jpg":
      case "png":
      case "jpeg":
        return <FileImage className="h-4 w-4 text-blue-600" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleProprietaireRedirect = (proprietaire: string, typeProprietaire: string) => {
    if (typeProprietaire === "Étudiant") {
      // For demo, using ID 1 as we don't have the actual student ID
      navigate('/student-details/1');
    } else if (typeProprietaire === "Enseignant") {
      navigate('/teachers');
    } else {
      navigate('/user-management');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Gestion des dossiers
            </h2>
            <p className="text-muted-foreground">
              Gérez les documents, demandes et justificatifs
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/students')}
            >
              <User className="h-4 w-4 mr-2" />
              Gestion Étudiants
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/teachers')}
            >
              <User className="h-4 w-4 mr-2" />
              Gestion Enseignants
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/programs')}
            >
              <Archive className="h-4 w-4 mr-2" />
              Programmes
            </Button>
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Téléverser
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Téléverser un document</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau document au système de gestion.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeDoc" className="text-right">
                      Type document
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bulletin">Bulletin</SelectItem>
                        <SelectItem value="rapport">Rapport</SelectItem>
                        <SelectItem value="justificatif">
                          Justificatif
                        </SelectItem>
                        <SelectItem value="attestation">Attestation</SelectItem>
                        <SelectItem value="cv">CV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="proprioDoc" className="text-right">
                      Propriétaire
                    </Label>
                    <Input
                      id="proprioDoc"
                      className="col-span-3"
                      placeholder="Nom du propriétaire"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="filiereDoc" className="text-right">
                      Filière/Service
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pharmacie">Pharmacie</SelectItem>
                        <SelectItem value="medecine">Médecine</SelectItem>
                        <SelectItem value="kine">Kinésithérapie</SelectItem>
                        <SelectItem value="rh">Service RH</SelectItem>
                        <SelectItem value="scolarite">Scolarité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fichier" className="text-right">
                      Fichier
                    </Label>
                    <Input id="fichier" type="file" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Téléverser</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="demandes">Demandes</TabsTrigger>
            <TabsTrigger value="modeles">Modèles</TabsTrigger>
            <TabsTrigger value="archives">Archives</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
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
                        placeholder="Rechercher un document..."
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
                      <SelectItem value="Bulletin">Bulletins</SelectItem>
                      <SelectItem value="Rapport">Rapports</SelectItem>
                      <SelectItem value="CV Enseignant">
                        CV Enseignants
                      </SelectItem>
                      <SelectItem value="Justificatif">
                        Justificatifs
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
                      <SelectItem value="Validé">Validés</SelectItem>
                      <SelectItem value="En révision">En révision</SelectItem>
                      <SelectItem value="En attente">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
              <CardHeader>
                <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
                <CardDescription>
                  Tous les documents du système de gestion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Détails</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getFileIcon(doc.format)}
                            <div>
                              <div className="font-medium">{doc.nom}</div>
                              <div className="text-sm text-muted-foreground">
                                {doc.taille} • {doc.format}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {doc.proprietaire}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {doc.typeProprietaire}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {doc.filiere}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(doc.type)}
                          >
                            {doc.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              Créé:{" "}
                              {new Date(doc.dateCreation).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                            <div>{doc.telechargements} téléchargement(s)</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatutColor(doc.statut)}
                          >
                            {doc.statut}
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
                                Prévisualiser
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {doc.statut === "En révision" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Valider
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeter
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
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

          {/* Demandes Tab */}
          <TabsContent value="demandes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de documents</CardTitle>
                <CardDescription>
                  Gestion des demandes d'attestations et duplicatas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Demandeur</TableHead>
                      <TableHead>Type demande</TableHead>
                      <TableHead>Documents demandés</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandes.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {demande.demandeur}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {demande.filiere}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {demande.motif}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(demande.type)}
                          >
                            {demande.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {demande.documentsDemandes.map((doc, idx) => (
                              <div key={idx} className="text-sm">
                                • {doc}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {new Date(demande.datedemande).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                            <div className="text-muted-foreground">
                              Délai: {demande.delaiTraitement}
                            </div>
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
                                Voir détails
                              </DropdownMenuItem>
                              {demande.statut === "En cours" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Marquer prêt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeter
                                  </DropdownMenuItem>
                                </>
                              )}
                              {demande.statut === "Prêt" && (
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Télécharger documents
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

          {/* Modèles Tab */}
          <TabsContent value="modeles" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modeles.map((modele) => (
                <Card key={modele.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{modele.nom}</span>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(modele.type)}
                      >
                        {modele.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{modele.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>Version: {modele.version}</div>
                      <div>
                        Créé:{" "}
                        {new Date(modele.dateCreation).toLocaleDateString(
                          "fr-FR",
                        )}
                      </div>
                      <div>{modele.utilisations} utilisations</div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Archives Tab */}
          <TabsContent value="archives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Archives documentaires</CardTitle>
                <CardDescription>
                  Documents archivés par année et type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Archive</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Date archivage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {archives.map((archive) => (
                      <TableRow key={archive.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Folder className="h-5 w-5 text-orange-600" />
                            <div>
                              <div className="font-medium">{archive.nom}</div>
                              <div className="text-sm text-muted-foreground">
                                {archive.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(archive.type)}
                          >
                            {archive.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {archive.documents.toLocaleString()}
                        </TableCell>
                        <TableCell>{archive.taille}</TableCell>
                        <TableCell>
                          {new Date(archive.dateArchivage).toLocaleDateString(
                            "fr-FR",
                          )}
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
                                Explorer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Restaurer
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
                    Total Documents
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,847</div>
                  <p className="text-xs text-muted-foreground">+247 ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    En attente validation
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">À traiter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Demandes actives
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    En cours de traitement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Espace utilisé
                  </CardTitle>
                  <Archive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4 GB</div>
                  <p className="text-xs text-muted-foreground">
                    Sur 10 GB disponibles
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Document Types Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par type de document</CardTitle>
                <CardDescription>
                  Distribution des documents dans le système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Bulletins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        4,247 documents
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "33%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="font-medium">Rapports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        3,128 documents
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "24%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <span className="font-medium">Justificatifs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        2,847 documents
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <span className="font-medium">Attestations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        1,956 documents
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="font-medium">CVs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        669 documents
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "5%" }}
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
