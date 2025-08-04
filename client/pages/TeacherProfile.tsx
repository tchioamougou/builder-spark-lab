import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Switch } from "@/components/ui/switch";
import {
  User,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Settings,
  Bell,
  Lock,
  Eye,
  Download,
  Upload,
  FileText,
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TeacherProfile {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateNaissance: string;
  specialite: string;
  diplomes: string[];
  experience: string;
  bio: string;
  dateEmbauche: string;
  statut: "permanent" | "vacataire";
  departement: string;
  bureau: string;
  heuresEnseignement: number;
  coursEnseignes: string[];
  avatar?: string;
}

const mockProfile: TeacherProfile = {
  id: "1",
  nom: "Martin",
  prenom: "Jean",
  email: "jean.martin@univ.fr",
  telephone: "+33 1 23 45 67 89",
  adresse: "123 rue de l'Université, 75000 Paris",
  dateNaissance: "1975-05-15",
  specialite: "Anatomie et Physiologie",
  diplomes: [
    "Doctorat en Sciences Médicales - Université de Paris (2005)",
    "Master en Anatomie - Université Lyon 1 (2000)",
    "Licence en Sciences de la Vie - Université Toulouse III (1998)",
  ],
  experience: "15 ans d'enseignement universitaire",
  bio: "Professeur passionné par l'anatomie humaine avec une expertise particulière dans le système cardiovasculaire. Auteur de plusieurs publications scientifiques et membre de l'Association Française d'Anatomie.",
  dateEmbauche: "2008-09-01",
  statut: "permanent",
  departement: "Sciences Médicales",
  bureau: "Bâtiment A - Bureau 205",
  heuresEnseignement: 192,
  coursEnseignes: [
    "Anatomie générale",
    "Physiologie spécialisée",
    "TP Anatomie",
  ],
  avatar: undefined,
};

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newMessages: boolean;
  gradeReminders: boolean;
  scheduleChanges: boolean;
  systemUpdates: boolean;
}

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  newMessages: true,
  gradeReminders: true,
  scheduleChanges: true,
  systemUpdates: false,
};

