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
import { Textarea } from "@/components/ui/textarea";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BookOpen, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  GraduationCap,
  Calendar,
  Clock,
  Users,
  BookMarked,
  Layers,
  FileText
} from "lucide-react";

const filieres = [
  {
    id: 1,
    nom: "Pharmacie",
    codeDiplome: "PHARM2024",
    diplome: "Diplôme d'État de Docteur en Pharmacie",
    duree: "6 ans",
    maquettes: 6,
    etudiants: 450,
    statut: "Actif"
  },
  {
    id: 2,
    nom: "Médecine",
    codeDiplome: "MED2024",
    diplome: "Diplôme d'État de Docteur en Médecine",
    duree: "6 ans",
    maquettes: 6,
    etudiants: 720,
    statut: "Actif"
  },
  {
    id: 3,
    nom: "Kinésithérapie",
    codeDiplome: "KINE2024",
    diplome: "Diplôme d'État de Masseur-Kinésithérapeute",
    duree: "4 ans",
    maquettes: 4,
    etudiants: 180,
    statut: "Actif"
  }
];

const maquettes = [
  {
    id: 1,
    filiere: "Pharmacie",
    niveau: "Année 1",
    nom: "Pharmacie - Première Année",
    sequences: 2,
    modules: 8,
    ues: 24,
    coordonnateur: "Dr. Martin",
    statut: "Validé"
  },
  {
    id: 2,
    filiere: "Pharmacie",
    niveau: "Année 2",
    nom: "Pharmacie - Deuxième Année",
    sequences: 2,
    modules: 10,
    ues: 30,
    coordonnateur: "Dr. Dubois",
    statut: "En révision"
  },
  {
    id: 3,
    filiere: "Médecine",
    niveau: "Année 1",
    nom: "Médecine - PACES",
    sequences: 2,
    modules: 6,
    ues: 18,
    coordonnateur: "Dr. Laurent",
    statut: "Validé"
  }
];

const domaines = [
  {
    id: 1,
    nom: "Sciences de base",
    description: "Chimie, physique, mathématiques",
    modules: 12,
    couleur: "bg-blue-100 text-blue-800"
  },
  {
    id: 2,
    nom: "Sciences humaines",
    description: "Psychologie, sociologie, communication",
    modules: 6,
    couleur: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    nom: "Sciences biomédicales",
    description: "Anatomie, physiologie, pathologie",
    modules: 15,
    couleur: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    nom: "Sciences pharmaceutiques",
    description: "Pharmacologie, galénique, toxicologie",
    modules: 18,
    couleur: "bg-orange-100 text-orange-800"
  }
];

