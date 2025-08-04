import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Upload, 
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";

const absenceRequests = [
  {
    id: 1,
    type: "Absence pour maladie",
    dateDebut: "2024-01-25",
    dateFin: "2024-01-26",
    motif: "Grippe avec fièvre",
    statut: "En attente",
    datedemande: "2024-01-20",
    justificatif: "certificat_medical.pdf",
    cours: ["Anatomie générale", "TP Chimie"]
  },
  {
    id: 2,
    type: "Absence pour convocation",
    dateDebut: "2024-01-22",
    dateFin: "2024-01-22",
    motif: "Convocation au tribunal",
    statut: "Approuvé",
    datedemande: "2024-01-18",
    justificatif: "convocation_tribunal.pdf",
    cours: ["Physiologie"]
  },
  {
    id: 3,
    type: "Absence familiale",
    dateDebut: "2024-01-15",
    dateFin: "2024-01-16",
    motif: "Mariage cousin",
    statut: "Rejeté",
    datedemande: "2024-01-12",
    justificatif: null,
    cours: ["Mathématiques", "Chimie analytique"],
    motifRejet: "Motif non valable selon règlement"
  }
];

const documentRequests = [
  {
    id: 1,
    type: "Attestation de scolarité",
    motif: "Dossier bancaire",
    datedemande: "2024-01-19",
    statut: "Prêt",
    delaiEstime: "1-2 jours",
    urgence: "Normal"
  },
  {
    id: 2,
    type: "Relevé de notes",
    motif: "Candidature master",
    datedemande: "2024-01-17",
    statut: "En cours",
    delaiEstime: "3-5 jours",
    urgence: "Urgent"
  },
  {
    id: 3,
    type: "Certificat de stage",
    motif: "Validation stage obligatoire",
    datedemande: "2024-01-15",
    statut: "En attente",
    delaiEstime: "5-7 jours",
    urgence: "Normal"
  }
];

const otherRequests = [
  {
    id: 1,
    type: "Changement de groupe TP",
    objet: "Conflit d'horaire avec emploi",
    datedemande: "2024-01-18",
    statut: "En cours",
    service: "Scolarité"
  },
  {
    id: 2,
    type: "Report d'examen",
    objet: "Hospitalisation programmée",
    datedemande: "2024-01-16",
    statut: "Approuvé",
    service: "Direction pédagogique"
  },
  {
    id: 3,
    type: "Demande de bourse",
    objet: "Difficultés financières familiales",
    datedemande: "2024-01-10",
    statut: "En attente",
    service: "Service social"
  }
];

