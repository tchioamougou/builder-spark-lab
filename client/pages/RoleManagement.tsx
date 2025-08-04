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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  Users,
  Key,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Eye,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  nom: string;
  description: string;
  module: string;
  type: "read" | "write" | "delete" | "admin";
}

interface Role {
  id: string;
  nom: string;
  description: string;
  permissions: string[];
  statut: "actif" | "inactif";
  dateCreation: string;
  utilisateursCount: number;
  couleur: string;
}

interface UserRole {
  id: string;
  utilisateur: string;
  email: string;
  roles: string[];
  statut: "actif" | "suspendu";
  dateAssignation: string;
  derniereConnexion?: string;
}

const mockPermissions: Permission[] = [
  // Gestion des utilisateurs
  {
    id: "users_read",
    nom: "Voir utilisateurs",
    description: "Consulter la liste des utilisateurs",
    module: "Utilisateurs",
    type: "read",
  },
  {
    id: "users_write",
    nom: "Modifier utilisateurs",
    description: "Créer et modifier des utilisateurs",
    module: "Utilisateurs",
    type: "write",
  },
  {
    id: "users_delete",
    nom: "Supprimer utilisateurs",
    description: "Supprimer des utilisateurs",
    module: "Utilisateurs",
    type: "delete",
  },
  {
    id: "users_admin",
    nom: "Administration utilisateurs",
    description: "Gestion complète des utilisateurs",
    module: "Utilisateurs",
    type: "admin",
  },

  // Gestion des étudiants
  {
    id: "students_read",
    nom: "Voir étudiants",
    description: "Consulter les dossiers étudiants",
    module: "Étudiants",
    type: "read",
  },
  {
    id: "students_write",
    nom: "Modifier étudiants",
    description: "Modifier les informations étudiants",
    module: "Étudiants",
    type: "write",
  },
  {
    id: "students_grades",
    nom: "Gérer notes",
    description: "Saisir et modifier les notes",
    module: "Étudiants",
    type: "write",
  },
  {
    id: "students_financial",
    nom: "Gestion financière",
    description: "Accès aux informations financières",
    module: "Étudiants",
    type: "admin",
  },

  // Gestion des enseignants
  {
    id: "teachers_read",
    nom: "Voir enseignants",
    description: "Consulter la liste des enseignants",
    module: "Enseignants",
    type: "read",
  },
  {
    id: "teachers_write",
    nom: "Modifier enseignants",
    description: "Gérer les informations enseignants",
    module: "Enseignants",
    type: "write",
  },
  {
    id: "teachers_hire",
    nom: "Recrutement",
    description: "Gérer le recrutement d'enseignants",
    module: "Enseignants",
    type: "admin",
  },

  // Programmes académiques
  {
    id: "programs_read",
    nom: "Voir programmes",
    description: "Consulter les programmes académiques",
    module: "Programmes",
    type: "read",
  },
  {
    id: "programs_write",
    nom: "Modifier programmes",
    description: "Modifier les maquettes pédagogiques",
    module: "Programmes",
    type: "write",
  },
  {
    id: "programs_admin",
    nom: "Administration programmes",
    description: "Gestion complète des programmes",
    module: "Programmes",
    type: "admin",
  },

  // Administration système
  {
    id: "system_config",
    nom: "Configuration système",
    description: "Accès aux paramètres système",
    module: "Système",
    type: "admin",
  },
  {
    id: "system_logs",
    nom: "Logs système",
    description: "Consulter les logs d'audit",
    module: "Système",
    type: "read",
  },
  {
    id: "system_backup",
    nom: "Sauvegardes",
    description: "Gérer les sauvegardes",
    module: "Système",
    type: "admin",
  },
];

