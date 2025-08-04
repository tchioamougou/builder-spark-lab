// PDF generation utilities for student portal

export const generateBulletinPDF = (studentData: any) => {
  // Simulate PDF generation
  const pdfContent = `
    BULLETIN DE NOTES
    =================
    
    Étudiant: ${studentData.nom}
    Numéro: ${studentData.numeroEtudiant}
    Filière: ${studentData.filiere} ${studentData.niveau}
    
    NOTES SÉQUENCE 1:
    - Anatomie générale: 15.5/20 (Coef. 3)
    - Chimie organique: 13.2/20 (Coef. 2)
    - Physiologie: 16.8/20 (Coef. 3)
    
    Moyenne générale: 15.2/20
    Rang: 8/45
    Mention: Bien
    
    Crédits obtenus: 16/30 ECTS
  `;
  
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bulletin_${studentData.numeroEtudiant}_S1.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateSchedulePDF = (scheduleData: any[], studentData: any) => {
  const scheduleText = scheduleData.map(item => 
    `${item.day} ${item.time}: ${item.subject} (${item.room}) - ${item.teacher}`
  ).join('\n');
  
  const pdfContent = `
    EMPLOI DU TEMPS
    ===============
    
    Étudiant: ${studentData.nom}
    Filière: ${studentData.filiere} ${studentData.niveau}
    Semaine du 22-26 Janvier 2024
    
    ${scheduleText}
  `;
  
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `emploi_du_temps_${studentData.numeroEtudiant}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateGradesPDF = (gradesData: any[], studentData: any) => {
  const gradesText = gradesData.map(grade => 
    `${grade.ue}: ${grade.noteFinale || 'En cours'}/20 (Coef. ${grade.coefficient})`
  ).join('\n');
  
  const pdfContent = `
    RELEVÉ DE NOTES DÉTAILLÉ
    =======================
    
    Étudiant: ${studentData.nom}
    Numéro: ${studentData.numeroEtudiant}
    Filière: ${studentData.filiere} ${studentData.niveau}
    
    DÉTAIL DES NOTES:
    ${gradesText}
    
    Moyenne générale: 15.2/20
    Crédits validés: 16/30 ECTS
  `;
  
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `releve_notes_${studentData.numeroEtudiant}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateDocumentsList = (documentsData: any[], studentData: any) => {
  const docsText = documentsData.map(doc => 
    `- ${doc.nom} (${doc.type}) - ${doc.statut} - ${doc.dateCreation}`
  ).join('\n');
  
  const pdfContent = `
    LISTE DES DOCUMENTS
    ==================
    
    Étudiant: ${studentData.nom}
    Numéro: ${studentData.numeroEtudiant}
    
    DOCUMENTS:
    ${docsText}
  `;
  
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `liste_documents_${studentData.numeroEtudiant}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
