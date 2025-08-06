import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";
import LandingFooter from "../components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  Upload,
  FileText,
  User,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Camera,
  CreditCard,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nomPere: string;
  contactPere: string;
  nomMere: string;
  contactMere: string;
  nomTuteur: string;
  adresseTuteur: string;
  
  // Origine du candidat
  region: string;
  arrondissement: string;
  departement: string;
  village: string;
  
  // Informations complémentaires
  niveauEnseignement: string;
  ethnie: string;
  situationMatrimoniale: string;
  nomEpoux: string;
  contactEpoux: string;
  numeroCNI: string;

  // Informations académiques
  formation: string;
  niveauEtude: string;
  etablissementOrigine: string;
  matriculeConcours: string;

  // Documents
  documents: {
    releveNotes: File | null;
    diplome: File | null;
    acteNaissance: File | null;
    photoIdentiteRecto: File | null;
    photoIdentiteVerso: File | null;
    photo4x4: File | null;
    attestationConcours: File | null;
  };

  // Acceptation des conditions
  accepteConditions: boolean;
}

const AdmissionRequest: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    nomPere: "",
    contactPere: "",
    nomMere: "",
    contactMere: "",
    nomTuteur: "",
    adresseTuteur: "",
    region: "",
    arrondissement: "",
    departement: "",
    village: "",
    niveauEnseignement: "",
    ethnie: "",
    situationMatrimoniale: "",
    nomEpoux: "",
    contactEpoux: "",
    numeroCNI: "",
    formation: "",
    niveauEtude: "",
    etablissementOrigine: "",
    matriculeConcours: "",
    documents: {
      releveNotes: null,
      diplome: null,
      acteNaissance: null,
      photoIdentiteRecto: null,
      photoIdentiteVerso: null,
      photo4x4: null,
      attestationConcours: null,
    },
    accepteConditions: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formations = [
    { id: "aide-soignant", nom: "Aide-Soignant(e)" },
    { id: "infirmier-ide", nom: "Infirmier(ère) Diplômé(e) d'État" },
    { id: "agent-sante-communautaire", nom: "Agent de Santé Communautaire" },
    { id: "sage-femme", nom: "Sage-Femme" },
    { id: "technicien-labo", nom: "Technicien de Laboratoire" },
  ];

  const regions = [
    "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral", 
    "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (
    documentType: keyof FormData["documents"],
    file: File | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [documentType]: file },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validation des champs requis
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.dateNaissance)
      newErrors.dateNaissance = "La date de naissance est requise";
    if (!formData.lieuNaissance.trim())
      newErrors.lieuNaissance = "Le lieu de naissance est requis";
    if (!formData.nomPere.trim())
      newErrors.nomPere = "Le nom du père est requis";
    if (!formData.nomMere.trim())
      newErrors.nomMere = "Le nom de la mère est requis";
    if (!formData.formation) newErrors.formation = "La formation est requise";

    // Validation des documents requis
    if (!formData.documents.photoIdentiteRecto)
      newErrors.photoIdentiteRecto = "La photo d'identité (recto) est requise";
    if (!formData.documents.photoIdentiteVerso)
      newErrors.photoIdentiteVerso = "La photo d'identité (verso) est requise";
    if (!formData.documents.photo4x4)
      newErrors.photo4x4 = "La photo 4x4 est requise";

    // Validation des conditions
    if (!formData.accepteConditions)
      newErrors.accepteConditions = "Vous devez accepter les conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation de l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        "Votre demande d'admission a été soumise avec succès ! Vous recevrez une confirmation par email.",
      );
      navigate("/");
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUpload = ({
    label,
    documentType,
    required = false,
    accept = ".pdf,.jpg,.jpeg,.png",
    description,
  }: {
    label: string;
    documentType: keyof FormData["documents"];
    required?: boolean;
    accept?: string;
    description?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#ff9900] transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={(e) =>
            handleFileChange(documentType, e.target.files?.[0] || null)
          }
          className="hidden"
          id={documentType}
        />
        <label htmlFor={documentType} className="cursor-pointer">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              {formData.documents[documentType] ? (
                <p className="text-sm text-green-600 font-medium">
                  ✓ {formData.documents[documentType]?.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Cliquez pour sélectionner un fichier
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG (max 5MB)
            </p>
          </div>
        </label>
      </div>
      {errors[documentType] && (
        <p className="text-sm text-red-600">{errors[documentType]}</p>
      )}
    </div>
  );

  return (
    <div className="landing-page">
      <LandingHeader />

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* En-tête officiel */}
          <div className="text-center mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 mb-8">
              <div className="grid grid-cols-3 items-center gap-4 mb-6">
                <div className="text-left">
                  <p className="text-xs font-bold">RÉPUBLIQUE DU CAMEROUN</p>
                  <p className="text-xs">Paix - Travail - Patrie</p>
                  <p className="text-xs font-bold mt-2">MINISTÈRE DE LA SANTÉ PUBLIQUE</p>
                  <p className="text-xs">SECRÉTARIAT GÉNÉRAL</p>
                  <p className="text-xs mt-2">DIRECTION DES RESSOURCES HUMAINES</p>
                  <p className="text-xs">SOUS-DIRECTION DU DÉVELOPPEMENT DES RESSOURCES HUMAINES</p>
                  <p className="text-xs font-bold mt-2">ÉCOLE PRIVÉE DE FORMATION DES PROFESSIONNELS DE LA SANTÉ DE MEIGANGA</p>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">LOGO</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs font-bold">REPUBLIC OF CAMEROON</p>
                  <p className="text-xs">Peace - Work - Fatherland</p>
                  <p className="text-xs font-bold mt-2">MINISTRY OF PUBLIC HEALTH</p>
                  <p className="text-xs">GENERAL SECRETARIAT</p>
                  <p className="text-xs mt-2">DEPARTMENT OF HUMAN DEVELOPMENT OF HUMAN RESOURCES</p>
                  <p className="text-xs">SUB DEPARTMENT OF DEVELOPMENT OF HUMAN RESOURCES</p>
                  <p className="text-xs font-bold mt-2">PRIVATE TRAINING SCHOOL FOR HEALTH PROFESSIONALS OF MEIGANGA</p>
                </div>
              </div>
              
              <h1 className="heading-font text-2xl font-bold text-[#3b2c6a] mb-4">
                FICHE DE RENSEIGNEMENTS
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations Personnelles de Base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <User className="h-5 w-5" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nom">
                      Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      placeholder="Nom de famille"
                      className={errors.nom ? "border-red-500" : ""}
                    />
                    {errors.nom && (
                      <p className="text-sm text-red-600">{errors.nom}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prenom">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) =>
                        handleInputChange("prenom", e.target.value)
                      }
                      placeholder="Prénom"
                      className={errors.prenom ? "border-red-500" : ""}
                    />
                    {errors.prenom && (
                      <p className="text-sm text-red-600">{errors.prenom}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateNaissance">
                      Date de Naissance <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) =>
                        handleInputChange("dateNaissance", e.target.value)
                      }
                      className={errors.dateNaissance ? "border-red-500" : ""}
                    />
                    {errors.dateNaissance && (
                      <p className="text-sm text-red-600">
                        {errors.dateNaissance}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lieuNaissance">
                      Lieu de Naissance <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={(e) =>
                        handleInputChange("lieuNaissance", e.target.value)
                      }
                      placeholder="Ville, Pays"
                      className={errors.lieuNaissance ? "border-red-500" : ""}
                    />
                    {errors.lieuNaissance && (
                      <p className="text-sm text-red-600">{errors.lieuNaissance}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomPere">
                      Nom et prénom du père <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomPere"
                      value={formData.nomPere}
                      onChange={(e) =>
                        handleInputChange("nomPere", e.target.value)
                      }
                      placeholder="Nom complet du père"
                      className={errors.nomPere ? "border-red-500" : ""}
                    />
                    {errors.nomPere && (
                      <p className="text-sm text-red-600">{errors.nomPere}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPere">Contact du père</Label>
                    <Input
                      id="contactPere"
                      value={formData.contactPere}
                      onChange={(e) =>
                        handleInputChange("contactPere", e.target.value)
                      }
                      placeholder="Téléphone du père"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomMere">
                      Nom et prénom de la mère <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomMere"
                      value={formData.nomMere}
                      onChange={(e) =>
                        handleInputChange("nomMere", e.target.value)
                      }
                      placeholder="Nom complet de la mère"
                      className={errors.nomMere ? "border-red-500" : ""}
                    />
                    {errors.nomMere && (
                      <p className="text-sm text-red-600">{errors.nomMere}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactMere">Contact de la mère</Label>
                    <Input
                      id="contactMere"
                      value={formData.contactMere}
                      onChange={(e) =>
                        handleInputChange("contactMere", e.target.value)
                      }
                      placeholder="Téléphone de la mère"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomTuteur">Nom du tuteur</Label>
                    <Input
                      id="nomTuteur"
                      value={formData.nomTuteur}
                      onChange={(e) =>
                        handleInputChange("nomTuteur", e.target.value)
                      }
                      placeholder="Nom complet du tuteur"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adresseTuteur">Adresse et contact du tuteur</Label>
                    <Input
                      id="adresseTuteur"
                      value={formData.adresseTuteur}
                      onChange={(e) =>
                        handleInputChange("adresseTuteur", e.target.value)
                      }
                      placeholder="Adresse et téléphone du tuteur"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Origine du candidat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <MapPin className="h-5 w-5" />
                  Origine du candidat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="region">Région</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) =>
                        handleInputChange("region", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la région" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arrondissement">Arrondissement</Label>
                    <Input
                      id="arrondissement"
                      value={formData.arrondissement}
                      onChange={(e) =>
                        handleInputChange("arrondissement", e.target.value)
                      }
                      placeholder="Arrondissement"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="departement">Département</Label>
                    <Input
                      id="departement"
                      value={formData.departement}
                      onChange={(e) =>
                        handleInputChange("departement", e.target.value)
                      }
                      placeholder="Département"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village">Village</Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) =>
                        handleInputChange("village", e.target.value)
                      }
                      placeholder="Village"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations complémentaires */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <User className="h-5 w-5" />
                  Informations complémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="niveauEnseignement">Niveau d'enseignement général</Label>
                    <Select
                      value={formData.niveauEnseignement}
                      onValueChange={(value) =>
                        handleInputChange("niveauEnseignement", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bepc">BEPC</SelectItem>
                        <SelectItem value="probatoire">Probatoire</SelectItem>
                        <SelectItem value="baccalaureat">Baccalauréat</SelectItem>
                        <SelectItem value="licence">Licence</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ethnie">Ethnie</Label>
                    <Input
                      id="ethnie"
                      value={formData.ethnie}
                      onChange={(e) =>
                        handleInputChange("ethnie", e.target.value)
                      }
                      placeholder="Ethnie"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="situationMatrimoniale">Situation matrimoniale</Label>
                    <Select
                      value={formData.situationMatrimoniale}
                      onValueChange={(value) =>
                        handleInputChange("situationMatrimoniale", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Situation matrimoniale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celibataire">Célibataire</SelectItem>
                        <SelectItem value="marie">Marié(e)</SelectItem>
                        <SelectItem value="divorce">Divorcé(e)</SelectItem>
                        <SelectItem value="veuf">Veuf(ve)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomEpoux">Nom de l'époux ou épouse si marié(e)</Label>
                    <Input
                      id="nomEpoux"
                      value={formData.nomEpoux}
                      onChange={(e) =>
                        handleInputChange("nomEpoux", e.target.value)
                      }
                      placeholder="Nom de l'époux/épouse"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEpoux">Contact de l'époux ou épouse</Label>
                    <Input
                      id="contactEpoux"
                      value={formData.contactEpoux}
                      onChange={(e) =>
                        handleInputChange("contactEpoux", e.target.value)
                      }
                      placeholder="Contact de l'époux/épouse"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numeroCNI">Numéro CNI du candidat (délivré le ___ à ___)</Label>
                    <Input
                      id="numeroCNI"
                      value={formData.numeroCNI}
                      onChange={(e) =>
                        handleInputChange("numeroCNI", e.target.value)
                      }
                      placeholder="Numéro de carte nationale d'identité"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations Académiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <GraduationCap className="h-5 w-5" />
                  Informations Académiques
                </CardTitle>
                <CardDescription>
                  Précisez votre parcours académique et la formation souhaitée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="formation">
                    Formation Souhaitée <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.formation}
                    onValueChange={(value) =>
                      handleInputChange("formation", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.formation ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Choisissez votre formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {formations.map((formation) => (
                        <SelectItem key={formation.id} value={formation.id}>
                          {formation.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.formation && (
                    <p className="text-sm text-red-600">{errors.formation}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="niveauEtude">Niveau d'Étude Actuel</Label>
                    <Select
                      value={formData.niveauEtude}
                      onValueChange={(value) =>
                        handleInputChange("niveauEtude", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bepc">BEPC</SelectItem>
                        <SelectItem value="probatoire">Probatoire</SelectItem>
                        <SelectItem value="baccalaureat">
                          Baccalauréat
                        </SelectItem>
                        <SelectItem value="licence">Licence</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="etablissementOrigine">
                      Établissement d'Origine
                    </Label>
                    <Input
                      id="etablissementOrigine"
                      value={formData.etablissementOrigine}
                      onChange={(e) =>
                        handleInputChange(
                          "etablissementOrigine",
                          e.target.value,
                        )
                      }
                      placeholder="Nom de votre dernier établissement"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matriculeConcours">
                    Matricule de Réussite au Concours
                  </Label>
                  <Input
                    id="matriculeConcours"
                    value={formData.matriculeConcours}
                    onChange={(e) =>
                      handleInputChange("matriculeConcours", e.target.value)
                    }
                    placeholder="Votre matricule de réussite au concours d'entrée"
                  />
                  <p className="text-sm text-gray-500">
                    Ce matricule vous a été attribué lors de votre réussite au
                    concours d'entrée à l'EPFPS
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents à Joindre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <FileText className="h-5 w-5" />
                  Documents à Joindre
                </CardTitle>
                <CardDescription>
                  Veuillez joindre tous les documents requis (formats acceptés:
                  JPG, PNG)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    label="Photo d'identité (Recto)"
                    documentType="photoIdentiteRecto"
                    required
                    accept=".jpg,.jpeg,.png"
                    description="Face avant de votre carte d'identité"
                  />

                  <FileUpload
                    label="Photo d'identité (Verso)"
                    documentType="photoIdentiteVerso"
                    required
                    accept=".jpg,.jpeg,.png"
                    description="Face arrière de votre carte d'identité"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    label="Photo 4x4"
                    documentType="photo4x4"
                    required
                    accept=".jpg,.jpeg,.png"
                    description="Photo format 4cm x 4cm, récente et en couleur"
                  />

                  <FileUpload
                    label="Relevé de Notes"
                    documentType="releveNotes"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    label="Diplôme/Certificat"
                    documentType="diplome"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />

                  <FileUpload
                    label="Acte de Naissance"
                    documentType="acteNaissance"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>

                <FileUpload
                  label="Attestation de Réussite au Concours"
                  documentType="attestationConcours"
                  accept=".pdf,.jpg,.jpeg,.png"
                />

                {/* Espace réservé à la photo comme dans le document original */}
                <div className="mt-8 flex justify-center">
                  <div className="border-2 border-black w-32 h-40 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Espace réservé</p>
                      <p className="text-xs text-gray-500">à la photo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditions et Soumission */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="accepteConditions"
                      checked={formData.accepteConditions}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "accepteConditions",
                          checked ? "true" : "false",
                        )
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="accepteConditions"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J'accepte les conditions d'admission{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground">
                        En cochant cette case, je confirme que toutes les
                        informations fournies sont exactes et j'accepte les
                        conditions d'admission de l'EPFPS.
                      </p>
                    </div>
                  </div>
                  {errors.accepteConditions && (
                    <p className="text-sm text-red-600">
                      {errors.accepteConditions}
                    </p>
                  )}

                  {Object.keys(errors).length > 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Veuillez corriger les erreurs ci-dessus avant de
                        soumettre votre demande.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="px-8"
                    >
                      Retour à l'accueil
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#ff9900] hover:bg-[#e68a00] text-white px-8"
                    >
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Soumettre ma demande"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default AdmissionRequest;