const programStructure = {
  "Pharmacie": {
    "Année 1": {
      "Séquence 1": {
        "Sciences de base": [
          { nom: "Chimie générale", ues: ["Chimie organique", "Chimie minérale", "TP Chimie"] },
          { nom: "Mathématiques", ues: ["Mathématiques appliquées", "Statistiques"] }
        ],
        "Sciences biomédicales": [
          { nom: "Anatomie", ues: ["Anatomie générale", "TP Anatomie"] }
        ]
      },
      "Séquence 2": {
        "Sciences de base": [
          { nom: "Physique", ues: ["Physique générale", "TP Physique"] }
        ],
        "Sciences biomédicales": [
          { nom: "Physiologie", ues: ["Physiologie générale", "TP Physiologie"] }
        ]
      }
    }
  }
};

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("filieres");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Actif": case "Validé": return "bg-green-100 text-green-800";
      case "En révision": return "bg-yellow-100 text-yellow-800";
      case "Inactif": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Programmes académiques</h2>
            <p className="text-muted-foreground">
              Gérez la hiérarchie pédagogique : Filières → Maquettes → Séquences → Domaines → Modules → UE
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau programme
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau programme</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle filière avec ses informations de base.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nom" className="text-right">Nom de la filière</Label>
                    <Input id="nom" className="col-span-3" placeholder="ex: Pharmacie" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="diplome" className="text-right">Diplôme</Label>
                    <Input id="diplome" className="col-span-3" placeholder="ex: Diplôme d'État..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Code diplôme</Label>
                    <Input id="code" className="col-span-3" placeholder="ex: PHARM2024" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duree" className="text-right">Durée</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner la durée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 ans</SelectItem>
                        <SelectItem value="4">4 ans</SelectItem>
                        <SelectItem value="5">5 ans</SelectItem>
                        <SelectItem value="6">6 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Créer la filière</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="filieres">Filières</TabsTrigger>
            <TabsTrigger value="maquettes">Maquettes</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="domaines">Domaines</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Filières Tab */}
          <TabsContent value="filieres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Filières ({filieres.length})</span>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher une filière..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filière</TableHead>
                      <TableHead>Code diplôme</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Maquettes</TableHead>
                      <TableHead>Étudiants</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filieres.map((filiere) => (
                      <TableRow key={filiere.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{filiere.nom}</div>
                            <div className="text-sm text-muted-foreground">{filiere.diplome}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{filiere.codeDiplome}</TableCell>
                        <TableCell>{filiere.duree}</TableCell>
                        <TableCell>{filiere.maquettes}</TableCell>
                        <TableCell>{filiere.etudiants}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatutColor(filiere.statut)}>
                            {filiere.statut}
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
                                <Layers className="mr-2 h-4 w-4" />
                                Gérer les maquettes
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

          {/* Maquettes Tab */}
          <TabsContent value="maquettes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maquettes de formation</CardTitle>
                <CardDescription>
                  Gestion des maquettes par filière et niveau d'étude
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Maquette</TableHead>
                      <TableHead>Filière</TableHead>
                      <TableHead>Structure</TableHead>
                      <TableHead>Coordonnateur</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maquettes.map((maquette) => (
                      <TableRow key={maquette.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{maquette.nom}</div>
                            <div className="text-sm text-muted-foreground">{maquette.niveau}</div>
                          </div>
                        </TableCell>
                        <TableCell>{maquette.filiere}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{maquette.sequences} séquences</div>
                            <div>{maquette.modules} modules</div>
                            <div>{maquette.ues} UE</div>
                          </div>
                        </TableCell>
                        <TableCell>{maquette.coordonnateur}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatutColor(maquette.statut)}>
                            {maquette.statut}
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
                                <FileText className="mr-2 h-4 w-4" />
                                Voir la structure
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Assigner coordonnateur
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

          {/* Structure Tab */}
          <TabsContent value="structure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Structure hiérarchique</CardTitle>
                <CardDescription>
                  Visualisation de la hiérarchie Filière → Maquette → Séquence → Domaine → Module → UE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(programStructure).map(([filiere, niveaux]) => (
                    <AccordionItem key={filiere} value={filiere}>
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-5 w-5" />
                          <span>{filiere}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 space-y-4">
                          {Object.entries(niveaux).map(([niveau, sequences]) => (
                            <div key={niveau}>
                              <h4 className="font-medium text-primary mb-2 flex items-center">
                                <BookMarked className="h-4 w-4 mr-2" />
                                {niveau}
                              </h4>
                              <div className="pl-4 space-y-3">
                                {Object.entries(sequences).map(([sequence, domaines]) => (
                                  <div key={sequence}>
                                    <h5 className="font-medium text-sm mb-2 flex items-center">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      {sequence}
                                    </h5>
                                    <div className="pl-4 space-y-2">
                                      {Object.entries(domaines).map(([domaine, modules]) => (
                                        <div key={domaine}>
                                          <h6 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                                            <Layers className="h-3 w-3 mr-2" />
                                            {domaine}
                                          </h6>
                                          <div className="pl-4 space-y-1">
                                            {modules.map((module, idx) => (
                                              <div key={idx} className="text-sm">
                                                <div className="font-medium flex items-center">
                                                  <BookOpen className="h-3 w-3 mr-2" />
                                                  {module.nom}
                                                </div>
                                                <div className="pl-5 text-xs text-muted-foreground">
                                                  UE: {module.ues.join(", ")}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domaines Tab */}
          <TabsContent value="domaines" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {domaines.map((domaine) => (
                <Card key={domaine.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{domaine.nom}</span>
                      <Badge variant="secondary" className={domaine.couleur}>
                        {domaine.modules} modules
                      </Badge>
                    </CardTitle>
                    <CardDescription>{domaine.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Gérer les modules
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistiques Tab */}
          <TabsContent value="statistiques" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Filières</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Toutes actives</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maquettes</CardTitle>
                  <BookMarked className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">Tous niveaux confondus</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Modules</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">51</div>
                  <p className="text-xs text-muted-foreground">Toutes filières</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unités d'Enseignement</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">153</div>
                  <p className="text-xs text-muted-foreground">Total UE système</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par domaine</CardTitle>
                <CardDescription>
                  Nombre de modules par domaine d'enseignement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {domaines.map((domaine) => (
                    <div key={domaine.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <span className="font-medium">{domaine.nom}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{domaine.modules} modules</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(domaine.modules / 51) * 100}%` }}
                          ></div>
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
    </Layout>
  );
}
