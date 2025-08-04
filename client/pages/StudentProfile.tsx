import StudentLayout from "@/components/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Edit,
  Save,
  Camera,
  Key,
  Bell,
  Shield,
  CreditCard,
  FileText,
} from "lucide-react";
import { useState } from "react";

const studentInfo = {
  informationsPersonnelles: {
    nom: "Marie Dupont",
    prenom: "Marie",
    dateNaissance: "2002-05-15",
    lieuNaissance: "Paris, France",
    nationalite: "Française",
    sexe: "Féminin",
  },
  contact: {
    email: "marie.dupont@etud.univ.fr",
    telephone: "06 12 34 56 78",
    adresse: "123 Rue de la Paix",
    ville: "Paris",
    codePostal: "75001",
    pays: "France",
  },
  informationsAcademiques: {
    numeroEtudiant: "ETU2024001",
    filiere: "Pharmacie",
    niveau: "Année 1",
    anneeDentree: "2023",
    statut: "Actif",
    regime: "Formation initiale",
  },
  informationsFinancieres: {
    statutFinancier: "À jour",
    dernierPaiement: "2024-01-15",
    montantDu: 0,
    modePaiement: "Virement bancaire",
  },
};

const academicHistory = [
  {
    annee: "2023-2024",
    filiere: "Pharmacie",
    niveau: "Année 1",
    statut: "En cours",
    moyenne: 14.5,
    credits: "16/30",
  },
  {
    annee: "2022-2023",
    filiere: "Baccalauréat Scientifique",
    niveau: "Terminale S",
    statut: "Validé",
    moyenne: 16.8,
    mention: "Mention Bien",
  },
];

export default function StudentProfile() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(studentInfo);

  const handleSave = () => {
    // Here you would typically save to API
    setEditMode(false);
    // Show success message
  };

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mon profil</h2>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et académiques
            </p>
          </div>

          <div className="flex space-x-2">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-lg">
                    {user?.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {editMode && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  {formData.informationsPersonnelles.nom}
                </h3>
                <p className="text-muted-foreground">
                  {formData.informationsAcademiques.numeroEtudiant}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {formData.informationsAcademiques.filiere}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {formData.informationsAcademiques.niveau}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {formData.informationsAcademiques.statut}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Statut financier
                </div>
                <div className="font-medium text-green-600">
                  {formData.informationsFinancieres.statutFinancier}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Membre depuis
                </div>
                <div className="font-medium">
                  {formData.informationsAcademiques.anneeDentree}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">
              Informations personnelles
            </TabsTrigger>
            <TabsTrigger value="academic">Acad��mique</TabsTrigger>
            <TabsTrigger value="financial">Financier</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Identité</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={formData.informationsPersonnelles.prenom}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange(
                            "informationsPersonnelles",
                            "prenom",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={formData.informationsPersonnelles.nom}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange(
                            "informationsPersonnelles",
                            "nom",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateNaissance">Date de naissance</Label>
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={formData.informationsPersonnelles.dateNaissance}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleChange(
                          "informationsPersonnelles",
                          "dateNaissance",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                    <Input
                      id="lieuNaissance"
                      value={formData.informationsPersonnelles.lieuNaissance}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleChange(
                          "informationsPersonnelles",
                          "lieuNaissance",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nationalite">Nationalité</Label>
                      <Input
                        id="nationalite"
                        value={formData.informationsPersonnelles.nationalite}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange(
                            "informationsPersonnelles",
                            "nationalite",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="sexe">Sexe</Label>
                      <Input
                        id="sexe"
                        value={formData.informationsPersonnelles.sexe}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange(
                            "informationsPersonnelles",
                            "sexe",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Contact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleChange("contact", "email", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={formData.contact.telephone}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleChange("contact", "telephone", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="adresse">Adresse</Label>
                    <Textarea
                      id="adresse"
                      value={formData.contact.adresse}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleChange("contact", "adresse", e.target.value)
                      }
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ville">Ville</Label>
                      <Input
                        id="ville"
                        value={formData.contact.ville}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange("contact", "ville", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="codePostal">Code postal</Label>
                      <Input
                        id="codePostal"
                        value={formData.contact.codePostal}
                        disabled={!editMode}
                        onChange={(e) =>
                          handleChange("contact", "codePostal", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Informations académiques</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Numéro étudiant</Label>
                      <Input
                        value={formData.informationsAcademiques.numeroEtudiant}
                        disabled
                      />
                    </div>

                    <div>
                      <Label>Filière</Label>
                      <Input
                        value={formData.informationsAcademiques.filiere}
                        disabled
                      />
                    </div>

                    <div>
                      <Label>Niveau d'étude</Label>
                      <Input
                        value={formData.informationsAcademiques.niveau}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Année d'entrée</Label>
                      <Input
                        value={formData.informationsAcademiques.anneeDentree}
                        disabled
                      />
                    </div>

                    <div>
                      <Label>Statut</Label>
                      <Input
                        value={formData.informationsAcademiques.statut}
                        disabled
                      />
                    </div>

                    <div>
                      <Label>Régime de formation</Label>
                      <Input
                        value={formData.informationsAcademiques.regime}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Informations financières</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Statut financier</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {formData.informationsFinancieres.statutFinancier}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label>Dernier paiement</Label>
                      <Input
                        value={new Date(
                          formData.informationsFinancieres.dernierPaiement,
                        ).toLocaleDateString("fr-FR")}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Montant dû</Label>
                      <Input
                        value={`${formData.informationsFinancieres.montantDu} €`}
                        disabled
                      />
                    </div>

                    <div>
                      <Label>Mode de paiement</Label>
                      <Input
                        value={formData.informationsFinancieres.modePaiement}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Sécurité et confidentialité</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Mot de passe</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dernière modification: Il y a 30 jours
                  </p>
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Notifications</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Gérez vos préférences de notification
                  </p>
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Paramètres de notification
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Données personnelles</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Téléchargez ou supprimez vos données
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter mes données
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Historique académique</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicHistory.map((year, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{year.annee}</h4>
                          <p className="text-sm text-muted-foreground">
                            {year.filiere}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {year.niveau}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              year.statut === "Validé"
                                ? "bg-green-100 text-green-800"
                                : year.statut === "En cours"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {year.statut}
                          </Badge>
                          {year.moyenne && (
                            <div className="text-sm mt-2">
                              <div>Moyenne: {year.moyenne}/20</div>
                              {year.mention && <div>{year.mention}</div>}
                              {year.credits && (
                                <div>Crédits: {year.credits}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
