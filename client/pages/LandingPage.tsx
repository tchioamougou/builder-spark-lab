import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import HeroImage from '@/assets/images/landingpageimage/group_five_african_college_students_spending_time_together_campus.jpg'
import MyFie from '@/assets/images/landingpageimage/medium-shot-health-worker-wearing-mask.jpg'
const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <LandingHeader />
     <main>
        {/* Section Héroïque (Hero Section) */}
        <section 
          className="relative bg-[#3b2c6a] text-white pt-32 pb-20 md:py-48"
          style={{ backgroundImage: `url(${HeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Superposition d'opacité */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* Bloc de texte avec fond semi-transparent */}
              <div className="md:w-1/2 p-8 bg-black/60 backdrop-blur-sm rounded-lg rounded-br-[80px] shadow-lg">
                <h2 className="heading-font text-lg font-bold mb-2">
                  École Privée de Formation des Professionels de Santé de Meingaga
                </h2>
                <h1 className="heading-font text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Formez-vous à l'excellence dans les métiers de la santé
                </h1>
                <div className="space-y-4">
                  <a href="#" className="block w-full text-center md:w-auto bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                    Demande d'adhésion
                  </a>
                  <a href="#" className="block w-full text-center md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#3b2c6a] text-white heading-font font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                    Voir nos formations
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Présentation */}
        <section id="presentation" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="md:flex items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="heading-font text-3xl md:text-4xl text-[#5d40a2] font-bold mb-4">
                  Présentation
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  École Supérieure Privée de Formation Sanitaire - Présentation du Directeur
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Reconnue par [Nom du ministère ou organisme], notre établissement offre un cadre d’apprentissage rigoureux et humain pour former les professionnels de santé de demain.
                </p>
              </div>
              <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder de lecteur vidéo YouTube */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/rhgwIhB58PA"
                    title="The Biggest Myth In Education"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Nos Filières Phares */}
        <section id="filieres" className="bg-gradient-to-br from-[#3b2c6a] to-[#2a2251] py-20 md:py-32 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-font text-3xl md:text-4xl font-bold mb-12">
              Nos Filières Phares !
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Carte Filière 1 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img src={MyFie} alt="Filière 1" className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">Aide de santé communautaire</h3>
                  <p className="text-gray-600">Nous interconnectons les systèmes et optimisons les flux de données pour garantir une infrastructure</p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {/* Carte Filière 2 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img src={MyFie} alt="Filière 2" className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">Aide de santé communautaire</h3>
                  <p className="text-gray-600">Nous interconnectons les systèmes et optimisons les flux de données pour garantir une infrastructure</p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {/* Carte Filière 3 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img src={MyFie} alt="Filière 3" className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">Aide de santé communautaire</h3>
                  <p className="text-gray-600">Nous interconnectons les systèmes et optimisons les flux de données pour garantir une infrastructure</p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Bouton "S'inscrire maintenant" */}
            <a href="#contact" className="mt-12 inline-block bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              S'inscrire maintenant
            </a>
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="testimonials" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <h2 className="heading-font text-3xl md:text-4xl text-[#5d40a2] font-bold text-center mb-12">
              Ce qu'ils disent de nous
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Témoignage 1 */}
              <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
                <p className="italic text-gray-600 mb-4">
                  "Une expérience incroyable qui a transformé ma carrière. La qualité de l'enseignement est exceptionnelle et le soutien des professeurs est inégalable."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://placehold.co/60x60/ff9900/ffffff?text=Visage" alt="Portrait de l'étudiant" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-[#5d40a2]">Jane Doe</p>
                    <p className="text-sm text-gray-500">Étudiante en Marketing</p>
                  </div>
                </div>
              </div>
              {/* Témoignage 2 */}
              <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
                <p className="italic text-gray-600 mb-4">
                  "J'ai pu développer des compétences concrètes et trouver un emploi dans une entreprise prestigieuse juste après l'obtention de mon diplôme."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://placehold.co/60x60/ff9900/ffffff?text=Visage" alt="Portrait de l'étudiant" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-[#5d40a2]">John Smith</p>
                    <p className="text-sm text-gray-500">Étudiant en Développement</p>
                  </div>
                </div>
              </div>
              {/* Témoignage 3 */}
              <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
                <p className="italic text-gray-600 mb-4">
                  "Le réseau d'anciens élèves est une véritable force. J'ai pu échanger avec des professionnels et obtenir des conseils précieux pour mon parcours."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://placehold.co/60x60/ff9900/ffffff?text=Visage" alt="Portrait de l'étudiant" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-[#5d40a2]">Marie Dubois</p>
                    <p className="text-sm text-gray-500">Étudiante en Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Statistiques */}
        <section id="numbers" className="bg-[#5d40a2] py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">+2000</span>
                <p className="mt-2 text-lg">Étudiants formés</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">+100</span>
                <p className="mt-2 text-lg">Experts professionnels</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">20</span>
                <p className="mt-2 text-lg">Partenaires</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">1</span>
                <p className="mt-2 text-lg">Campus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section La vie au campus */}
        <section id="campus" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-font text-3xl md:text-4xl text-[#3b2c6a] font-bold mb-2">
              La vie au campus
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-12"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Découvrez une communauté inspirante et dynamique. Nos étudiants évoluent dans un environnement riche en activités sociales, culturelles et sportives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Carte 1 */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg group">
                <div 
                  className="h-96 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: 'url("https://placehold.co/600x400/4f3987/ffffff?text=Bibliothèque")' }}
                ></div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="heading-font text-xl md:text-2xl font-bold mb-2">Bibliothèque universitaire</h3>
                    <p className="text-sm">Explorez un environnement propice à l'étude et à la recherche.</p>
                  </div>
                </div>
              </div>
              {/* Carte 2 */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg group">
                <div 
                  className="h-96 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: 'url("https://placehold.co/600x400/4f3987/ffffff?text=Espaces+de+vie")' }}
                ></div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="heading-font text-xl md:text-2xl font-bold mb-2">Espaces de vie</h3>
                    <p className="text-sm">Des espaces modernes conçus pour la collaboration et la détente.</p>
                  </div>
                </div>
              </div>
              {/* Carte 3 */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg group">
                <div 
                  className="h-96 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: 'url("https://placehold.co/600x400/4f3987/ffffff?text=Salle+de+conférence")' }}
                ></div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="heading-font text-xl md:text-2xl font-bold mb-2">Salle de conférence</h3>
                    <p className="text-sm">Organisez des événements et des présentations dans des salles équipées.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Infrastructures */}
        <section id="infrastructures" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-font text-3xl md:text-4xl text-[#3b2c6a] font-bold mb-2">
              Infrastructures du campus
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Carte 1 */}
              <div className="bg-[#3b2c6a] text-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>

              {/* Carte 2 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>
              
              {/* Carte 3 */}
              <div className="bg-[#3b2c6a] text-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>

              {/* Carte 4 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>

              {/* Carte 5 */}
              <div className="bg-[#3b2c6a] text-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>

              {/* Carte 6 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z"/><path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8"/>
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">Laboratoire équipé</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Nos Actualités */}
        <section id="actualites" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-[60px] md:rounded-[120px] shadow-2xl overflow-hidden md:flex items-center">
              {/* Contenu de la section actualités */}
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="heading-font text-4xl md:text-5xl font-bold text-[#3b2c6a] mb-4">
                  Nos <span className="text-[#ff9900]">Actualités</span>
                </h2>
                <a href="#" className="inline-block w-fit bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                  Découvrir
                </a>
              </div>
              {/* Image de la section actualités */}
              <div className="md:w-1/2 flex justify-end">
                <img src="https://placehold.co/600x400/fff/3b2c6a?text=Image" alt="Jeune étudiante souriante agitant la main" className="w-full md:h-full object-cover rounded-tr-[60px] md:rounded-tr-[120px] rounded-br-[60px] md:rounded-br-[120px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA (Call to Action) */}
        <section id="cta" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="bg-[#e4ddf6] rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between">
              <h3 className="heading-font text-xl md:text-2xl text-[#3b2c6a] font-bold mb-4 md:mb-0 text-center md:text-left">
                Prêt à <span className="text-[#ff9900]">commencer</span> votre parcours dans le secteur de la santé ?
              </h3>
              <a href="#" className="bg-white hover:bg-gray-200 text-[#3b2c6a] heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                conditions d'admission
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
     <LandingFooter />
    </div>
  );
};

export default LandingPage;
