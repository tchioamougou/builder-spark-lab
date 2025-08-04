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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share,
  BookOpen,
  Users,
  Calendar,
  FolderOpen,
  File,
  Image,
  Video,
  Archive,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc" | "ppt" | "image" | "video" | "other";
  size: string;
  category: "cours" | "tp" | "td" | "examen" | "ressource";
  course: string;
  uploadDate: string;
  lastModified: string;
  visibility: "public" | "students" | "private";
  downloads: number;
  description?: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Cours 1 - Introduction à l'anatomie.pdf",
    type: "pdf",
    size: "2.5 MB",
    category: "cours",
    course: "Anatomie générale",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-15",
    visibility: "students",
    downloads: 42,
    description: "Introduction générale aux concepts anatomiques de base"
  },
  {
    id: "2",
    name: "TP1_Dissection_Protocole.docx",
    type: "doc",
    size: "1.8 MB",
    category: "tp",
    course: "Anatomie générale",
    uploadDate: "2024-01-18",
    lastModified: "2024-01-20",
    visibility: "students",
    downloads: 38,
    description: "Protocole détaillé pour la première séance de dissection"
  },
  {
    id: "3",
    name: "Examen_Partiel_Sujet_2023.pdf",
    type: "pdf",
    size: "890 KB",
    category: "examen",
    course: "Physiologie spécialisée",
    uploadDate: "2024-01-10",
    lastModified: "2024-01-10",
    visibility: "private",
    downloads: 0,
    description: "Sujet d'examen partiel de l'année précédente"
  },
  {
    id: "4",
    name: "Schema_Coeur_Anatomie.png",
    type: "image",
    size: "3.2 MB",
    category: "ressource",
    course: "Anatomie générale",
    uploadDate: "2024-01-12",
    lastModified: "2024-01-12",
    visibility: "public",
    downloads: 65,
    description: "Schéma anatomique détaillé du cœur humain"
  },
  {
    id: "5",
    name: "Video_Technique_Dissection.mp4",
    type: "video",
    size: "45.2 MB",
    category: "tp",
    course: "TP Anatomie",
    uploadDate: "2024-01-08",
    lastModified: "2024-01-08",
    visibility: "students",
    downloads: 28,
    description: "Démonstration vidéo des techniques de dissection"
  }
];

const documentTypeIcons = {
  pdf: FileText,
  doc: FileText,
  ppt: FileText,
  image: Image,
  video: Video,
  other: File,
};

const categoryLabels = {
  cours: { label: "Cours magistral", color: "bg-blue-100 text-blue-800" },
  tp: { label: "Travaux pratiques", color: "bg-green-100 text-green-800" },
  td: { label: "Travaux dirigés", color: "bg-purple-100 text-purple-800" },
  examen: { label: "Examen", color: "bg-red-100 text-red-800" },
  ressource: { label: "Ressource", color: "bg-yellow-100 text-yellow-800" },
};

const visibilityLabels = {
  public: { label: "Public", color: "bg-green-100 text-green-800" },
  students: { label: "Étudiants", color: "bg-blue-100 text-blue-800" },
  private: { label: "Privé", color: "bg-gray-100 text-gray-800" },
};

