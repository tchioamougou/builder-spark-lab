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
import { Label } from "@/components/ui/label";
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Reply,
  Forward,
  Trash2,
  Archive,
  Star,
  Users,
  Clock,
  Mail,
  MailOpen,
  Edit,
  Paperclip,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: "student" | "teacher" | "admin";
  };
  recipient: {
    id: string;
    name: string;
    role: "student" | "teacher" | "admin";
  };
  date: string;
  read: boolean;
  starred: boolean;
  type: "received" | "sent";
  category?: "question" | "absence" | "admin" | "general";
  course?: string;
  attachments?: string[];
}

const mockMessages: Message[] = [
  {
    id: "1",
    subject: "Question sur le cours d'anatomie",
    content: "Bonjour professeur, j'aurais une question concernant le chapitre 3 sur le système cardiovasculaire. Pourriez-vous m'expliquer la différence entre les artères et les veines ? Merci beaucoup.",
    sender: {
      id: "s1",
      name: "Marie Dupont",
      role: "student"
    },
    recipient: {
      id: "t1",
      name: "Prof. Martin",
      role: "teacher"
    },
    date: "2024-01-20T14:30:00",
    read: false,
    starred: false,
    type: "received",
    category: "question",
    course: "Anatomie générale"
  },
  {
    id: "2",
    subject: "Justificatif d'absence",
    content: "Bonjour, je vous écris pour justifier mon absence au TP du 18 janvier. J'ai eu un rendez-vous médical urgent. Vous trouverez le certificat médical en pièce jointe.",
    sender: {
      id: "s2",
      name: "Jean Martin",
      role: "student"
    },
    recipient: {
      id: "t1",
      name: "Prof. Martin",
      role: "teacher"
    },
    date: "2024-01-19T09:15:00",
    read: true,
    starred: true,
    type: "received",
    category: "absence",
    course: "Anatomie générale",
    attachments: ["certificat_medical.pdf"]
  },
  {
    id: "3",
    subject: "Planning des examens finalisé",
    content: "Le planning des examens de fin de semestre est maintenant disponible. Veuillez consulter le portail étudiant pour les détails.",
    sender: {
      id: "a1",
      name: "Secrétariat",
      role: "admin"
    },
    recipient: {
      id: "t1",
      name: "Prof. Martin",
      role: "teacher"
    },
    date: "2024-01-18T16:45:00",
    read: true,
    starred: false,
    type: "received",
    category: "admin"
  },
  {
    id: "4",
    subject: "Réponse: Question sur le cours d'anatomie",
    content: "Bonjour Marie, excellente question ! Les artères transportent le sang oxygénée du cœur vers les organes, tandis que les veines ramènent le sang désoxygéné vers le cœur. Je vous recommande de revoir le schéma de la page 45 de votre manuel.",
    sender: {
      id: "t1",
      name: "Prof. Martin",
      role: "teacher"
    },
    recipient: {
      id: "s1",
      name: "Marie Dupont",
      role: "student"
    },
    date: "2024-01-20T15:15:00",
    read: true,
    starred: false,
    type: "sent",
    category: "question",
    course: "Anatomie générale"
  }
];

const categoryLabels = {
  question: { label: "Question", color: "bg-blue-100 text-blue-800" },
  absence: { label: "Absence", color: "bg-yellow-100 text-yellow-800" },
  admin: { label: "Administration", color: "bg-purple-100 text-purple-800" },
  general: { label: "Général", color: "bg-gray-100 text-gray-800" },
};

