import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAuth } from "@/contexts/AuthContext";
import { 
  MessageSquare, 
  Plus,
  Search,
  Send,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal,
  Clock,
  User,
  Bell
} from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    participant: "Dr. Jean Martin",
    role: "Enseignant - Anatomie",
    sujet: "Question sur le cours d'anatomie",
    dernierMessage: "Merci pour votre question. Voici l'explication...",
    dateMessage: "2024-01-20 14:30",
    nonLu: false,
    avatar: "/placeholder.svg",
    messages: [
      {
        id: 1,
        expediteur: "Marie Dupont",
        contenu: "Bonjour professeur, j'aurais une question concernant le chapitre 3 du cours d'anatomie. Pourriez-vous m'expliquer la différence entre...",
        date: "2024-01-20 10:15",
        type: "envoyé"
      },
      {
        id: 2,
        expediteur: "Dr. Jean Martin", 
        contenu: "Bonjour Marie, excellente question ! La différence principale réside dans... Je vous conseille également de consulter le manuel pages 45-48.",
        date: "2024-01-20 14:30",
        type: "reçu"
      }
    ]
  },
  {
    id: 2,
    participant: "Secrétariat Scolarité",
    role: "Service administratif",
    sujet: "Validation inscription stage",
    dernierMessage: "Votre dossier de stage a été validé",
    dateMessage: "2024-01-19 16:45",
    nonLu: true,
    avatar: "/placeholder.svg",
    messages: [
      {
        id: 1,
        expediteur: "Secrétariat Scolarité",
        contenu: "Votre dossier de stage en pharmacie hospitalière a été validé. Vous pouvez commencer votre stage le 1er février 2024.",
        date: "2024-01-19 16:45",
        type: "reçu"
      }
    ]
  },
  {
    id: 3,
    participant: "Dr. Sophie Laurent",
    role: "Enseignant - Pharmacologie",
    sujet: "Report examen",
    dernierMessage: "D'accord pour le report, nouvelle date fixée",
    dateMessage: "2024-01-18 11:20",
    nonLu: false,
    avatar: "/placeholder.svg",
    messages: [
      {
        id: 1,
        expediteur: "Marie Dupont",
        contenu: "Madame, suite à mon hospitalisation, pourriez-vous reporter mon examen de pharmacologie ?",
        date: "2024-01-17 09:30",
        type: "envoyé"
      },
      {
        id: 2,
        expediteur: "Dr. Sophie Laurent",
        contenu: "Bien sûr Marie, j'espère que vous allez mieux. L'examen est reporté au 15 février. Bon rétablissement !",
        date: "2024-01-18 11:20",
        type: "reçu"
      }
    ]
  },
  {
    id: 4,
    participant: "Service Social",
    role: "Service d'aide",
    sujet: "Demande d'aide financière", 
    dernierMessage: "Dossier en cours d'étude",
    dateMessage: "2024-01-15 14:15",
    nonLu: false,
    avatar: "/placeholder.svg",
    messages: [
      {
        id: 1,
        expediteur: "Marie Dupont",
        contenu: "Bonjour, je souhaiterais faire une demande d'aide financière exceptionnelle suite aux difficultés familiales...",
        date: "2024-01-15 10:00",
        type: "envoyé"
      },
      {
        id: 2,
        expediteur: "Service Social",
        contenu: "Bonjour Marie, nous avons bien reçu votre demande. Votre dossier est actuellement en cours d'étude. Nous vous recontacterons sous 5 jours ouvrés.",
        date: "2024-01-15 14:15",
        type: "reçu"
      }
    ]
  }
];

const notifications = [
  {
    id: 1,
    titre: "Nouveau message de Dr. Jean Martin",
    description: "Réponse à votre question sur l'anatomie",
    date: "2024-01-20 14:30",
    lu: false
  },
  {
    id: 2,
    titre: "Message du secrétariat",
    description: "Validation de votre dossier de stage",
    date: "2024-01-19 16:45",
    lu: false
  },
  {
    id: 3,
    titre: "Rappel: Répondre à Dr. Sophie Laurent",
    description: "Message en attente de réponse depuis 2 jours",
    date: "2024-01-18 11:20",
    lu: true
  }
];

export default function StudentMessages() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(conv => 
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.sujet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = conversations.filter(conv => conv.nonLu).length;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return "Aujourd'hui " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 2) {
      return "Hier " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 7) {
      return date.toLocaleDateString('fr-FR', { weekday: 'short' }) + " " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            <p className="text-muted-foreground">
              Communiquez avec vos enseignants et l'administration
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nouveau message</DialogTitle>
                  <DialogDescription>
                    Envoyer un message à un enseignant ou service administratif
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="destinataire" className="text-right">Destinataire</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner le destinataire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="martin">Dr. Jean Martin - Anatomie</SelectItem>
                        <SelectItem value="laurent">Dr. Sophie Laurent - Pharmacologie</SelectItem>
                        <SelectItem value="scolarite">Secrétariat Scolarité</SelectItem>
                        <SelectItem value="social">Service Social</SelectItem>
                        <SelectItem value="bibliotheque">Bibliothèque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sujetMessage" className="text-right">Sujet</Label>
                    <Input id="sujetMessage" className="col-span-3" placeholder="Objet de votre message" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contenuMessage" className="text-right">Message</Label>
                    <Textarea id="contenuMessage" className="col-span-3" rows={6} placeholder="Rédigez votre message..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pieceJointe" className="text-right">Pièce jointe</Label>
                    <Input id="pieceJointe" type="file" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">
                Discussions actives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">
                Nécessitent attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enseignants contactés</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.filter(conv => conv.role.includes("Enseignant")).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Professeurs différents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Nouveaux messages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Messages Interface */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversations</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une conversation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                      selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.participant.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{conversation.participant}</div>
                          {conversation.nonLu && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{conversation.role}</div>
                        <div className="text-sm font-medium truncate mt-1">{conversation.sujet}</div>
                        <div className="text-sm text-muted-foreground truncate">{conversation.dernierMessage}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatTime(conversation.dateMessage)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>
                      {selectedConversation.participant.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedConversation.participant}</div>
                    <div className="text-sm text-muted-foreground">{selectedConversation.role}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-lg font-semibold">{selectedConversation.sujet}</div>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'envoyé' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'envoyé'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="text-sm">{message.contenu}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.type === 'envoyé' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Section */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Tapez votre réponse..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Reply className="h-4 w-4 mr-2" />
                      Répondre
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications récentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    !notification.lu ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className={`font-medium ${!notification.lu ? 'text-blue-900' : 'text-gray-900'}`}>
                        {notification.titre}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {notification.description}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(notification.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
