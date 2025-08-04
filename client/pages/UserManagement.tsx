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
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  role: "admin" | "enseignant" | "etudiant" | "rh" | "scolarite";
  statut: "actif" | "inactif" | "suspendu" | "archive";
  dateCreation: string;
  derniereConnexion?: string;
  permissions: string[];
  filiere?: string;
  niveau?: string;
  numeroEtudiant?: string;
  specialite?: string;
  departement?: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    nom: "Système",
    prenom: "Administrateur",
    email: "admin@univ.fr",
    telephone: "+33123456789",
    adresse: "Campus Universitaire",
    role: "admin",
    statut: "actif",
    dateCreation: "2023-01-15",
    derniereConnexion: "2024-01-20 14:30",
    permissions: ["*"],
  },
  {
    id: "2",
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@etud.univ.fr",
    telephone: "+33123456780",
    role: "etudiant",
    statut: "actif",
    dateCreation: "2023-09-01",
    derniereConnexion: "2024-01-20 10:15",
    filiere: "Pharmacie",
    niveau: "Année 1",
    numeroEtudiant: "ETU2024001",
    permissions: ["view_own_profile", "view_own_notes", "submit_documents"],
  },
  {
    id: "3",
    nom: "Martin",
    prenom: "Jean",
    email: "jean.martin@univ.fr",
    telephone: "+33123456781",
    role: "enseignant",
    statut: "actif",
    dateCreation: "2022-08-15",
    derniereConnexion: "2024-01-20 09:45",
    specialite: "Anatomie",
    departement: "Sciences Médicales",
    permissions: ["view_students", "manage_notes", "view_teaching_schedule"],
  },
  {
    id: "4",
    nom: "Laurent",
    prenom: "Sophie",
    email: "sophie.laurent@rh.univ.fr",
    telephone: "+33123456782",
    role: "rh",
    statut: "actif",
    dateCreation: "2023-02-01",
    derniereConnexion: "2024-01-19 16:20",
    departement: "Ressources Humaines",
    permissions: ["manage_teachers", "manage_job_offers", "view_hr_reports"],
  },
  {
    id: "5",
    nom: "Dubois",
    prenom: "Pierre",
    email: "pierre.dubois@scolarite.univ.fr",
    telephone: "+33123456783",
    role: "scolarite",
    statut: "actif",
    dateCreation: "2023-03-15",
    derniereConnexion: "2024-01-20 08:30",
    departement: "Scolarité",
    permissions: [
      "manage_students",
      "manage_enrollments",
      "manage_academic_programs",
    ],
  },
  {
    id: "6",
    nom: "Bernard",
    prenom: "Claire",
    email: "claire.bernard@etud.univ.fr",
    role: "etudiant",
    statut: "suspendu",
    dateCreation: "2023-09-01",
    filiere: "Médecine",
    niveau: "Année 2",
    numeroEtudiant: "ETU2024002",
    permissions: ["view_own_profile"],
  },
];

const roles = [
  { value: "admin", label: "Administrateur" },
  { value: "enseignant", label: "Enseignant" },
  { value: "etudiant", label: "Étudiant" },
  { value: "rh", label: "Ressources Humaines" },
  { value: "scolarite", label: "Scolarité" },
];