export default function TeacherDocuments() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "",
    course: "",
    visibility: "students",
    description: "",
  });

  const { toast } = useToast();

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesCourse = filterCourse === "all" || doc.course === filterCourse;

    return matchesSearch && matchesCategory && matchesCourse;
  });

  // Get unique courses for filter
  const uniqueCourses = Array.from(new Set(documents.map(doc => doc.course)));

  const handleDownload = (documentId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === documentId 
          ? { ...doc, downloads: doc.downloads + 1 }
          : doc
      )
    );
    toast({
      title: "Téléchargement démarré",
      description: "Le document est en cours de téléchargement.",
    });
  };

  const handleDelete = (documentId: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== documentId));
    toast({
      title: "Document supprimé",
      description: "Le document a été supprimé avec succès.",
    });
  };

  const handleUpload = () => {
    if (!newDocument.name || !newDocument.category || !newDocument.course) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const document: Document = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: "pdf", // Default type
      size: "1.5 MB", // Mock size
      category: newDocument.category as any,
      course: newDocument.course,
      uploadDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      visibility: newDocument.visibility as any,
      downloads: 0,
      description: newDocument.description,
    };

    setDocuments([...documents, document]);
    setNewDocument({
      name: "",
      category: "",
      course: "",
      visibility: "students",
      description: "",
    });
    setIsUploadOpen(false);
    
    toast({
      title: "Document ajouté",
      description: "Le document a été uploadé avec succès.",
    });
  };

  const totalDocuments = documents.length;
  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
  const publicDocuments = documents.filter(doc => doc.visibility === "public").length;
  const recentDocuments = documents
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 5);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Documents de Cours</h2>
            <p className="text-muted-foreground">
              Gestion de vos ressources pédagogiques
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <FolderOpen className="h-4 w-4 mr-2" />
              Organiser
            </Button>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Uploader
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Uploader un document</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau document à votre bibliothèque
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Fichier</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.mp4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du document</Label>
                    <Input
                      id="name"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                      placeholder="Nom du document"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={newDocument.category}
                        onValueChange={(value) => setNewDocument({...newDocument, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cours">Cours magistral</SelectItem>
                          <SelectItem value="tp">Travaux pratiques</SelectItem>
                          <SelectItem value="td">Travaux dirigés</SelectItem>
                          <SelectItem value="examen">Examen</SelectItem>
                          <SelectItem value="ressource">Ressource</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Cours</Label>
                      <Select
                        value={newDocument.course}
                        onValueChange={(value) => setNewDocument({...newDocument, course: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueCourses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibilité</Label>
                    <Select
                      value={newDocument.visibility}
                      onValueChange={(value) => setNewDocument({...newDocument, visibility: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="students">Étudiants seulement</SelectItem>
                        <SelectItem value="private">Privé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optionnelle)</Label>
                    <Textarea
                      id="description"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                      placeholder="Description du document..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Uploader
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Dans votre bibliothèque
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total téléchargements
              </CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDownloads}</div>
              <p className="text-xs text-muted-foreground">
                Par vos étudiants
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents publics
              </CardTitle>
              <Share className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publicDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Accessibles à tous
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cours couverts
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Matières avec documents
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="cours">Cours magistral</SelectItem>
                <SelectItem value="tp">Travaux pratiques</SelectItem>
                <SelectItem value="td">Travaux dirigés</SelectItem>
                <SelectItem value="examen">Examen</SelectItem>
                <SelectItem value="ressource">Ressource</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les cours</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Tous les documents</TabsTrigger>
            <TabsTrigger value="recent">Récents</TabsTrigger>
            <TabsTrigger value="popular">Populaires</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bibliothèque de documents</CardTitle>
                <CardDescription>
                  Gestion de tous vos documents pédagogiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Cours</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Visibilité</TableHead>
                      <TableHead>Téléchargements</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => {
                      const IconComponent = documentTypeIcons[document.type];
                      
                      return (
                        <TableRow key={document.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <IconComponent className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{document.name}</div>
                                {document.description && (
                                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                                    {document.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{document.course}</TableCell>
                          <TableCell>
                            <Badge className={categoryLabels[document.category].color}>
                              {categoryLabels[document.category].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{document.size}</TableCell>
                          <TableCell>
                            <Badge className={visibilityLabels[document.visibility].color}>
                              {visibilityLabels[document.visibility].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{document.downloads}</TableCell>
                          <TableCell>
                            {new Date(document.uploadDate).toLocaleDateString("fr-FR")}
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
                                    setSelectedDocument(document);
                                    setIsDetailsOpen(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir détails
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(document.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Télécharger
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="mr-2 h-4 w-4" />
                                  Partager
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDelete(document.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents récents</CardTitle>
                <CardDescription>
                  Les 5 derniers documents ajoutés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((document) => {
                    const IconComponent = documentTypeIcons[document.type];
                    
                    return (
                      <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{document.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {document.course} • {document.size}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={categoryLabels[document.category].color}>
                            {categoryLabels[document.category].label}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {new Date(document.uploadDate).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents populaires</CardTitle>
                <CardDescription>
                  Les documents les plus téléchargés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .sort((a, b) => b.downloads - a.downloads)
                    .slice(0, 5)
                    .map((document) => {
                      const IconComponent = documentTypeIcons[document.type];
                      
                      return (
                        <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{document.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {document.course} • {document.downloads} téléchargements
                              </div>
                            </div>
                          </div>
                          <Badge className={categoryLabels[document.category].color}>
                            {categoryLabels[document.category].label}
                          </Badge>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Document Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedDocument && (
                  <>
                    {React.createElement(documentTypeIcons[selectedDocument.type], {
                      className: "h-5 w-5"
                    })}
                    <span>{selectedDocument.name}</span>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            {selectedDocument && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cours</Label>
                    <div className="text-sm">{selectedDocument.course}</div>
                  </div>
                  <div>
                    <Label>Catégorie</Label>
                    <div className="text-sm">
                      <Badge className={categoryLabels[selectedDocument.category].color}>
                        {categoryLabels[selectedDocument.category].label}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Taille</Label>
                    <div className="text-sm">{selectedDocument.size}</div>
                  </div>
                  <div>
                    <Label>Visibilité</Label>
                    <div className="text-sm">
                      <Badge className={visibilityLabels[selectedDocument.visibility].color}>
                        {visibilityLabels[selectedDocument.visibility].label}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Téléchargements</Label>
                    <div className="text-sm">{selectedDocument.downloads}</div>
                  </div>
                  <div>
                    <Label>Date d'upload</Label>
                    <div className="text-sm">
                      {new Date(selectedDocument.uploadDate).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>
                {selectedDocument.description && (
                  <div>
                    <Label>Description</Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedDocument.description}
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Fermer
              </Button>
              <Button onClick={() => selectedDocument && handleDownload(selectedDocument.id)}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
