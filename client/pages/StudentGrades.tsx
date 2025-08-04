import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/contexts/AuthContext";
import { generateGradesPDF, generateBulletinPDF } from "@/lib/pdf-utils";
import {
  FileText,
  TrendingUp,
  Download,
  BarChart3,
  Award,
  Calendar
} from "lucide-react";

const gradesData = [
  {
    id: 1,
    ue: "Anatomie générale",
    module: "Sciences biomédicales",
    sequence: "Séquence 1",
    noteCC: 14.5,
    noteExamen: 16.2,
    noteFinale: 15.6,
    coefficient: 3,
    credits: 6,
    statut: "Validé"
  },
  {
    id: 2,
    ue: "Chimie organique",
    module: "Sciences de base",
    sequence: "Séquence 1", 
    noteCC: 12.8,
    noteExamen: 13.5,
    noteFinale: 13.2,
    coefficient: 2,
    credits: 4,
    statut: "Validé"
  },
  {
    id: 3,
    ue: "Physiologie",
    module: "Sciences biomédicales",
    sequence: "Séquence 1",
    noteCC: 15.2,
    noteExamen: 17.8,
    noteFinale: 16.8,
    coefficient: 3,
    credits: 6,
    statut: "Validé"
  },
  {
    id: 4,
    ue: "Mathématiques appliquées",
    module: "Sciences de base",
    sequence: "Séquence 2",
    noteCC: null,
    noteExamen: null,
    noteFinale: null,
    coefficient: 2,
    credits: 3,
    statut: "En cours"
  }
];

const sequenceStats = [
  {
    sequence: "Séquence 1",
    moyenne: 15.2,
    credits: 16,
    creditsObtenus: 16,
    rang: 8,
    effectif: 45,
    statut: "Validé"
  },
  {
    sequence: "Séquence 2", 
    moyenne: null,
    credits: 14,
    creditsObtenus: 0,
    rang: null,
    effectif: 45,
    statut: "En cours"
  }
];

export default function StudentGrades() {
  const { user } = useAuth();

  const getGradeColor = (note: number | null) => {
    if (note === null) return "text-gray-400";
    if (note >= 16) return "text-green-600";
    if (note >= 14) return "text-blue-600";
    if (note >= 12) return "text-orange-600";
    if (note >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Validé": return "bg-green-100 text-green-800";
      case "En cours": return "bg-blue-100 text-blue-800";
      case "Non validé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes notes</h2>
            <p className="text-muted-foreground">
              Consultez vos résultats académiques - {user?.filiere} {user?.niveau}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Télécharger bulletin
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.2/20</div>
              <p className="text-xs text-muted-foreground">
                Mention Bien
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crédits validés</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16/30</div>
              <p className="text-xs text-muted-foreground">
                ECTS obtenus cette année
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rang promotion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/45</div>
              <p className="text-xs text-muted-foreground">
                Position dans la promotion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">53%</div>
              <p className="text-xs text-muted-foreground">
                Avancement année académique
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="notes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notes">Détail des notes</TabsTrigger>
            <TabsTrigger value="sequences">Par séquence</TabsTrigger>
            <TabsTrigger value="bulletins">Bulletins</TabsTrigger>
          </TabsList>

          {/* Detailed Grades Tab */}
          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notes détaillées</CardTitle>
                <CardDescription>
                  Toutes vos notes par unité d'enseignement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unité d'enseignement</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Contrôle continu</TableHead>
                      <TableHead>Examen final</TableHead>
                      <TableHead>Note finale</TableHead>
                      <TableHead>Coef.</TableHead>
                      <TableHead>Crédits</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradesData.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.ue}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{grade.module}</TableCell>
                        <TableCell className={`font-medium ${getGradeColor(grade.noteCC)}`}>
                          {grade.noteCC ? `${grade.noteCC}/20` : "-"}
                        </TableCell>
                        <TableCell className={`font-medium ${getGradeColor(grade.noteExamen)}`}>
                          {grade.noteExamen ? `${grade.noteExamen}/20` : "-"}
                        </TableCell>
                        <TableCell className={`font-bold ${getGradeColor(grade.noteFinale)}`}>
                          {grade.noteFinale ? `${grade.noteFinale}/20` : "-"}
                        </TableCell>
                        <TableCell>{grade.coefficient}</TableCell>
                        <TableCell>{grade.credits}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(grade.statut)}>
                            {grade.statut}
                          </Badge>
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
            <div className="grid gap-4 md:grid-cols-2">
              {sequenceStats.map((seq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{seq.sequence}</span>
                      <Badge variant="secondary" className={getStatusColor(seq.statut)}>
                        {seq.statut}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Moyenne:</span>
                        <span className={`font-bold text-lg ${getGradeColor(seq.moyenne)}`}>
                          {seq.moyenne ? `${seq.moyenne}/20` : "En attente"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Crédits:</span>
                        <span className="font-medium">
                          {seq.creditsObtenus}/{seq.credits} ECTS
                        </span>
                      </div>
                      {seq.rang && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Rang:</span>
                          <span className="font-medium">
                            {seq.rang}/{seq.effectif}
                          </span>
                        </div>
                      )}
                      {seq.moyenne && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              seq.moyenne >= 16 ? 'bg-green-500' :
                              seq.moyenne >= 14 ? 'bg-blue-500' :
                              seq.moyenne >= 12 ? 'bg-orange-500' :
                              seq.moyenne >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(seq.moyenne / 20) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bulletins Tab */}
          <TabsContent value="bulletins" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bulletins disponibles</CardTitle>
                <CardDescription>
                  Téléchargez vos bulletins de notes officiels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-medium">Bulletin Séquence 1</div>
                        <div className="text-sm text-muted-foreground">
                          {user?.filiere} {user?.niveau} - 2023/2024
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Généré le 20/01/2024
                        </div>
                      </div>
                    </div>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="font-medium">Bulletin Séquence 2</div>
                        <div className="text-sm text-muted-foreground">
                          {user?.filiere} {user?.niveau} - 2023/2024
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Disponible après validation des notes
                        </div>
                      </div>
                    </div>
                    <Button disabled>
                      <Download className="h-4 w-4 mr-2" />
                      En attente
                    </Button>
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