const statuts = [
  { value: "actif", label: "Actif", color: "bg-green-100 text-green-800" },
  { value: "inactif", label: "Inactif", color: "bg-gray-100 text-gray-800" },
  { value: "suspendu", label: "Suspendu", color: "bg-red-100 text-red-800" },
  {
    value: "archive",
    label: "Archivé",
    color: "bg-yellow-100 text-yellow-800",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statutFilter, setStatutFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.numeroEtudiant &&
        user.numeroEtudiant.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatut =
      statutFilter === "all" || user.statut === statutFilter;

    return matchesSearch && matchesRole && matchesStatut;
  });

  const getStatutBadge = (statut: string) => {
    const statutInfo = statuts.find((s) => s.value === statut);
    return statutInfo
      ? statutInfo
      : { label: statut, color: "bg-gray-100 text-gray-800" };
  };

  const getRoleLabel = (role: string) => {
    const roleInfo = roles.find((r) => r.value === role);
    return roleInfo ? roleInfo.label : role;
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditDialogOpen(true);
  };

  const handleCreateUser = () => {
    setFormData({
      role: "etudiant",
      statut: "actif",
      permissions: [],
    });
    setIsCreateDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...selectedUser, ...formData } : u,
        ),
      );
      toast({
        title: "Utilisateur modifié",
        description: "Les informations ont été mises à jour avec succès.",
      });
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        dateCreation: new Date().toISOString().split("T")[0],
        permissions: [],
        ...formData,
      } as User;
      setUsers([...users, newUser]);
      toast({
        title: "Utilisateur créé",
        description: "Le nouvel utilisateur a été créé avec succès.",
      });
    }
    setIsEditDialogOpen(false);
    setIsCreateDialogOpen(false);
    setSelectedUser(null);
    setFormData({});
  };

  const handleToggleStatus = (userId: string, newStatus: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, statut: newStatus as any } : u,
      ),
    );
    toast({
      title: "Statut modifié",
      description: `L'utilisateur a été ${newStatus}.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé définitivement.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Gestion des Utilisateurs
            </h2>
            <p className="text-muted-foreground">
              Gérer tous les utilisateurs du système
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button onClick={handleCreateUser}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel utilisateur
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Actifs
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.statut === "actif").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Suspendus
              </CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter((u) => u.statut === "suspendu").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nouveaux ce mois
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  users.filter((u) => {
                    const date = new Date(u.dateCreation);
                    const now = new Date();
                    return (
                      date.getMonth() === now.getMonth() &&
                      date.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, prénom, email ou numéro étudiant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statutFilter} onValueChange={setStatutFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statuts.map((statut) => (
                    <SelectItem key={statut.value} value={statut.value}>
                      {statut.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Liste des Utilisateurs ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {user.prenom} {user.nom}
                        </div>
                        {user.numeroEtudiant && (
                          <div className="text-sm text-muted-foreground">
                            {user.numeroEtudiant}
                          </div>
                        )}
                        {user.specialite && (
                          <div className="text-sm text-muted-foreground">
                            {user.specialite}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatutBadge(user.statut).color}>
                        {getStatutBadge(user.statut).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.derniereConnexion ? (
                        <div className="text-sm">
                          {new Date(user.derniereConnexion).toLocaleString(
                            "fr-FR",
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Jamais</span>
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.statut === "actif" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(user.id, "suspendu")
                              }
                            >
                              <Lock className="mr-2 h-4 w-4" />
                              Suspendre
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(user.id, "actif")
                              }
                            >
                              <Unlock className="mr-2 h-4 w-4" />
                              Activer
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(user.id, "archive")
                            }
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Archiver
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setUserToDelete(user.id);
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

        {/* View User Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de l'utilisateur</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Nom complet
                    </Label>
                    <p className="text-sm">
                      {selectedUser.prenom} {selectedUser.nom}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email
                    </Label>
                    <p className="text-sm">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Téléphone
                    </Label>
                    <p className="text-sm">
                      {selectedUser.telephone || "Non renseigné"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Rôle
                    </Label>
                    <p className="text-sm">{getRoleLabel(selectedUser.role)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Statut
                    </Label>
                    <Badge
                      className={getStatutBadge(selectedUser.statut).color}
                    >
                      {getStatutBadge(selectedUser.statut).label}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Date de création
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUser.dateCreation).toLocaleDateString(
                        "fr-FR",
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Dernière connexion
                    </Label>
                    <p className="text-sm">
                      {selectedUser.derniereConnexion
                        ? new Date(
                            selectedUser.derniereConnexion,
                          ).toLocaleString("fr-FR")
                        : "Jamais"}
                    </p>
                  </div>
                  {selectedUser.numeroEtudiant && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Numéro étudiant
                      </Label>
                      <p className="text-sm">{selectedUser.numeroEtudiant}</p>
                    </div>
                  )}
                  {selectedUser.filiere && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Filière
                      </Label>
                      <p className="text-sm">{selectedUser.filiere}</p>
                    </div>
                  )}
                  {selectedUser.niveau && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Niveau
                      </Label>
                      <p className="text-sm">{selectedUser.niveau}</p>
                    </div>
                  )}
                  {selectedUser.specialite && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Spécialité
                      </Label>
                      <p className="text-sm">{selectedUser.specialite}</p>
                    </div>
                  )}
                  {selectedUser.departement && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Département
                      </Label>
                      <p className="text-sm">{selectedUser.departement}</p>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Permissions
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedUser.permissions.map((permission, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {permission === "*" ? "Toutes permissions" : permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit/Create User Dialog */}
        <Dialog
          open={isEditDialogOpen || isCreateDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsEditDialogOpen(false);
              setIsCreateDialogOpen(false);
              setSelectedUser(null);
              setFormData({});
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedUser
                  ? "Modifier l'utilisateur"
                  : "Créer un utilisateur"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={formData.telephone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value) =>
                    setFormData({ ...formData, statut: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuts.map((statut) => (
                      <SelectItem key={statut.value} value={statut.value}>
                        {statut.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Textarea
                  id="adresse"
                  value={formData.adresse || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, adresse: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setIsCreateDialogOpen(false);
                  setSelectedUser(null);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleSaveUser}>
                {selectedUser ? "Modifier" : "Créer"}
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
                Cette action supprimera définitivement l'utilisateur. Cette
                action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setUserToDelete(null);
                }}
              >
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (userToDelete) {
                    handleDeleteUser(userToDelete);
                  }
                  setDeleteDialogOpen(false);
                  setUserToDelete(null);
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
