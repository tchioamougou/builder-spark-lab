import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#3b2c6a] text-white pt-20 pb-12 overflow-hidden">
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('https://placehold.co/1920x1080/4f3987/ffffff?text=Background+Pattern')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          {/* Colonne 1: Logo, nom de l'école et réseaux sociaux */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              {/* Remplacer le "src" de l'image ci-dessous par l'URL de votre logo */}
              <img src="uploaded:image 3.png-c5304d96-7bd6-44a4-a292-d88c73295c6e" alt="Logo de l'école" className="h-14 w-auto mr-4" />
              <h4 className="font-semibold text-lg heading-font">
                École privée de formation des professionnels de santé
              </h4>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="p-3 bg-white/20 rounded-full hover:bg-[#ff9900] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="p-3 bg-white/20 rounded-full hover:bg-[#ff9900] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37a4 4 0 11-8 0 4 4 0 018 0z"/><path d="M17.5 6.5h.01"/></svg>
              </a>
              <a href="#" aria-label="Email" className="p-3 bg-white/20 rounded-full hover:bg-[#ff9900] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
          {/* Colonne 2: Coordonnées */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-[#ff9900]">Coordonnées</h4>
            <p className="text-sm">Adamawa</p>
            <p className="text-sm mt-2">Tél : xxx xxx xxx / xxx xxx xxx</p>
            <p className="text-sm">Mail : xxxxxxx@xxx.com</p>
          </div>
          {/* Colonne 3: Liens de navigation 1 */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-[#ff9900]">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">{t('Accueil')}</Link></li>
              <li><a href="#" className="hover:underline">{t('À propos')}</a></li>
              <li><a href="#" className="hover:underline">{t('Formations')}</a></li>
              <li><a href="#" className="hover:underline">{t('Admissions')}</a></li>
            </ul>
          </div>
          {/* Colonne 4: Liens de navigation 2 */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-[#ff9900]">Plus</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">{t('Actualités')}</a></li>
              <li><a href="#" className="hover:underline">{t('FAQ')}</a></li>
              <li><a href="#" className="hover:underline">{t('Recrutement')}</a></li>
              <li><a href="#" className="hover:underline">{t('Contacts')}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-gray-300 border-t border-gray-700 pt-8">
          <p>© {new Date().getFullYear()} Nom de l'école. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;