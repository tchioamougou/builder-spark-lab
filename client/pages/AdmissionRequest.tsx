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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  sexe: string;
  telephone: string;
  email: string;
  adresse: string;

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
    photo: File | null;
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
    nationalite: "Camerounaise",
    sexe: "",
    telephone: "",
    email: "",
    adresse: "",
    formation: "",
    niveauEtude: "",
    etablissementOrigine: "",
    matriculeConcours: "",
    documents: {
      releveNotes: null,
      diplome: null,
      acteNaissance: null,
      photo: null,
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
    if (!formData.telephone.trim())
      newErrors.telephone = "Le téléphone est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.formation) newErrors.formation = "La formation est requise";
    if (!formData.matriculeConcours.trim())
      newErrors.matriculeConcours =
        "Le matricule de réussite au concours est requis";

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation des documents requis
    if (!formData.documents.releveNotes)
      newErrors.releveNotes = "Le relevé de notes est requis";
    if (!formData.documents.acteNaissance)
      newErrors.acteNaissance = "L'acte de naissance est requis";
    if (!formData.documents.photo)
      newErrors.photo = "La photo d'identité est requise";
    if (!formData.documents.attestationConcours)
      newErrors.attestationConcours =
        "L'attestation de réussite au concours est requise";

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
      // Ici vous ajouteriez l'appel API réel
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirection vers une page de confirmation
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
  }: {
    label: string;
    documentType: keyof FormData["documents"];
    required?: boolean;
    accept?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
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
              PDF, JPG, PNG (max 5MB)
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
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="heading-font text-4xl md:text-5xl font-bold text-[#3b2c6a] mb-4">
              Demande d'Admission
            </h1>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Remplissez ce formulaire pour soumettre votre demande d'admission
              à l'EPFPS. Assurez-vous de fournir toutes les informations
              requises et de joindre les documents nécessaires.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations Personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                  <User className="h-5 w-5" />
                  Informations Personnelles
                </CardTitle>
                <CardDescription>
                  Veuillez fournir vos informations personnelles exactes
                </CardDescription>
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
                      placeholder="Votre nom de famille"
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
                      placeholder="Votre prénom"
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
                    <Label htmlFor="lieuNaissance">Lieu de Naissance</Label>
                    <Input
                      id="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={(e) =>
                        handleInputChange("lieuNaissance", e.target.value)
                      }
                      placeholder="Ville, Pays"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sexe">
                      Sexe <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.sexe}
                      onValueChange={(value) =>
                        handleInputChange("sexe", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre sexe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculin">Masculin</SelectItem>
                        <SelectItem value="feminin">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationalite">Nationalité</Label>
                    <Input
                      id="nationalite"
                      value={formData.nationalite}
                      onChange={(e) =>
                        handleInputChange("nationalite", e.target.value)
                      }
                      placeholder="Nationalité"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">
                      Téléphone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) =>
                        handleInputChange("telephone", e.target.value)
                      }
                      placeholder="+237 6XX XXX XXX"
                      className={errors.telephone ? "border-red-500" : ""}
                    />
                    {errors.telephone && (
                      <p className="text-sm text-red-600">{errors.telephone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="votre.email@exemple.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse Complète</Label>
                  <Textarea
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) =>
                      handleInputChange("adresse", e.target.value)
                    }
                    placeholder="Quartier, ville, région..."
                    rows={3}
                  />
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
                    Matricule de Réussite au Concours{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="matriculeConcours"
                    value={formData.matriculeConcours}
                    onChange={(e) =>
                      handleInputChange("matriculeConcours", e.target.value)
                    }
                    placeholder="Votre matricule de réussite au concours d'entrée"
                    className={errors.matriculeConcours ? "border-red-500" : ""}
                  />
                  {errors.matriculeConcours && (
                    <p className="text-sm text-red-600">
                      {errors.matriculeConcours}
                    </p>
                  )}
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
                  PDF, JPG, PNG)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    label="Relevé de Notes"
                    documentType="releveNotes"
                    required
                  />

                  <FileUpload
                    label="Diplôme/Certificat"
                    documentType="diplome"
                  />

                  <FileUpload
                    label="Acte de Naissance"
                    documentType="acteNaissance"
                    required
                  />

                  <FileUpload
                    label="Photo d'Identité"
                    documentType="photo"
                    required
                    accept=".jpg,.jpeg,.png"
                  />
                </div>

                <FileUpload
                  label="Attestation de Réussite au Concours"
                  documentType="attestationConcours"
                  required
                />
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
