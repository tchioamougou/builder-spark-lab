import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoEcole from '@/assets/images/landingpageimage/Logo de EPFPS.png';
import HeroImage from '@/assets/images/landingpageimage/group_five_african_college_students_spending_time_together_campus.jpg';

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#3b2c6a] text-white pt-20 pb-12 overflow-hidden">
      {/* Background avec image de l'école et overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      <div className="absolute inset-0 bg-[#3b2c6a]/85 z-0"></div>

      {/* Éléments décoratifs */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#ff9900] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#ff9900] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          {/* Colonne 1: Logo, nom de l'école et réseaux sociaux */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-white rounded-2xl p-3 mr-4 shadow-lg">
                <img src={LogoEcole} alt="Logo EPFPS" className="h-16 w-auto" />
              </div>
              <div>
                <h4 className="font-bold text-xl heading-font text-white leading-tight">
                  École Privée de Formation des
                </h4>
                <h4 className="font-bold text-xl heading-font text-[#ff9900] leading-tight">
                  Professionnels de Santé
                </h4>
                <p className="text-sm text-gray-200 mt-1">Meiganga</p>
              </div>
            </div>
            <p className="text-gray-200 mb-6 text-sm leading-relaxed">
              Former les professionnels de santé de demain avec excellence, rigueur et humanité.
              Votre avenir dans le secteur de la santé commence ici.
            </p>
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
