import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  ArrowLeft,
  User,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Download,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  BookOpen,
  Award,
  MessageSquare,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Bell,
  Eye,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBulletinPDF } from "@/lib/pdf-utils";
import { useAuth } from "@/contexts/AuthContext";

interface StudentDetail {
  id: string;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  sexe: string;
  photoUrl?: string;

  // Informations académiques
  filiere: string;
  niveau: string;
  promotion: string;
  dateInscription: string;
  statut: "actif" | "suspendu" | "diplome" | "abandonne" | "transfere";

  // Informations financières
  fraisInscription: number;
  fraisScolarite: number;
  montantPaye: number;
  montantDu: number;
  statutFinancier: "a_jour" | "en_retard" | "bourseuse" | "exoneree";

  // Parents/Tuteurs
  tuteur1: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    profession: string;
    relation: string;
  };
  tuteur2?: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    profession: string;
    relation: string;
  };
}

interface Note {
  id: string;
  matiere: string;
  semestre: string;
  note: number;
  coefficient: number;
  type: "CC" | "TP" | "Examen" | "Rattrapage";
  date: string;
  enseignant: string;
}

interface Document {
  id: string;
  nom: string;
  type: string;
  dateUpload: string;
  taille: string;
  statut: "valide" | "en_attente" | "rejete";
  commentaire?: string;
}

interface Paiement {
  id: string;
  montant: number;
  datePaiement: string;
  methode: string;
  reference: string;
  type: "inscription" | "scolarite" | "autres";
  statut: "valide" | "en_attente" | "rejete";
}

const mockStudent: StudentDetail = {
  id: "2",
  numeroEtudiant: "ETU2024001",
  nom: "Dupont",
  prenom: "Marie",
  email: "marie.dupont@etud.univ.fr",
  telephone: "+33123456780",
  adresse: "123 Rue de la Paix, 75001 Paris",
  dateNaissance: "2001-03-15",
  lieuNaissance: "Paris",
  nationalite: "Française",
  sexe: "F",
  filiere: "Pharmacie",
  niveau: "Année 1",
  promotion: "2023-2024",
  dateInscription: "2023-09-01",
  statut: "actif",
  fraisInscription: 500,
  fraisScolarite: 3000,
  montantPaye: 2800,
  montantDu: 700,
  statutFinancier: "en_retard",
  tuteur1: {
    nom: "Dupont",
    prenom: "Jean",
    telephone: "+33123456789",
    email: "jean.dupont@gmail.com",
    profession: "Ingénieur",
    relation: "Père",
  },
  tuteur2: {
    nom: "Martin",
    prenom: "Sophie",
    telephone: "+33123456788",
    email: "sophie.martin@gmail.com",
    profession: "Médecin",
    relation: "Mère",
  },
};

const mockNotes: Note[] = [
  {
    id: "1",
    matiere: "Anatomie Générale",
    semestre: "S1",
    note: 15.5,
    coefficient: 3,
    type: "Examen",
    date: "2023-12-15",
    enseignant: "Dr. Martin",
  },
  {
    id: "2",
    matiere: "Physiologie",
    semestre: "S1",
    note: 12.0,
    coefficient: 2,
    type: "CC",
    date: "2023-11-20",
    enseignant: "Dr. Bernard",
  },
  {
    id: "3",
    matiere: "Chimie Organique",
    semestre: "S1",
    note: 18.0,
    coefficient: 3,
    type: "TP",
    date: "2023-12-10",
    enseignant: "Pr. Durand",
  },
];

const mockDocuments: Document[] = [
  {
    id: "1",
    nom: "Diplôme Baccalauréat",
    type: "Diplôme",
    dateUpload: "2023-09-01",
    taille: "2.4 MB",
    statut: "valide",
  },
  {
    id: "2",
    nom: "Certificat de naissance",
    type: "État civil",
    dateUpload: "2023-09-01",
    taille: "1.2 MB",
    statut: "valide",
  },
  {
    id: "3",
    nom: "Photo d'identité",
    type: "Photo",
    dateUpload: "2023-09-05",
    taille: "500 KB",
    statut: "en_attente",
    commentaire: "Qualité insuffisante, merci de soumettre une nouvelle photo",
  },
];

const mockPaiements: Paiement[] = [
  {
    id: "1",
    montant: 500,
    datePaiement: "2023-09-01",
    methode: "Virement bancaire",
    reference: "VIR20230901001",
    type: "inscription",
    statut: "valide",
  },
  {
    id: "2",
    montant: 1500,
    datePaiement: "2023-10-15",
    methode: "Chèque",
    reference: "CHQ20231015002",
    type: "scolarite",
    statut: "valide",
  },
  {
    id: "3",
    montant: 800,
    datePaiement: "2023-12-01",
    methode: "Espèces",
    reference: "ESP20231201003",
    type: "scolarite",
    statut: "valide",
  },
];

