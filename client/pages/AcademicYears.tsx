import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  TableRow 
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  Settings
} from "lucide-react";

const academicYears = [
  {
    id: 1,
    annee: "2023-2024",
    dateDebut: "2023-09-01",
    dateFin: "2024-06-30",
    statut: "En cours",
    sequences: 6,
    programmes: 3
  },
  {
    id: 2,
    annee: "2022-2023",
    dateDebut: "2022-09-01",
    dateFin: "2023-06-30",
    statut: "Terminé",
    sequences: 6,
    programmes: 3
  },
  {
    id: 3,
    annee: "2024-2025",
    dateDebut: "2024-09-01",
    dateFin: "2025-06-30",
    statut: "Planifié",
    sequences: 0,
    programmes: 0
  }
];

const sequences = [
  {
    id: 1,
    annee: "2023-2024",
    filiere: "Pharmacie",
    niveau: "Année 1",
    sequence: "Séquence 1",
    dateDebut: "2023-09-01",
    dateFin: "2024-01-15",
    statut: "Terminé",
    notesSaisies: true
  },
  {
    id: 2,
    annee: "2023-2024",
    filiere: "Pharmacie",
    niveau: "Année 1",
    sequence: "Séquence 2",
    dateDebut: "2024-01-16",
    dateFin: "2024-06-30",
    statut: "En cours",
    notesSaisies: false
  },
  {
    id: 3,
    annee: "2023-2024",
    filiere: "Médecine",
    niveau: "Année 1",
    sequence: "Séquence 1",
    dateDebut: "2023-09-01",
    dateFin: "2024-01-15",
    statut: "Terminé",
    notesSaisies: true
  },
  {
    id: 4,
    annee: "2023-2024",
    filiere: "Médecine",
    niveau: "Année 1",
    sequence: "Séquence 2",
    dateDebut: "2024-01-16",
    dateFin: "2024-06-30",
    statut: "En cours",
    notesSaisies: false
  }
];

const calendrierEvents = [
  {
    id: 1,
    titre: "Début année académique 2023-2024",
    date: "2023-09-01",
    type: "Année académique",
    filiere: "Toutes"
  },
  {
    id: 2,
    titre: "Fin Séquence 1 - Pharmacie",
    date: "2024-01-15",
    type: "Séquence",
    filiere: "Pharmacie"
  },
  {
    id: 3,
    titre: "Début Séquence 2 - Toutes filières",
    date: "2024-01-16",
    type: "Séquence",
    filiere: "Toutes"
  },
  {
    id: 4,
    titre: "Examens de fin d'année",
    date: "2024-06-15",
    type: "Examens",
    filiere: "Toutes"
  }
];

export default function AcademicYearsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateYearDialogOpen, setIsCreateYearDialogOpen] = useState(false);
  const [isCreateSequenceDialogOpen, setIsCreateSequenceDialogOpen] = useState(false);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "En cours": return "bg-green-100 text-green-800";
      case "Terminé": return "bg-gray-100 text-gray-800";
      case "Planifié": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Année académique": return "bg-purple-100 text-purple-800";
      case "Séquence": return "bg-blue-100 text-blue-800";
      case "Examens": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Années académiques</h2>
            <p className="text-muted-foreground">
              Gérez les années académiques et calendriers de séquences
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isCreateYearDialogOpen} onOpenChange={setIsCreateYearDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle année
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle année académique</DialogTitle>
                  <DialogDescription>
                    Définissez les dates de début et fin de l'année académique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="annee" className="text-right">Année</Label>
                    <Input id="annee" className="col-span-3" placeholder="2024-2025" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="debut" className="text-right">Date début</Label>
                    <Input id="debut" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fin" className="text-right">Date fin</Label>
                    <Input id="fin" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Créer l'année</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreateSequenceDialogOpen} onOpenChange={setIsCreateSequenceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle séquence
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Créer un calendrier de séquence</DialogTitle>
                  <DialogDescription>
                    Définissez les dates de début et fin pour une séquence spécifique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="anneeSeq" className="text-right">Année académique</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner l'année" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="filiereSeq" className="text-right">Filière</Label>
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
                    <Label htmlFor="niveauSeq" className="text-right">Niveau</Label>
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sequenceNum" className="text-right">Séquence</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner la séquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequence1">Séquence 1</SelectItem>
                        <SelectItem value="sequence2">Séquence 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="debutSeq" className="text-right">Date début</Label>
                    <Input id="debutSeq" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="finSeq" className="text-right">Date fin</Label>
                    <Input id="finSeq" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Créer la séquence</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="years" className="space-y-6">
          <TabsList>
            <TabsTrigger value="years">Années académiques</TabsTrigger>
            <TabsTrigger value="sequences">Calendrier séquences</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier global</TabsTrigger>
          </TabsList>

          {/* Academic Years Tab */}
          <TabsContent value="years" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Années académiques ({academicYears.length})</CardTitle>
                <CardDescription>
                  Gestion des périodes académiques globales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Année académique</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Séquences définies</TableHead>
                      <TableHead>Programmes</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicYears.map((year) => (
                      <TableRow key={year.id}>
                        <TableCell className="font-medium">{year.annee}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Du {new Date(year.dateDebut).toLocaleDateString('fr-FR')}</div>
                            <div>Au {new Date(year.dateFin).toLocaleDateString('fr-FR')}</div>
                          </div>
                        </TableCell>
                        <TableCell>{year.sequences} séquences</TableCell>
                        <TableCell>{year.programmes} programmes</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatutColor(year.statut)}>
                            {year.statut}
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
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Gérer les séquences
                              </DropdownMenuItem>
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

          {/* Sequences Tab */}
          <TabsContent value="sequences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Calendriers de séquences</span>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                  </div>
                </CardTitle>
                <CardDescription>
                  Dates de début et fin de chaque séquence par filière et niveau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Séquence</TableHead>
                      <TableHead>Programme</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sequences.map((seq) => (
                      <TableRow key={seq.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{seq.sequence}</div>
                            <div className="text-sm text-muted-foreground">{seq.annee}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{seq.filiere}</div>
                            <div className="text-sm text-muted-foreground">{seq.niveau}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Du {new Date(seq.dateDebut).toLocaleDateString('fr-FR')}</div>
                            <div>Au {new Date(seq.dateFin).toLocaleDateString('fr-FR')}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatutColor(seq.statut)}>
                            {seq.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {seq.notesSaisies ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">Saisies</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm text-yellow-600">En attente</span>
                              </>
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
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier dates
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Bloquer saisie notes
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

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier académique global</CardTitle>
                <CardDescription>
                  Vue d'ensemble des événements académiques importants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendrierEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{event.titre}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline">
                          {event.filiere}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Séquences en cours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">
                    Toutes filières confondues
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Séquences terminées</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    Notes saisies et validées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Prochains 30 jours
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
