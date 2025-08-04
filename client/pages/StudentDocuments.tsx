import StudentLayout from "@/components/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import {
  FileText,
  Download,
  Upload,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  File,
  FileImage,
  Search,
} from "lucide-react";
import { useState } from "react";

const myDocuments = [
  {
    id: 1,
    nom: "Bulletin Séquence 1",
    type: "Bulletin",
    dateCreation: "2024-01-20",
    taille: "245 KB",
    format: "PDF",
    statut: "Disponible",
  },
  {
    id: 2,
    nom: "Attestation de scolarité",
    type: "Attestation",
    dateCreation: "2024-01-15",
    taille: "156 KB",
    format: "PDF",
    statut: "Disponible",
  },
  {
    id: 3,
    nom: "Rapport de stage",
    type: "Rapport",
    dateCreation: "2024-01-10",
    taille: "2.1 MB",
    format: "PDF",
    statut: "Soumis",
  },
  {
    id: 4,
    nom: "Justificatif absence",
    type: "Justificatif",
    dateCreation: "2024-01-08",
    taille: "450 KB",
    format: "JPG",
    statut: "Validé",
  },
];

const documentRequests = [
  {
    id: 1,
    type: "Relevé de notes",
    motif: "Candidature master",
    datedemande: "2024-01-18",
    statut: "En cours",
    delaiEstime: "3-5 jours",
  },
  {
    id: 2,
    type: "Attestation de scolarité",
    motif: "Dossier bancaire",
    datedemande: "2024-01-15",
    statut: "Prêt",
    delaiEstime: "1-2 jours",
  },
  {
    id: 3,
    type: "Duplicata diplôme",
    motif: "Perte document",
    datedemande: "2024-01-10",
    statut: "Rejeté",
    delaiEstime: "5-10 jours",
    motifRejet: "Déclaration de perte manquante",
  },
];

export default function StudentDocuments() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Disponible":
      case "Validé":
      case "Prêt":
        return "bg-green-100 text-green-800";
      case "Soumis":
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Rejeté":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Disponible":
      case "Validé":
      case "Prêt":
        return <CheckCircle className="h-4 w-4" />;
      case "En cours":
      case "Soumis":
        return <Clock className="h-4 w-4" />;
      case "Rejeté":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredDocuments = myDocuments.filter(
    (doc) =>
      doc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes documents</h2>
            <p className="text-muted-foreground">
              Gérez vos documents personnels et demandes
            </p>
          </div>

          <div className="flex space-x-2">
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Téléverser
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Téléverser un document</DialogTitle>
                  <DialogDescription>
                    Ajoutez un document à votre dossier personnel.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rapport">
                          Rapport de stage
                        </SelectItem>
                        <SelectItem value="justificatif">
                          Justificatif
                        </SelectItem>
                        <SelectItem value="memoire">Mémoire</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
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

            <Dialog
              open={isRequestDialogOpen}
              onOpenChange={setIsRequestDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Demander un document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Demande de document</DialogTitle>
                  <DialogDescription>
                    Demandez un document officiel auprès de l'administration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeDoc" className="text-right">
                      Type de document
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="releve">Relevé de notes</SelectItem>
                        <SelectItem value="attestation">
                          Attestation de scolarité
                        </SelectItem>
                        <SelectItem value="certificat">
                          Certificat de stage
                        </SelectItem>
                        <SelectItem value="duplicata">
                          Duplicata diplôme
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motif" className="text-right">
                      Motif
                    </Label>
                    <Textarea
                      id="motif"
                      className="col-span-3"
                      rows={3}
                      placeholder="Expliquez pourquoi vous avez besoin de ce document..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="urgent" className="text-right">
                      Urgence
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Délai souhaité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">
                          Normal (5-7 jours)
                        </SelectItem>
                        <SelectItem value="urgent">
                          Urgent (2-3 jours)
                        </SelectItem>
                        <SelectItem value="express">Express (24h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Envoyer la demande</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mes documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myDocuments.length}</div>
              <p className="text-xs text-muted-foreground">
                Documents personnels
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Demandes en cours
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  documentRequests.filter((req) => req.statut === "En cours")
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">En traitement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents prêts
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentRequests.filter((req) => req.statut === "Prêt").length}
              </div>
              <p className="text-xs text-muted-foreground">À télécharger</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Espace utilisé
              </CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 MB</div>
              <p className="text-xs text-muted-foreground">
                Sur 50 MB disponibles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">Mes documents</TabsTrigger>
            <TabsTrigger value="requests">Mes demandes</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Rechercher dans mes documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Documents personnels ({filteredDocuments.length})
                </CardTitle>
                <CardDescription>
                  Vos documents stockés et gérés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Taille</TableHead>
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
                                {doc.format}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          {new Date(doc.dateCreation).toLocaleDateString(
                            "fr-FR",
                          )}
                        </TableCell>
                        <TableCell>{doc.taille}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(doc.statut)}
                            <Badge
                              variant="secondary"
                              className={getStatusColor(doc.statut)}
                            >
                              {doc.statut}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes demandes de documents</CardTitle>
                <CardDescription>
                  Suivez le statut de vos demandes administratives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type de document</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Date demande</TableHead>
                      <TableHead>Délai estimé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.type}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.motif}
                        </TableCell>
                        <TableCell>
                          {new Date(request.datedemande).toLocaleDateString(
                            "fr-FR",
                          )}
                        </TableCell>
                        <TableCell>{request.delaiEstime}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(request.statut)}
                              <Badge
                                variant="secondary"
                                className={getStatusColor(request.statut)}
                              >
                                {request.statut}
                              </Badge>
                            </div>
                            {request.motifRejet && (
                              <div className="text-xs text-red-600">
                                {request.motifRejet}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.statut === "Prêt" ? (
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