export default function TeacherProfile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<TeacherProfile>(mockProfile);
  const [notifications, setNotifications] = useState<NotificationSettings>(
    mockNotificationSettings,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  const handleSaveNotifications = () => {
    // Save notification settings
    toast({
      title: "Préférences sauvegardées",
      description: "Vos préférences de notification ont été mises à jour.",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    // Change password logic here
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsPasswordDialogOpen(false);

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été modifié avec succès.",
    });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle avatar upload
      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été mise à jour.",
      });
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
            <p className="text-muted-foreground">
              Gestion de vos informations personnelles et préférences
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier le profil
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">
              Informations personnelles
            </TabsTrigger>
            <TabsTrigger value="professional">
              Informations professionnelles
            </TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Picture */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Photo de profil</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl">
                      {profile.prenom[0]}
                      {profile.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">
                      {profile.prenom} {profile.nom}
                    </h3>
                    <p className="text-muted-foreground">
                      {profile.specialite}
                    </p>
                    <Badge className="mt-2">
                      {profile.statut === "permanent"
                        ? "Enseignant permanent"
                        : "Vacataire"}
                    </Badge>
                  </div>
                  {isEditing && (
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Changer la photo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Vos données personnelles et coordonnées
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={profile.prenom}
                        onChange={(e) =>
                          setProfile({ ...profile, prenom: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={profile.nom}
                        onChange={(e) =>
                          setProfile({ ...profile, nom: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Mail className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <div className="flex">
                        <Phone className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                        <Input
                          id="telephone"
                          value={profile.telephone}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              telephone: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <div className="flex">
                      <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                      <Input
                        id="adresse"
                        value={profile.adresse}
                        onChange={(e) =>
                          setProfile({ ...profile, adresse: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateNaissance">Date de naissance</Label>
                    <div className="flex">
                      <Calendar className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                      <Input
                        id="dateNaissance"
                        type="date"
                        value={profile.dateNaissance}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            dateNaissance: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Décrivez votre parcours et vos centres d'intérêt..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Professional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations professionnelles</CardTitle>
                  <CardDescription>
                    Détails de votre poste et affectation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialite">Spécialité</Label>
                    <Input
                      id="specialite"
                      value={profile.specialite}
                      onChange={(e) =>
                        setProfile({ ...profile, specialite: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departement">Département</Label>
                    <Input
                      id="departement"
                      value={profile.departement}
                      onChange={(e) =>
                        setProfile({ ...profile, departement: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bureau">Bureau</Label>
                    <Input
                      id="bureau"
                      value={profile.bureau}
                      onChange={(e) =>
                        setProfile({ ...profile, bureau: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateEmbauche">Date d'embauche</Label>
                      <Input
                        id="dateEmbauche"
                        type="date"
                        value={profile.dateEmbauche}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            dateEmbauche: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heuresEnseignement">
                        Heures d'enseignement/an
                      </Label>
                      <Input
                        id="heuresEnseignement"
                        type="number"
                        value={profile.heuresEnseignement}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            heuresEnseignement: parseInt(e.target.value),
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statut">Statut</Label>
                    <Select
                      value={profile.statut}
                      onValueChange={(value) =>
                        setProfile({ ...profile, statut: value as any })
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">
                          Enseignant permanent
                        </SelectItem>
                        <SelectItem value="vacataire">Vacataire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Courses and Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Cours enseignés</CardTitle>
                  <CardDescription>
                    Matières que vous enseignez actuellement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profile.coursEnseignes.map((cours, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 border rounded"
                      >
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1">{cours}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCours = profile.coursEnseignes.filter(
                                (_, i) => i !== index,
                              );
                              setProfile({
                                ...profile,
                                coursEnseignes: newCours,
                              });
                            }}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCours = prompt("Nom du cours:");
                          if (newCours) {
                            setProfile({
                              ...profile,
                              coursEnseignes: [
                                ...profile.coursEnseignes,
                                newCours,
                              ],
                            });
                          }
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Ajouter un cours
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diplomas and Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Formation et expérience</CardTitle>
                <CardDescription>
                  Vos diplômes et expérience professionnelle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Diplômes</Label>
                  <div className="space-y-2">
                    {profile.diplomes.map((diplome, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-3 border rounded"
                      >
                        <Award className="h-4 w-4 text-muted-foreground mt-1" />
                        <span className="flex-1">{diplome}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newDiplomes = profile.diplomes.filter(
                                (_, i) => i !== index,
                              );
                              setProfile({ ...profile, diplomes: newDiplomes });
                            }}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDiplome = prompt("Nouveau diplôme:");
                          if (newDiplome) {
                            setProfile({
                              ...profile,
                              diplomes: [...profile.diplomes, newDiplome],
                            });
                          }
                        }}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Ajouter un diplôme
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience professionnelle</Label>
                  <Textarea
                    id="experience"
                    value={profile.experience}
                    onChange={(e) =>
                      setProfile({ ...profile, experience: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Décrivez votre expérience professionnelle..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gestion de la sécurité et de l'accès à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Mot de passe</div>
                      <div className="text-sm text-muted-foreground">
                        Dernière modification: Il y a 2 mois
                      </div>
                    </div>
                  </div>
                  <Dialog
                    open={isPasswordDialogOpen}
                    onOpenChange={setIsPasswordDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">Modifier</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier le mot de passe</DialogTitle>
                        <DialogDescription>
                          Saisissez votre mot de passe actuel et choisissez un
                          nouveau mot de passe
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Mot de passe actuel
                          </Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">
                            Nouveau mot de passe
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirmer le nouveau mot de passe
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsPasswordDialogOpen(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleChangePassword}>
                          Modifier le mot de passe
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Sessions actives</div>
                      <div className="text-sm text-muted-foreground">
                        2 appareils connectés
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Gérer les sessions</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Exporter mes données</div>
                      <div className="text-sm text-muted-foreground">
                        Télécharger une copie de vos données
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Télécharger</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez ��tre notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Notifications par email</div>
                      <div className="text-sm text-muted-foreground">
                        Recevoir les notifications par email
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          emailNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Notifications SMS</div>
                      <div className="text-sm text-muted-foreground">
                        Recevoir les notifications par SMS
                      </div>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          smsNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">Types de notifications</h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Nouveaux messages</div>
                          <div className="text-sm text-muted-foreground">
                            Messages des étudiants et collègues
                          </div>
                        </div>
                        <Switch
                          checked={notifications.newMessages}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              newMessages: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Rappels de notes</div>
                          <div className="text-sm text-muted-foreground">
                            Rappels pour la saisie des notes
                          </div>
                        </div>
                        <Switch
                          checked={notifications.gradeReminders}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              gradeReminders: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            Changements d'emploi du temps
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Modifications dans votre planning
                          </div>
                        </div>
                        <Switch
                          checked={notifications.scheduleChanges}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              scheduleChanges: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            Mises à jour système
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Nouvelles fonctionnalités et maintenances
                          </div>
                        </div>
                        <Switch
                          checked={notifications.systemUpdates}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              systemUpdates: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleSaveNotifications}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder les préférences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