export default function TeacherMessages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    content: "",
    category: "general",
  });

  const { toast } = useToast();

  const filteredMessages = (type: "received" | "sent" | "all") => {
    return messages.filter((message) => {
      const matchesType = type === "all" || message.type === type;
      const matchesSearch = 
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  };

  const handleMarkAsRead = (messageId: string) => {
    setMessages(msgs => 
      msgs.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const handleStarMessage = (messageId: string) => {
    setMessages(msgs => 
      msgs.map(msg => 
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(msgs => msgs.filter(msg => msg.id !== messageId));
    setSelectedMessage(null);
    toast({
      title: "Message supprimé",
      description: "Le message a été supprimé avec succès.",
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.recipient || !newMessage.subject || !newMessage.content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      subject: newMessage.subject,
      content: newMessage.content,
      sender: {
        id: "t1",
        name: "Prof. Martin",
        role: "teacher"
      },
      recipient: {
        id: "s" + Date.now(),
        name: newMessage.recipient,
        role: "student"
      },
      date: new Date().toISOString(),
      read: true,
      starred: false,
      type: "sent",
      category: newMessage.category as any,
    };

    setMessages([message, ...messages]);
    setNewMessage({
      recipient: "",
      subject: "",
      content: "",
      category: "general",
    });
    setIsComposeOpen(false);
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  const handleReply = (originalMessage: Message) => {
    setNewMessage({
      recipient: originalMessage.sender.name,
      subject: `Re: ${originalMessage.subject}`,
      content: `\n\n--- Message original ---\n${originalMessage.content}`,
      category: originalMessage.category || "general",
    });
    setIsComposeOpen(true);
  };

  const unreadCount = messages.filter(msg => msg.type === "received" && !msg.read).length;
  const receivedCount = messages.filter(msg => msg.type === "received").length;
  const sentCount = messages.filter(msg => msg.type === "sent").length;
  const starredCount = messages.filter(msg => msg.starred).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            <p className="text-muted-foreground">
              Communication avec vos étudiants et collègues
            </p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Composer un message</DialogTitle>
                <DialogDescription>
                  Envoyer un message à un étudiant ou collègue
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinataire</Label>
                  <Input
                    id="recipient"
                    value={newMessage.recipient}
                    onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                    placeholder="Nom du destinataire"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                      placeholder="Sujet du message"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={newMessage.category}
                      onValueChange={(value) => setNewMessage({...newMessage, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Général</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                        <SelectItem value="absence">Absence</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    placeholder="Votre message..."
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Messages non lus
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">
                À traiter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reçus
              </CardTitle>
              <MailOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receivedCount}</div>
              <p className="text-xs text-muted-foreground">
                Total reçus
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Envoyés
              </CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sentCount}</div>
              <p className="text-xs text-muted-foreground">
                Messages envoyés
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Favoris
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{starredCount}</div>
              <p className="text-xs text-muted-foreground">
                Messages marqués
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Messages List */}
          <div className="col-span-5">
            <Tabs defaultValue="received" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="received">Reçus ({receivedCount})</TabsTrigger>
                <TabsTrigger value="sent">Envoyés ({sentCount})</TabsTrigger>
                <TabsTrigger value="starred">Favoris ({starredCount})</TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="space-y-2">
                {filteredMessages("received").map((message) => (
                  <Card 
                    key={message.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedMessage?.id === message.id ? "ring-2 ring-primary" : ""
                    } ${!message.read ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) {
                        handleMarkAsRead(message.id);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>
                              {message.sender.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <div className={`font-medium truncate ${!message.read ? "font-bold" : ""}`}>
                                {message.sender.name}
                              </div>
                              {message.category && (
                                <Badge size="sm" className={categoryLabels[message.category].color}>
                                  {categoryLabels[message.category].label}
                                </Badge>
                              )}
                            </div>
                            <div className={`text-sm truncate ${!message.read ? "font-semibold" : "text-muted-foreground"}`}>
                              {message.subject}
                            </div>
                            <div className="text-xs text-muted-foreground truncate mt-1">
                              {message.content}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-muted-foreground">
                                {formatDate(message.date)}
                              </div>
                              <div className="flex items-center space-x-1">
                                {!message.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                                {message.starred && (
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                )}
                                {message.attachments && message.attachments.length > 0 && (
                                  <Paperclip className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sent" className="space-y-2">
                {filteredMessages("sent").map((message) => (
                  <Card 
                    key={message.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedMessage?.id === message.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {message.recipient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium truncate">
                              À: {message.recipient.name}
                            </div>
                            {message.category && (
                              <Badge size="sm" className={categoryLabels[message.category].color}>
                                {categoryLabels[message.category].label}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {message.subject}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mt-1">
                            {message.content}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {formatDate(message.date)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="starred" className="space-y-2">
                {messages.filter(msg => msg.starred).map((message) => (
                  <Card 
                    key={message.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedMessage?.id === message.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {(message.type === "received" ? message.sender : message.recipient).name
                              .split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium truncate">
                              {message.type === "received" 
                                ? message.sender.name 
                                : `À: ${message.recipient.name}`}
                            </div>
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {message.subject}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {formatDate(message.date)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Message Detail */}
          <div className="col-span-7">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {(selectedMessage.type === "received" 
                                  ? selectedMessage.sender 
                                  : selectedMessage.recipient).name
                                  .split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>
                              {selectedMessage.type === "received" 
                                ? `De: ${selectedMessage.sender.name}` 
                                : `À: ${selectedMessage.recipient.name}`}
                            </span>
                          </div>
                          <div className="text-sm">
                            {new Date(selectedMessage.date).toLocaleString("fr-FR")}
                          </div>
                          {selectedMessage.category && (
                            <Badge className={categoryLabels[selectedMessage.category].color}>
                              {categoryLabels[selectedMessage.category].label}
                            </Badge>
                          )}
                        </div>
                        {selectedMessage.course && (
                          <div className="text-sm mt-1">
                            Cours: {selectedMessage.course}
                          </div>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStarMessage(selectedMessage.id)}
                      >
                        <Star className={`h-4 w-4 ${selectedMessage.starred ? "text-yellow-500 fill-current" : ""}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReply(selectedMessage)}
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm">
                      {selectedMessage.content}
                    </div>
                  </div>
                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm font-medium mb-2">Pièces jointes:</div>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{attachment}</span>
                            <Button variant="ghost" size="sm">
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedMessage.type === "received" && (
                    <div className="mt-6 pt-4 border-t">
                      <Button onClick={() => handleReply(selectedMessage)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Répondre
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez un message pour le lire</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