const statutLabels = {
  actif: { label: "Actif", color: "bg-green-100 text-green-800" },
  suspendu: { label: "Suspendu", color: "bg-red-100 text-red-800" },
  diplome: { label: "Diplômé", color: "bg-blue-100 text-blue-800" },
  abandonne: { label: "Abandon", color: "bg-gray-100 text-gray-800" },
  transfere: { label: "Transféré", color: "bg-yellow-100 text-yellow-800" },
};

const statutFinancierLabels = {
  a_jour: { label: "À jour", color: "bg-green-100 text-green-800" },
  en_retard: { label: "En retard", color: "bg-red-100 text-red-800" },
  bourseuse: { label: "Boursière", color: "bg-blue-100 text-blue-800" },
  exoneree: { label: "Exonérée", color: "bg-purple-100 text-purple-800" },
};

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student] = useState<StudentDetail>(mockStudent);
  const [notes] = useState<Note[]>(mockNotes);
  const [documents] = useState<Document[]>(mockDocuments);
  const [paiements] = useState<Paiement[]>(mockPaiements);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(student.statut);
  const [statusComment, setStatusComment] = useState("");

  const { toast } = useToast();

  const calculateMoyenne = () => {
    const totalPoints = notes.reduce(
      (sum, note) => sum + note.note * note.coefficient,
      0,
    );
    const totalCoefficients = notes.reduce(
      (sum, note) => sum + note.coefficient,
      0,
    );
    return totalCoefficients > 0
      ? (totalPoints / totalCoefficients).toFixed(2)
      : "0";
  };

  const handleDownloadBulletin = () => {
    generateBulletinPDF(student.nom + " " + student.prenom, notes);
    toast({
      title: "Bulletin téléchargé",
      description: "Le bulletin de notes a été téléchargé avec succès.",
    });
  };

  const handleStatusChange = () => {
    toast({
      title: "Statut modifié",
      description: `Le statut de l'étudiant a été changé en "${statutLabels[newStatus as keyof typeof statutLabels].label}".`,
    });
    setIsStatusDialogOpen(false);
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification envoyée",
      description: "Une notification a été envoyée à l'étudiant.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Dossier Étudiant
              </h2>
              <p className="text-muted-foreground">
                {student.prenom} {student.nom} - {student.numeroEtudiant}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSendNotification}>
              <Bell className="h-4 w-4 mr-2" />
              Notifier
            </Button>
            <Button variant="outline" onClick={handleDownloadBulletin}>
              <Download className="h-4 w-4 mr-2" />
              Bulletin
            </Button>
            <Dialog
              open={isStatusDialogOpen}
              onOpenChange={setIsStatusDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Changer statut
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier le statut de l'étudiant</DialogTitle>
                  <DialogDescription>
                    Changement du statut de {student.prenom} {student.nom}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Nouveau statut</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statutLabels).map(
                          ([value, { label }]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="comment">Commentaire (optionnel)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Raison du changement de statut..."
                      value={statusComment}
                      onChange={(e) => setStatusComment(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsStatusDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleStatusChange}>
                    Modifier le statut
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>

        {/* Student Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informations personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Nom complet
                </Label>
                <p className="text-sm">
                  {student.prenom} {student.nom}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Email
                </Label>
                <p className="text-sm">{student.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Téléphone
                </Label>
                <p className="text-sm">{student.telephone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Date de naissance
                </Label>
                <p className="text-sm">
                  {new Date(student.dateNaissance).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Informations académiques</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Filière
                </Label>
                <p className="text-sm">{student.filiere}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Niveau
                </Label>
                <p className="text-sm">{student.niveau}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Statut
                </Label>
                <Badge className={statutLabels[student.statut].color}>
                  {statutLabels[student.statut].label}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Moyenne générale
                </Label>
                <p className="text-lg font-bold text-blue-600">
                  {calculateMoyenne()}/20
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Situation financière</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Montant payé
                </Label>
                <p className="text-sm">{student.montantPaye}€</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Montant dû
                </Label>
                <p className="text-sm text-red-600 font-medium">
                  {student.montantDu}€
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Statut financier
                </Label>
                <Badge
                  className={
                    statutFinancierLabels[student.statutFinancier].color
                  }
                >
                  {statutFinancierLabels[student.statutFinancier].label}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Progression
                </Label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(student.montantPaye / (student.montantPaye + student.montantDu)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="financier">Financier</TabsTrigger>
            <TabsTrigger value="tuteurs">Tuteurs</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Numéro étudiant
                      </Label>
                      <p className="text-sm">{student.numeroEtudiant}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Date de naissance
                      </Label>
                      <p className="text-sm">
                        {new Date(student.dateNaissance).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Lieu de naissance
                      </Label>
                      <p className="text-sm">{student.lieuNaissance}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Nationalité
                      </Label>
                      <p className="text-sm">{student.nationalite}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Sexe
                      </Label>
                      <p className="text-sm">
                        {student.sexe === "M" ? "Masculin" : "Féminin"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Promotion
                      </Label>
                      <p className="text-sm">{student.promotion}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Date d'inscription
                      </Label>
                      <p className="text-sm">
                        {new Date(student.dateInscription).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Adresse
                      </Label>
                      <p className="text-sm">{student.adresse}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Email
                      </Label>
                      <p className="text-sm">{student.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Téléphone
                      </Label>
                      <p className="text-sm">{student.telephone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Relevé de notes</span>
                  <div className="text-lg font-bold text-blue-600">
                    Moyenne: {calculateMoyenne()}/20
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matière</TableHead>
                      <TableHead>Semestre</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Coefficient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Enseignant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">
                          {note.matiere}
                        </TableCell>
                        <TableCell>{note.semestre}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              note.note >= 10 ? "default" : "destructive"
                            }
                          >
                            {note.note}/20
                          </Badge>
                        </TableCell>
                        <TableCell>{note.coefficient}</TableCell>
                        <TableCell>{note.type}</TableCell>
                        <TableCell>
                          {new Date(note.date).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>{note.enseignant}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents du dossier</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date d'upload</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.nom}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          {new Date(doc.dateUpload).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>{doc.taille}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              doc.statut === "valide"
                                ? "bg-green-100 text-green-800"
                                : doc.statut === "en_attente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {doc.statut === "valide"
                              ? "Validé"
                              : doc.statut === "en_attente"
                                ? "En attente"
                                : "Rejeté"}
                          </Badge>
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

          <TabsContent value="financier" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé financier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Frais d'inscription:</span>
                    <span className="font-medium">
                      {student.fraisInscription}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de scolarité:</span>
                    <span className="font-medium">
                      {student.fraisScolarite}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total dû:</span>
                    <span className="font-medium">
                      {student.fraisInscription + student.fraisScolarite}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Montant payé:</span>
                    <span className="font-medium text-green-600">
                      {student.montantPaye}€
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Solde:</span>
                    <span
                      className={`font-bold ${student.montantDu > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {student.montantDu > 0 ? "-" : "+"}
                      {Math.abs(student.montantDu)}€
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statut financier</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      statutFinancierLabels[student.statutFinancier].color
                    }
                  >
                    {statutFinancierLabels[student.statutFinancier].label}
                  </Badge>
                  {student.statutFinancier === "en_retard" && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-800">
                          Paiement en retard
                        </span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">
                        Un montant de {student.montantDu}€ est en attente de
                        paiement.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paiements.map((paiement) => (
                      <TableRow key={paiement.id}>
                        <TableCell>
                          {new Date(paiement.datePaiement).toLocaleDateString(
                            "fr-FR",
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {paiement.montant}€
                        </TableCell>
                        <TableCell>{paiement.methode}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {paiement.reference}
                        </TableCell>
                        <TableCell className="capitalize">
                          {paiement.type}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              paiement.statut === "valide"
                                ? "bg-green-100 text-green-800"
                                : paiement.statut === "en_attente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {paiement.statut}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tuteurs" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tuteur principal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Nom complet
                    </Label>
                    <p className="text-sm">
                      {student.tuteur1.prenom} {student.tuteur1.nom}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Relation
                    </Label>
                    <p className="text-sm">{student.tuteur1.relation}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Profession
                    </Label>
                    <p className="text-sm">{student.tuteur1.profession}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Téléphone
                    </Label>
                    <p className="text-sm">{student.tuteur1.telephone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email
                    </Label>
                    <p className="text-sm">{student.tuteur1.email}</p>
                  </div>
                </CardContent>
              </Card>

              {student.tuteur2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tuteur secondaire</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Nom complet
                      </Label>
                      <p className="text-sm">
                        {student.tuteur2.prenom} {student.tuteur2.nom}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Relation
                      </Label>
                      <p className="text-sm">{student.tuteur2.relation}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Profession
                      </Label>
                      <p className="text-sm">{student.tuteur2.profession}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Téléphone
                      </Label>
                      <p className="text-sm">{student.tuteur2.telephone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Email
                      </Label>
                      <p className="text-sm">{student.tuteur2.email}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="historique" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Inscription validée</p>
                      <p className="text-xs text-muted-foreground">
                        01/09/2023 - Par Pierre Dubois
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documents soumis</p>
                      <p className="text-xs text-muted-foreground">
                        01/09/2023 - Diplôme baccalauréat et certificat de
                        naissance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Paiement reçu</p>
                      <p className="text-xs text-muted-foreground">
                        15/10/2023 - 1500€ par chèque
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Document rejeté</p>
                      <p className="text-xs text-muted-foreground">
                        05/09/2023 - Photo d'identité: qualité insuffisante
                      </p>
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