const mockRoles: Role[] = [
  {
    id: "admin",
    nom: "Administrateur",
    description: "Accès complet au système",
    permissions: mockPermissions.map((p) => p.id),
    statut: "actif",
    dateCreation: "2023-01-01",
    utilisateursCount: 2,
    couleur: "#ef4444",
  },
  {
    id: "scolarite",
    nom: "Service Scolarité",
    description: "Gestion des étudiants et programmes",
    permissions: [
      "students_read",
      "students_write",
      "students_grades",
      "programs_read",
      "programs_write",
    ],
    statut: "actif",
    dateCreation: "2023-01-01",
    utilisateursCount: 5,
    couleur: "#3b82f6",
  },
  {
    id: "rh",
    nom: "Ressources Humaines",
    description: "Gestion du personnel enseignant",
    permissions: [
      "users_read",
      "users_write",
      "teachers_read",
      "teachers_write",
      "teachers_hire",
    ],
    statut: "actif",
    dateCreation: "2023-01-01",
    utilisateursCount: 3,
    couleur: "#10b981",
  },
  {
    id: "enseignant",
    nom: "Enseignant",
    description: "Accès aux fonctionnalités d'enseignement",
    permissions: ["students_read", "students_grades", "programs_read"],
    statut: "actif",
    dateCreation: "2023-01-01",
    utilisateursCount: 25,
    couleur: "#f59e0b",
  },
  {
    id: "etudiant",
    nom: "Étudiant",
    description: "Accès étudiant au portail",
    permissions: [],
    statut: "actif",
    dateCreation: "2023-01-01",
    utilisateursCount: 450,
    couleur: "#8b5cf6",
  },
];

const mockUserRoles: UserRole[] = [
  {
    id: "1",
    utilisateur: "Administrateur Système",
    email: "admin@univ.fr",
    roles: ["admin"],
    statut: "actif",
    dateAssignation: "2023-01-01",
    derniereConnexion: "2024-01-20 14:30",
  },
  {
    id: "2",
    utilisateur: "Pierre Dubois",
    email: "pierre.dubois@scolarite.univ.fr",
    roles: ["scolarite"],
    statut: "actif",
    dateAssignation: "2023-03-15",
    derniereConnexion: "2024-01-20 08:30",
  },
  {
    id: "3",
    utilisateur: "Sophie Laurent",
    email: "sophie.laurent@rh.univ.fr",
    roles: ["rh"],
    statut: "actif",
    dateAssignation: "2023-02-01",
    derniereConnexion: "2024-01-19 16:20",
  },
];

