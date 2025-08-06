// Service de gestion des demandes d'admission
interface AdmissionRequest {
  id: string;
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

  // Métadonnées
  dateSubmission: string;
  statut: 'en_attente' | 'en_cours' | 'accepte' | 'refuse';
  notes?: string;
}

const STORAGE_KEY = 'admission_requests';

export class AdmissionStorage {
  // Sauvegarder une nouvelle demande
  static saveAdmissionRequest(requestData: Omit<AdmissionRequest, 'id' | 'dateSubmission' | 'statut'>): string {
    const requests = this.getAllRequests();
    const newRequest: AdmissionRequest = {
      ...requestData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      dateSubmission: new Date().toISOString(),
      statut: 'en_attente'
    };
    
    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return newRequest.id;
  }

  // Récupérer toutes les demandes
  static getAllRequests(): AdmissionRequest[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      return [];
    }
  }

  // Récupérer une demande par ID
  static getRequestById(id: string): AdmissionRequest | null {
    const requests = this.getAllRequests();
    return requests.find(req => req.id === id) || null;
  }

  // Mettre à jour le statut d'une demande
  static updateRequestStatus(id: string, statut: AdmissionRequest['statut'], notes?: string): boolean {
    const requests = this.getAllRequests();
    const index = requests.findIndex(req => req.id === id);
    
    if (index !== -1) {
      requests[index].statut = statut;
      if (notes !== undefined) {
        requests[index].notes = notes;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
      return true;
    }
    return false;
  }

  // Supprimer une demande
  static deleteRequest(id: string): boolean {
    const requests = this.getAllRequests();
    const filteredRequests = requests.filter(req => req.id !== id);
    
    if (filteredRequests.length !== requests.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRequests));
      return true;
    }
    return false;
  }

  // Obtenir les statistiques des demandes
  static getStatistics() {
    const requests = this.getAllRequests();
    return {
      total: requests.length,
      en_attente: requests.filter(r => r.statut === 'en_attente').length,
      en_cours: requests.filter(r => r.statut === 'en_cours').length,
      accepte: requests.filter(r => r.statut === 'accepte').length,
      refuse: requests.filter(r => r.statut === 'refuse').length,
    };
  }

  // Exporter toutes les demandes (pour sauvegarde)
  static exportRequests(): string {
    const requests = this.getAllRequests();
    return JSON.stringify(requests, null, 2);
  }

  // Importer des demandes (pour restauration)
  static importRequests(jsonData: string): boolean {
    try {
      const requests = JSON.parse(jsonData);
      if (Array.isArray(requests)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      return false;
    }
  }
}

export type { AdmissionRequest };
