import jsPDF from "jspdf";

interface StudentData {
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
  region: string;
  arrondissement: string;
  departement: string;
  village: string;
  niveauEnseignement: string;
  ethnie: string;
  situationMatrimoniale: string;
  nomEpoux: string;
  contactEpoux: string;
  numeroCNI: string;
  formation: string;
  niveauEtude: string;
  etablissementOrigine: string;
  matriculeConcours: string;
}

export const generateAdmissionPDF = (data: StudentData): void => {
  const doc = new jsPDF();

  // Configuration des polices
  doc.setFont("helvetica");

  // En-tête officiel
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  // Côté gauche
  doc.text("RÉPUBLIQUE DU CAMEROUN", 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text("Paix - Travail - Patrie", 20, 25);
  doc.setFont("helvetica", "bold");
  doc.text("MINISTÈRE DE LA SANTÉ PUBLIQUE", 20, 35);
  doc.setFont("helvetica", "normal");
  doc.text("SECRÉTARIAT GÉNÉRAL", 20, 40);
  doc.text("DIRECTION DES RESSOURCES HUMAINES", 20, 50);
  doc.text("SOUS-DIRECTION DU DÉVELOPPEMENT DES", 20, 55);
  doc.text("RESSOURCES HUMAINES", 20, 60);
  doc.setFont("helvetica", "bold");
  doc.text("ÉCOLE PRIVÉE DE FORMATION DES", 20, 70);
  doc.text("PROFESSIONNELS DE LA SANTÉ DE MEIGANGA", 20, 75);

  // Côté droit
  doc.setFont("helvetica", "bold");
  doc.text("REPUBLIC OF CAMEROON", 130, 20);
  doc.setFont("helvetica", "normal");
  doc.text("Peace - Work - Fatherland", 130, 25);
  doc.setFont("helvetica", "bold");
  doc.text("MINISTRY OF PUBLIC HEALTH", 130, 35);
  doc.setFont("helvetica", "normal");
  doc.text("GENERAL SECRETARIAT", 130, 40);
  doc.text("DEPARTMENT OF HUMAN DEVELOPMENT OF HUMANS", 130, 50);
  doc.text("RESOURCES", 130, 55);
  doc.text("SUB DEPARTMENT OF DEVELOPMENT OF HUMAN", 130, 60);
  doc.text("RESOURCES", 130, 65);
  doc.setFont("helvetica", "bold");
  doc.text("PRIVATE TRAINING SCHOOL FOR HEALTH", 130, 70);
  doc.text("PROFESSIONALS OF MEIGANGA", 130, 75);

  // Logo central (cercle)
  doc.circle(105, 50, 15);
  doc.setFontSize(8);
  doc.text("LOGO", 100, 52);

  // Ligne de séparation
  doc.line(20, 85, 190, 85);

  // Titre principal
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("FICHE DE RENSEIGNEMENTS", 105, 100, { align: "center" });

  // Contenu du formulaire
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  let yPos = 120;

  // Informations personnelles
  doc.text(`Nom : ${data.nom}`, 20, yPos);
  yPos += 7;
  doc.text(`Prénom : ${data.prenom}`, 20, yPos);
  yPos += 7;
  doc.text(`Date de naissance : ${data.dateNaissance}`, 20, yPos);
  yPos += 7;
  doc.text(`Lieu de naissance : ${data.lieuNaissance}`, 20, yPos);
  yPos += 7;
  doc.text(`Nom et prénom du père : ${data.nomPere}`, 20, yPos);
  yPos += 7;
  doc.text(`Contact du père : ${data.contactPere}`, 20, yPos);
  yPos += 7;
  doc.text(`Nom et prénom de la mère : ${data.nomMere}`, 20, yPos);
  yPos += 7;
  doc.text(`Contact du père : ${data.contactMere}`, 20, yPos);
  yPos += 7;
  doc.text(`Nom du tuteur : ${data.nomTuteur}`, 20, yPos);
  yPos += 7;
  doc.text(`Adresse et contact du tuteur : ${data.adresseTuteur}`, 20, yPos);
  yPos += 10;

  // Origine du candidat
  doc.setFont("helvetica", "bold");
  doc.text("Origine du candidat", 20, yPos);
  doc.setFont("helvetica", "normal");
  yPos += 7;
  doc.text(`1- Région : ${data.region}`, 25, yPos);
  yPos += 7;
  doc.text(`2- Arrondissement : ${data.arrondissement}`, 25, yPos);
  yPos += 7;
  doc.text(`3- Département : ${data.departement}`, 25, yPos);
  yPos += 7;
  doc.text(`4- Village : ${data.village}`, 25, yPos);
  yPos += 10;

  // Informations complémentaires
  doc.text(
    `Niveau d'enseignement général : ${data.niveauEnseignement}`,
    20,
    yPos,
  );
  yPos += 7;
  doc.text(`Ethnie : ${data.ethnie}`, 20, yPos);
  yPos += 7;
  doc.text(`Situation matrimoniale : ${data.situationMatrimoniale}`, 20, yPos);
  yPos += 7;
  doc.text(`Nom de l'époux ou épouse si marié(e) : ${data.nomEpoux}`, 20, yPos);
  yPos += 7;
  doc.text(`Contact de l'époux ou épouse : ${data.contactEpoux}`, 20, yPos);
  yPos += 7;
  doc.text(`Numéro CNI du candidat : ${data.numeroCNI}`, 20, yPos);
  yPos += 10;

  // Formation souhaitée
  doc.setFont("helvetica", "bold");
  doc.text(`Formation souhaitée : ${data.formation}`, 20, yPos);
  doc.setFont("helvetica", "normal");
  yPos += 7;
  doc.text(`Niveau d'étude : ${data.niveauEtude}`, 20, yPos);
  yPos += 7;
  doc.text(`Établissement d'origine : ${data.etablissementOrigine}`, 20, yPos);
  yPos += 7;
  doc.text(`Matricule de concours : ${data.matriculeConcours}`, 20, yPos);

  // Espace pour la photo
  doc.rect(140, 180, 40, 50);
  doc.setFontSize(8);
  doc.text("Espace réservé", 155, 200, { align: "center" });
  doc.text("à la photo", 155, 207, { align: "center" });

  // Pied de page
  doc.setFontSize(8);
  doc.text(
    "Web site: www.efpps-edu.org  E-mail: info@efpps-edu.org  P.O. Box: 100  Tel: +237699475876",
    105,
    270,
    { align: "center" },
  );
  doc.setFont("helvetica", "bold");
  doc.text(
    `Autorisation N° Décision N° 2523/D/MINSANTE/SG/DRH of the 2nd of August 2021`,
    105,
    280,
    { align: "center" },
  );

  // Date de génération
  const today = new Date().toLocaleDateString("fr-FR");
  doc.text(`Document généré le ${today}`, 20, 290);

  // Télécharger le PDF
  doc.save(`Fiche_Renseignements_${data.nom}_${data.prenom}.pdf`);
};

export const generateConfirmationPDF = (data: StudentData): void => {
  const doc = new jsPDF();

  // En-tête simplifié
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIRMATION D'INSCRIPTION", 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    "École Privée de Formation des Professionnels de la Santé de Meiganga",
    105,
    45,
    { align: "center" },
  );

  // Ligne de séparation
  doc.line(20, 55, 190, 55);

  // Contenu
  doc.setFontSize(11);
  let yPos = 80;

  doc.text("Madame, Monsieur,", 20, yPos);
  yPos += 15;

  doc.text(
    "Nous accusons réception de votre demande d'admission pour la formation :",
    20,
    yPos,
  );
  yPos += 10;

  doc.setFont("helvetica", "bold");
  const formationNames: { [key: string]: string } = {
    "aide-soignant": "Aide-Soignant(e)",
    "infirmier-ide": "Infirmier(ère) Diplômé(e) d'État",
    "agent-sante-communautaire": "Agent de Santé Communautaire",
    "sage-femme": "Sage-Femme",
    "technicien-labo": "Technicien de Laboratoire",
  };

  doc.text(`• ${formationNames[data.formation] || data.formation}`, 30, yPos);
  yPos += 15;

  doc.setFont("helvetica", "normal");
  doc.text("Candidat(e) :", 20, yPos);
  yPos += 8;
  doc.text(`• Nom et Prénom : ${data.prenom} ${data.nom}`, 30, yPos);
  yPos += 8;
  doc.text(`• Date de naissance : ${data.dateNaissance}`, 30, yPos);
  yPos += 8;
  doc.text(`• Lieu de naissance : ${data.lieuNaissance}`, 30, yPos);
  yPos += 15;

  doc.text(
    "Votre dossier est actuellement en cours de traitement. Vous recevrez une notification",
    20,
    yPos,
  );
  yPos += 8;
  doc.text(
    "concernant la suite de la procédure dans les plus brefs délais.",
    20,
    yPos,
  );
  yPos += 20;

  doc.text("Documents fournis :", 20, yPos);
  yPos += 8;
  doc.text("✓ Fiche de renseignements complétée", 30, yPos);
  yPos += 6;
  doc.text("✓ Photos d'identité (recto/verso)", 30, yPos);
  yPos += 6;
  doc.text("✓ Photo 4x4", 30, yPos);
  yPos += 20;

  doc.text("Cordialement,", 20, yPos);
  yPos += 15;
  doc.setFont("helvetica", "bold");
  doc.text("L'Administration de l'EPFPS", 20, yPos);

  // Date de génération
  const today = new Date().toLocaleDateString("fr-FR");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Document généré le ${today}`, 150, 280);

  // Télécharger le PDF
  doc.save(`Confirmation_Inscription_${data.nom}_${data.prenom}.pdf`);
};