const getPermissionTypeColor = (type: string) => {
  switch (type) {
    case "read":
      return "bg-blue-100 text-blue-800";
    case "write":
      return "bg-green-100 text-green-800";
    case "delete":
      return "bg-red-100 text-red-800";
    case "admin":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPermissionTypeIcon = (type: string) => {
  switch (type) {
    case "read":
      return <Eye className="h-3 w-3" />;
    case "write":
      return <Edit className="h-3 w-3" />;
    case "delete":
      return <Trash2 className="h-3 w-3" />;
    case "admin":
      return <Shield className="h-3 w-3" />;
    default:
      return <Key className="h-3 w-3" />;
  }
};

export default function RoleManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [userRoles, setUserRoles] = useState<UserRole[]>(mockUserRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const handleCreateRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      dateCreation: new Date().toISOString().split("T")[0],
      statut: "actif",
      utilisateursCount: 0,
      couleur: "#6b7280",
      permissions: [],
      ...formData,
    } as Role;

    setRoles([...roles, newRole]);
    toast({
      title: "Rôle créé",
      description: "Le nouveau rôle a été créé avec succès.",
    });
    setIsCreateRoleOpen(false);
    setFormData({});
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles((roles) => roles.filter((r) => r.id !== roleId));
    toast({
      title: "Rôle supprimé",
      description: "Le rôle a été supprimé définitivement.",
      variant: "destructive",
    });
  };

  const handleToggleRoleStatus = (roleId: string) => {
    setRoles((roles) =>
      roles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              statut:
                role.statut === "actif"
                  ? ("inactif" as const)
                  : ("actif" as const),
            }
          : role,
      ),
    );
    toast({
      title: "Statut modifié",
      description: "Le statut du rôle a été modifié.",
    });
  };

  const handleTogglePermission = (roleId: string, permissionId: string) => {
    setRoles((roles) =>
      roles.map((role) => {
        if (role.id === roleId) {
          const permissions = role.permissions.includes(permissionId)
            ? role.permissions.filter((p) => p !== permissionId)
            : [...role.permissions, permissionId];
          return { ...role, permissions };
        }
        return role;
      }),
    );
  };

  const modules = Array.from(new Set(mockPermissions.map((p) => p.module)));

  const filteredPermissions = mockPermissions.filter((permission) => {
    const matchesSearch =
      permission.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModule =
      filterModule === "all" || permission.module === filterModule;

    return matchesSearch && matchesModule;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Gestion des Rôles et Permissions
            </h2>
            <p className="text-muted-foreground">
              Configuration des accès et autorisations du système
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter configuration
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer rôles
            </Button>
            <Button onClick={() => setIsCreateRoleOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau rôle
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rôles actifs
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.filter((r) => r.statut === "actif").length}
              </div>
              <p className="text-xs text-muted-foreground">Rôles configurés</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permissions</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPermissions.length}</div>
              <p className="text-xs text-muted-foreground">
                Permissions disponibles
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs assignés
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.reduce((total, r) => total + r.utilisateursCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Avec rôles définis
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Modules couverts
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modules.length}</div>
              <p className="text-xs text-muted-foreground">Zones sécurisées</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="roles" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">Rôles ({roles.length})</TabsTrigger>
            <TabsTrigger value="permissions">
              Permissions ({mockPermissions.length})
            </TabsTrigger>
            <TabsTrigger value="assignations">
              Assignations ({userRoles.length})
            </TabsTrigger>
            <TabsTrigger value="audit">Audit des accès</TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rôles système</CardTitle>
                <CardDescription>
                  Configuration des rôles et de leurs permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Utilisateurs</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: role.couleur }}
                            />
                            <div>
                              <div className="font-medium">{role.nom}</div>
                              <div className="text-sm text-muted-foreground">
                                {role.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permId) => {
                              const perm = mockPermissions.find(
                                (p) => p.id === permId,
                              );
                              return perm ? (
                                <Badge
                                  key={permId}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {perm.nom}
                                </Badge>
                              ) : null;
                            })}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 3} autres
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{role.utilisateursCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              role.statut === "actif"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {role.statut === "actif" ? "Actif" : "Inactif"}
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
                                  setSelectedRole(role);
                                  setFormData(role);
                                  setIsRoleDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRole(role);
                                  setIsPermissionDialogOpen(true);
                                }}
                              >
                                <Key className="mr-2 h-4 w-4" />
                                Gérer permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleRoleStatus(role.id)}
                              >
                                {role.statut === "actif" ? (
                                  <>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Désactiver
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Activer
                                  </>
                                )}
                              </DropdownMenuItem>
                              {role.id !== "admin" && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setRoleToDelete(role.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
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

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permissions système</CardTitle>
                <CardDescription>
                  Catalogue des permissions disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une permission..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select
                      value={filterModule}
                      onValueChange={setFilterModule}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par module" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les modules</SelectItem>
                        {modules.map((module) => (
                          <SelectItem key={module} value={module}>
                            {module}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {modules.map((module) => {
                    const modulePermissions = filteredPermissions.filter(
                      (p) => p.module === module,
                    );
                    if (modulePermissions.length === 0) return null;

                    return (
                      <div key={module} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center space-x-2">
                          <Settings className="h-5 w-5" />
                          <span>{module}</span>
                          <Badge variant="outline">
                            {modulePermissions.length}
                          </Badge>
                        </h3>
                        <div className="grid gap-2">
                          {modulePermissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-1 rounded ${getPermissionTypeColor(permission.type)}`}
                                >
                                  {getPermissionTypeIcon(permission.type)}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {permission.nom}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </div>
                                </div>
                              </div>
                              <Badge
                                className={getPermissionTypeColor(
                                  permission.type,
                                )}
                              >
                                {permission.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignations Tab */}
          <TabsContent value="assignations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignations de rôles</CardTitle>
                <CardDescription>
                  Utilisateurs et leurs rôles assignés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Rôles assignés</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userRoles.map((userRole) => (
                      <TableRow key={userRole.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {userRole.utilisateur}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {userRole.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {userRole.roles.map((roleId) => {
                              const role = roles.find((r) => r.id === roleId);
                              return role ? (
                                <Badge
                                  key={roleId}
                                  variant="outline"
                                  className="text-xs"
                                  style={{
                                    borderColor: role.couleur,
                                    color: role.couleur,
                                  }}
                                >
                                  {role.nom}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              userRole.statut === "actif"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {userRole.statut === "actif" ? "Actif" : "Suspendu"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {userRole.derniereConnexion ? (
                            <div className="text-sm">
                              {new Date(
                                userRole.derniereConnexion,
                              ).toLocaleString("fr-FR")}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Jamais
                            </span>
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier rôles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {userRole.statut === "actif" ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Suspendre accès
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Réactiver accès
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

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit des accès</CardTitle>
                <CardDescription>
                  Historique des connexions et actions sensibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Fonctionnalité d'audit en cours de développement</p>
                  <p className="text-sm">
                    Logs de sécurité et traçabilité des actions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Role Dialog */}
        <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau rôle</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du rôle</Label>
                <Input
                  id="nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="couleur">Couleur</Label>
                <Input
                  id="couleur"
                  type="color"
                  value={formData.couleur || "#6b7280"}
                  onChange={(e) =>
                    setFormData({ ...formData, couleur: e.target.value })
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
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateRoleOpen(false);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleCreateRole}>Créer le rôle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Role Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier le rôle</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nom">Nom du rôle</Label>
                <Input
                  id="edit-nom"
                  value={formData.nom || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-couleur">Couleur</Label>
                <Input
                  id="edit-couleur"
                  type="color"
                  value={formData.couleur || "#6b7280"}
                  onChange={(e) =>
                    setFormData({ ...formData, couleur: e.target.value })
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
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRoleDialogOpen(false);
                  setSelectedRole(null);
                  setFormData({});
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  if (selectedRole) {
                    setRoles((roles) =>
                      roles.map((r) =>
                        r.id === selectedRole.id ? { ...r, ...formData } : r,
                      ),
                    );
                    toast({
                      title: "Rôle modifié",
                      description:
                        "Les informations ont été mises à jour avec succès.",
                    });
                    setIsRoleDialogOpen(false);
                    setSelectedRole(null);
                    setFormData({});
                  }
                }}
              >
                Modifier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Permissions Management Dialog */}
        <Dialog
          open={isPermissionDialogOpen}
          onOpenChange={setIsPermissionDialogOpen}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                Gérer les permissions - {selectedRole?.nom}
              </DialogTitle>
              <DialogDescription>
                Cochez les permissions à accorder à ce rôle
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {modules.map((module) => {
                  const modulePermissions = mockPermissions.filter(
                    (p) => p.module === module,
                  );
                  return (
                    <div key={module} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{module}</h3>
                      <div className="space-y-2">
                        {modulePermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              checked={
                                selectedRole?.permissions.includes(
                                  permission.id,
                                ) || false
                              }
                              onCheckedChange={() => {
                                if (selectedRole) {
                                  handleTogglePermission(
                                    selectedRole.id,
                                    permission.id,
                                  );
                                }
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {permission.nom}
                                </span>
                                <Badge
                                  className={getPermissionTypeColor(
                                    permission.type,
                                  )}
                                >
                                  {permission.type}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {permission.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsPermissionDialogOpen(false);
                  setSelectedRole(null);
                }}
              >
                Fermer
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Permissions mises à jour",
                    description: "Les permissions du rôle ont été modifiées.",
                  });
                  setIsPermissionDialogOpen(false);
                  setSelectedRole(null);
                }}
              >
                Enregistrer
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
                Cette action supprimera définitivement le rôle. Cette action ne
                peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setRoleToDelete(null);
                }}
              >
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (roleToDelete) {
                    handleDeleteRole(roleToDelete);
                  }
                  setDeleteDialogOpen(false);
                  setRoleToDelete(null);
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
