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
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { generateAdmissionPDF, generateConfirmationPDF } from "@/lib/pdf-generator";

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

const STEPS = [
  {
    id: 1,
    title: "Informations Personnelles",
    description: "Vos données personnelles de base",
    icon: User,
  },
  {
    id: 2,
    title: "Origine",
    description: "Votre lieu d'origine",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Informations Complémentaires",
    description: "Détails additionnels",
    icon: FileText,
  },
  {
    id: 4,
    title: "Informations Académiques",
    description: "Votre parcours académique",
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Documents",
    description: "Documents à joindre",
    icon: Upload,
  },
  {
    id: 6,
    title: "Confirmation",
    description: "Vérification et envoi",
    icon: CheckCircle,
  },
];

const AdmissionRequest: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

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

  const validateCurrentStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (currentStep) {
      case 1: // Informations Personnelles
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
        break;

      case 4: // Informations Académiques
        if (!formData.formation) newErrors.formation = "La formation est requise";
        break;

      case 5: // Documents
        if (!formData.documents.photoIdentiteRecto)
          newErrors.photoIdentiteRecto = "La photo d'identité (recto) est requise";
        if (!formData.documents.photoIdentiteVerso)
          newErrors.photoIdentiteVerso = "La photo d'identité (verso) est requise";
        if (!formData.documents.photo4x4)
          newErrors.photo4x4 = "La photo 4x4 est requise";
        break;

      case 6: // Confirmation
        if (!formData.accepteConditions)
          newErrors.accepteConditions = "Vous devez accepter les conditions";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation de l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Génération des PDFs
      const pdfData = {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: formData.dateNaissance,
        lieuNaissance: formData.lieuNaissance,
        nomPere: formData.nomPere,
        contactPere: formData.contactPere,
        nomMere: formData.nomMere,
        contactMere: formData.contactMere,
        nomTuteur: formData.nomTuteur,
        adresseTuteur: formData.adresseTuteur,
        region: formData.region,
        arrondissement: formData.arrondissement,
        departement: formData.departement,
        village: formData.village,
        niveauEnseignement: formData.niveauEnseignement,
        ethnie: formData.ethnie,
        situationMatrimoniale: formData.situationMatrimoniale,
        nomEpoux: formData.nomEpoux,
        contactEpoux: formData.contactEpoux,
        numeroCNI: formData.numeroCNI,
        formation: formData.formation,
        niveauEtude: formData.niveauEtude,
        etablissementOrigine: formData.etablissementOrigine,
        matriculeConcours: formData.matriculeConcours,
      };

      // Générer la fiche de renseignements officielle
      generateAdmissionPDF(pdfData);

      // Générer le document de confirmation
      setTimeout(() => {
        generateConfirmationPDF(pdfData);
      }, 1000);

      alert(
        "Votre demande d'admission a été soumise avec succès ! Les documents PDF ont été générés et téléchargés automatiquement.",
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Informations Personnelles
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 2: // Origine du candidat
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 3: // Informations complémentaires
        return (
          <div className="space-y-6">
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
                <Label htmlFor="numeroCNI">Numéro CNI du candidat</Label>
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
          </div>
        );

      case 4: // Informations Académiques
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 5: // Documents à Joindre
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 6: // Confirmation
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-[#3b2c6a]">
                Récapitulatif de votre demande
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Nom:</span> {formData.nom}
                  </div>
                  <div>
                    <span className="font-medium">Prénom:</span> {formData.prenom}
                  </div>
                  <div>
                    <span className="font-medium">Date de naissance:</span> {formData.dateNaissance}
                  </div>
                  <div>
                    <span className="font-medium">Formation souhaitée:</span> {
                      formations.find(f => f.id === formData.formation)?.nom || formData.formation
                    }
                  </div>
                </div>
              </div>
            </div>

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
                  Veuillez corriger les erreurs avant de soumettre votre demande.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = STEPS.find(step => step.id === currentStep);
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="landing-page">
      <LandingHeader />

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* En-tête simplifié */}
          <div className="text-center mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">LOGO</span>
                </div>
                <div className="text-center">
                  <h2 className="text-sm font-bold text-[#3b2c6a] mb-1">
                    ÉCOLE PRIVÉE DE FORMATION DES PROFESSIONNELS DE LA SANTÉ
                  </h2>
                  <p className="text-xs text-gray-600">MEIGANGA - CAMEROUN</p>
                  <p className="text-xs text-gray-500">Tél: +237 XXX XXX XXX | Email: contact@epfps.cm</p>
                </div>
              </div>

              <h1 className="heading-font text-3xl font-bold text-[#3b2c6a] mb-4">
                FICHE DE RENSEIGNEMENTS
              </h1>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#3b2c6a]">
                Étape {currentStep} sur {STEPS.length}
              </h2>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% complété
              </span>
            </div>
            
            <Progress value={progress} className="mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center text-center ${
                      isActive
                        ? "text-[#ff9900]"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isActive
                          ? "bg-[#ff9900] text-white"
                          : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden md:block max-w-20">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#3b2c6a]">
                {currentStepData && (
                  <>
                    <currentStepData.icon className="h-5 w-5" />
                    {currentStepData.title}
                  </>
                )}
              </CardTitle>
              {currentStepData && (
                <CardDescription>
                  {currentStepData.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? () => navigate("/") : prevStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {currentStep === 1 ? "Retour à l'accueil" : "Précédent"}
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                onClick={nextStep}
                className="bg-[#ff9900] hover:bg-[#e68a00] text-white flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#ff9900] hover:bg-[#e68a00] text-white"
              >
                {isSubmitting
                  ? "Envoi en cours..."
                  : "Soumettre ma demande"}
              </Button>
            )}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default AdmissionRequest;