export default function StudentRequests() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAbsenceDialogOpen, setIsAbsenceDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Approuvé": case "Prêt": return "bg-green-100 text-green-800";
      case "En cours": case "En attente": return "bg-yellow-100 text-yellow-800";
      case "Rejeté": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Approuvé": case "Prêt": return <CheckCircle className="h-4 w-4" />;
      case "En cours": case "En attente": return <Clock className="h-4 w-4" />;
      case "Rejeté": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getUrgenceColor = (urgence: string) => {
    switch (urgence) {
      case "Express": return "bg-red-100 text-red-800";
      case "Urgent": return "bg-orange-100 text-orange-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes demandes</h2>
            <p className="text-muted-foreground">
              Gérez vos demandes d'absence, documents et autres requêtes
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isAbsenceDialogOpen} onOpenChange={setIsAbsenceDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Signaler absence
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Signaler une absence</DialogTitle>
                  <DialogDescription>
                    Informez l'administration de votre absence avec justification.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeAbsence" className="text-right">Type d'absence</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maladie">Maladie</SelectItem>
                        <SelectItem value="familiale">Raisons familiales</SelectItem>
                        <SelectItem value="convocation">Convocation officielle</SelectItem>
                        <SelectItem value="stage">Stage</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateDebut" className="text-right">Date début</Label>
                    <Input id="dateDebut" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateFin" className="text-right">Date fin</Label>
                    <Input id="dateFin" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motifAbsence" className="text-right">Motif</Label>
                    <Textarea id="motifAbsence" className="col-span-3" rows={3} placeholder="Expliquez le motif de votre absence..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="justificatifAbsence" className="text-right">Justificatif</Label>
                    <Input id="justificatifAbsence" type="file" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Envoyer la demande</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Demander document
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
                    <Label htmlFor="typeDoc" className="text-right">Type de document</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="attestation">Attestation de scolarité</SelectItem>
                        <SelectItem value="releve">Relevé de notes</SelectItem>
                        <SelectItem value="certificat">Certificat de stage</SelectItem>
                        <SelectItem value="duplicata">Duplicata diplôme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motifDoc" className="text-right">Motif</Label>
                    <Textarea id="motifDoc" className="col-span-3" rows={3} placeholder="Expliquez pourquoi vous avez besoin de ce document..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="urgenceDoc" className="text-right">Urgence</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Délai souhaité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (5-7 jours)</SelectItem>
                        <SelectItem value="urgent">Urgent (2-3 jours)</SelectItem>
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

            <Dialog open={isOtherDialogOpen} onOpenChange={setIsOtherDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Autre demande
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nouvelle demande</DialogTitle>
                  <DialogDescription>
                    Soumettez une demande générale aux services administratifs.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeAutre" className="text-right">Type de demande</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="changement">Changement de groupe</SelectItem>
                        <SelectItem value="report">Report d'examen</SelectItem>
                        <SelectItem value="bourse">Demande de bourse</SelectItem>
                        <SelectItem value="logement">Aide au logement</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="objetAutre" className="text-right">Objet</Label>
                    <Input id="objetAutre" className="col-span-3" placeholder="Résumé en quelques mots" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descriptionAutre" className="text-right">Description</Label>
                    <Textarea id="descriptionAutre" className="col-span-3" rows={4} placeholder="Détaillez votre demande..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceAutre" className="text-right">Service destinataire</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scolarite">Scolarité</SelectItem>
                        <SelectItem value="direction">Direction pédagogique</SelectItem>
                        <SelectItem value="social">Service social</SelectItem>
                        <SelectItem value="rh">Ressources humaines</SelectItem>
                        <SelectItem value="informatique">Service informatique</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total demandes</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">
                Toutes catégories confondues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Nécessite une réponse
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approuvées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Demandes validées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Nouvelles demandes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="absences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="absences">Demandes d'absence</TabsTrigger>
            <TabsTrigger value="documents">Documents officiels</TabsTrigger>
            <TabsTrigger value="autres">Autres demandes</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>

          {/* Absence Requests Tab */}
          <TabsContent value="absences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Demandes d'absence</span>
                </CardTitle>
                <CardDescription>
                  Vos signalements d'absence et leur statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type d'absence</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Cours concernés</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absenceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Du {new Date(request.dateDebut).toLocaleDateString('fr-FR')}</div>
                            <div>Au {new Date(request.dateFin).toLocaleDateString('fr-FR')}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-muted-foreground truncate">
                            {request.motif}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {request.cours.map((cours, idx) => (
                              <div key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {cours}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(request.statut)}
                              <Badge variant="secondary" className={getStatusColor(request.statut)}>
                                {request.statut}
                              </Badge>
                            </div>
                            {request.motifRejet && (
                              <div className="text-xs text-red-600">{request.motifRejet}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Requests Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Demandes de documents</span>
                </CardTitle>
                <CardDescription>
                  Documents officiels demandés auprès de l'administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type de document</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Date demande</TableHead>
                      <TableHead>Urgence</TableHead>
                      <TableHead>Délai estimé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{request.motif}</TableCell>
                        <TableCell>{new Date(request.datedemande).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getUrgenceColor(request.urgence)}>
                            {request.urgence}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.delaiEstime}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.statut)}
                            <Badge variant="secondary" className={getStatusColor(request.statut)}>
                              {request.statut}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.statut === "Prêt" ? (
                            <Button size="sm">
                              Télécharger
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Voir détails
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

          {/* Other Requests Tab */}
          <TabsContent value="autres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Autres demandes</span>
                </CardTitle>
                <CardDescription>
                  Demandes diverses aux services administratifs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type de demande</TableHead>
                      <TableHead>Objet</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date demande</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otherRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{request.objet}</TableCell>
                        <TableCell>{request.service}</TableCell>
                        <TableCell>{new Date(request.datedemande).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.statut)}
                            <Badge variant="secondary" className={getStatusColor(request.statut)}>
                              {request.statut}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="historique" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique complet</CardTitle>
                <CardDescription>
                  Toutes vos demandes depuis le début de l'année académique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher dans l'historique..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  
                  <div className="text-center text-muted-foreground py-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Historique complet disponible prochainement</p>
                    <p className="text-sm">Utilisez les onglets ci-dessus pour voir vos demandes par catégorie</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
