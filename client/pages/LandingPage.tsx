import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LandingHeader from "../components/LandingHeader";
import LandingFooter from "../components/LandingFooter";
import HeroImage from "@/assets/images/landingpageimage/group_five_african_college_students_spending_time_together_campus.jpg";
import MyFie from "@/assets/images/landingpageimage/medium-shot-health-worker-wearing-mask.jpg";
import StudentsStudying from "@/assets/images/landingpageimage/students-studying-together-medium-shot.jpg";
import ClassroomImage from "@/assets/images/landingpageimage/close-up-students-learning-class.jpg";
import StudyGroupImage from "@/assets/images/landingpageimage/study-group-african-people.jpg";
import StudentWoman from "@/assets/images/landingpageimage/african_american_woman_wearing_student_backpack_holding_books_smiling.jpg";
import StudyGroup2 from "@/assets/images/landingpageimage/study-group-african-people (1).jpg";
import CollegeStudents from "@/assets/images/landingpageimage/college-students-different-ethnicities-cramming.jpg";
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
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Superposition d'opacité */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* Bloc de texte avec fond semi-transparent */}
              <div className="md:w-1/2 p-8 bg-black/60 backdrop-blur-sm rounded-lg rounded-br-[80px] shadow-lg">
                <h2 className="heading-font text-lg font-bold mb-2">
                  École Privée de Formation des Professionels de Santé de
                  Meingaga
                </h2>
                <h1 className="heading-font text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Transformez votre vie grâce à l'éducation en santé
                </h1>
                <div className="bg-[#ff9900] text-white px-4 py-2 rounded-full inline-block mb-4">
                  <span className="text-sm font-bold">
                    Excellence • Innovation • Engagement Communautaire
                  </span>
                </div>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block w-full text-center md:w-auto bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Demande d'adhésion
                  </a>
                  <a
                    href="#"
                    className="block w-full text-center md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#3b2c6a] text-white heading-font font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
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
                  École Supérieure Privée de Formation Sanitaire - Présentation
                  du Directeur
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Reconnue par [Nom du ministère ou organisme], notre
                  établissement offre un cadre d’apprentissage rigoureux et
                  humain pour former les professionnels de santé de demain.
                </p>
              </div>
              <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder de lecteur vidéo YouTube */}
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
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
        <section
          id="filieres"
          className="bg-gradient-to-br from-[#3b2c6a] to-[#2a2251] py-20 md:py-32 text-white"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-font text-3xl md:text-4xl font-bold mb-12">
              Nos Filières Phares !
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Carte Filière 1 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img
                  src={MyFie}
                  alt="Filière 1"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">
                    Aide de santé communautaire
                  </h3>
                  <p className="text-gray-600">
                    Nous interconnectons les systèmes et optimisons les flux de
                    données pour garantir une infrastructure
                  </p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              {/* Carte Filière 2 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img
                  src={MyFie}
                  alt="Filière 2"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">
                    Aide de santé communautaire
                  </h3>
                  <p className="text-gray-600">
                    Nous interconnectons les systèmes et optimisons les flux de
                    données pour garantir une infrastructure
                  </p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              {/* Carte Filière 3 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                <img
                  src={MyFie}
                  alt="Filière 3"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="heading-font text-xl font-semibold text-[#5d40a2] mb-1">
                    Aide de santé communautaire
                  </h3>
                  <p className="text-gray-600">
                    Nous interconnectons les systèmes et optimisons les flux de
                    données pour garantir une infrastructure
                  </p>
                </div>
                {/* Bouton Plus */}
                <button className="absolute bottom-6 right-6 p-2 rounded-full bg-[#3b2c6a] text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Bouton "S'inscrire maintenant" */}
            <a
              href="#contact"
              className="mt-12 inline-block bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              S'inscrire maintenant
            </a>
          </div>
        </section>

        {/* Section Témoignages */}
        <section
          id="testimonials"
          className="bg-gray-50 py-20 md:py-32 relative overflow-hidden"
        >
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#ff9900] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#3b2c6a] rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* En-tête de section */}
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl md:text-4xl text-[#3b2c6a] font-bold mb-2">
                Ce qu'ils <span className="text-[#ff9900]">disent de nous</span>
              </h2>
              <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Découvrez les témoignages authentiques de nos étudiants et
                diplômés qui font aujourd'hui la différence dans le secteur de
                la santé.
              </p>
            </div>

            {/* Grille des témoignages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Témoignage 1 - Étudiante en soins infirmiers */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff9900]/10 rounded-full -translate-y-10 translate-x-10"></div>

                {/* Étoiles de notation */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#ff9900] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "La formation en soins infirmiers à l'EPFPS m'a donné toutes
                  les compétences nécessaires pour réussir. Les professeurs sont
                  dévoués et les stages pratiques excellents."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={StudentWoman}
                      alt="Fatima Mballa"
                      className="w-14 h-14 rounded-full object-cover border-3 border-[#ff9900]/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ff9900] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#3b2c6a]">Fatima Mballa</p>
                    <p className="text-sm text-gray-500">
                      Diplômée en Soins Infirmiers
                    </p>
                    <p className="text-xs text-[#ff9900] font-semibold">
                      Travaille à l'Hôpital Central
                    </p>
                  </div>
                </div>
              </div>

              {/* Témoignage 2 - Étudiant en aide-soignant */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3b2c6a]/10 rounded-full -translate-y-10 translate-x-10"></div>

                {/* Étoiles de notation */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#ff9900] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "L'approche pratique de l'enseignement et l'accompagnement
                  personnalisé m'ont permis de développer ma confiance et mes
                  compétences professionnelles."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={StudyGroup2}
                      alt="Emmanuel Ngono"
                      className="w-14 h-14 rounded-full object-cover border-3 border-[#ff9900]/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ff9900] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#3b2c6a]">Emmanuel Ngono</p>
                    <p className="text-sm text-gray-500">
                      Étudiant en 3ème année
                    </p>
                    <p className="text-xs text-[#ff9900] font-semibold">
                      Spécialité Aide-soignant
                    </p>
                  </div>
                </div>
              </div>

              {/* Témoignage 3 - Diplômée en santé communautaire */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff9900]/10 rounded-full -translate-y-10 translate-x-10"></div>

                {/* Étoiles de notation */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#ff9900] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "Grâce à ma formation à l'EPFPS, je contribue maintenant à
                  améliorer la santé de ma communauté. L'école m'a donné les
                  outils pour faire la différence."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={CollegeStudents}
                      alt="Marie Tchounkeu"
                      className="w-14 h-14 rounded-full object-cover border-3 border-[#ff9900]/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ff9900] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#3b2c6a]">Marie Tchounkeu</p>
                    <p className="text-sm text-gray-500">Diplômée 2023</p>
                    <p className="text-xs text-[#ff9900] font-semibold">
                      Agent de Santé Communautaire
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section statistiques de satisfaction */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="heading-font text-2xl md:text-3xl font-bold text-[#3b2c6a] mb-4">
                  Taux de satisfaction de nos étudiants
                </h3>
                <p className="text-gray-600">
                  Basé sur une enquête de 500+ étudiants et diplômés
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Satisfaction générale */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">98%</span>
                  </div>
                  <h4 className="font-bold text-[#3b2c6a] mb-2">
                    Satisfaction générale
                  </h4>
                  <p className="text-sm text-gray-600">
                    Recommandent notre école
                  </p>
                </div>

                {/* Qualité enseignement */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#3b2c6a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">96%</span>
                  </div>
                  <h4 className="font-bold text-[#3b2c6a] mb-2">
                    Qualité enseignement
                  </h4>
                  <p className="text-sm text-gray-600">
                    Excellent niveau des cours
                  </p>
                </div>

                {/* Insertion professionnelle */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">94%</span>
                  </div>
                  <h4 className="font-bold text-[#3b2c6a] mb-2">
                    Insertion professionnelle
                  </h4>
                  <p className="text-sm text-gray-600">
                    Trouvent un emploi dans les 6 mois
                  </p>
                </div>

                {/* Accompagnement */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#3b2c6a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">97%</span>
                  </div>
                  <h4 className="font-bold text-[#3b2c6a] mb-2">
                    Accompagnement
                  </h4>
                  <p className="text-sm text-gray-600">
                    Suivi personnalisé apprécié
                  </p>
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
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">
                  +2000
                </span>
                <p className="mt-2 text-lg">Étudiants formés</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">
                  +100
                </span>
                <p className="mt-2 text-lg">Experts professionnels</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">
                  20
                </span>
                <p className="mt-2 text-lg">Partenaires</p>
              </div>
              <div>
                <span className="block heading-font text-5xl font-bold text-[#ff9900]">
                  1
                </span>
                <p className="mt-2 text-lg">Campus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section La vie au campus */}
        <section id="campus" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* En-tête de section */}
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl md:text-4xl text-[#3b2c6a] font-bold mb-2">
                La vie au <span className="text-[#ff9900]">campus</span>
              </h2>
              <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Découvrez une communauté inspirante et dynamique où nos
                étudiants évoluent dans un environnement riche en activités
                académiques, sociales et culturelles, favorisant leur
                épanouissement personnel et professionnel.
              </p>
            </div>

            {/* Grille principale des espaces */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Carte principale - Salles de cours */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl group bg-white">
                <div className="relative h-80">
                  <img
                    src={ClassroomImage}
                    alt="Étudiants en salle de cours"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#ff9900] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <span className="text-[#ff9900] text-sm font-semibold">
                        Espaces d'apprentissage
                      </span>
                    </div>
                    <h3 className="heading-font text-2xl font-bold text-white mb-2">
                      Salles de cours modernes
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Des salles équipées des dernières technologies pour un
                      apprentissage interactif et collaboratif.
                    </p>
                  </div>
                </div>
              </div>

              {/* Carte secondaire - Espaces d'étude */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl group bg-white">
                <div className="relative h-80">
                  <img
                    src={StudentsStudying}
                    alt="Étudiants en étude de groupe"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#ff9900] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-[#ff9900] text-sm font-semibold">
                        Travail collaboratif
                      </span>
                    </div>
                    <h3 className="heading-font text-2xl font-bold text-white mb-2">
                      Espaces d'étude collaboratif
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Des zones dédiées au travail en groupe et aux projets
                      collaboratifs entre étudiants.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille secondaire - Autres espaces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Bibliothèque */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#3b2c6a] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="heading-font text-lg font-bold text-[#3b2c6a] mb-3 text-center">
                  Bibliothèque
                </h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Accès à une riche collection d'ouvrages médicaux et
                  scientifiques, espaces de lecture silencieux.
                </p>
              </div>

              {/* Laboratoires */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#ff9900] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h4 className="heading-font text-lg font-bold text-[#3b2c6a] mb-3 text-center">
                  Laboratoires
                </h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Laboratoires modernes équipés pour les travaux pratiques en
                  sciences médicales et biologiques.
                </p>
              </div>

              {/* Espaces de détente */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#3b2c6a] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 015 0H17m-8 5a5 5 0 1110 0H9z"
                    />
                  </svg>
                </div>
                <h4 className="heading-font text-lg font-bold text-[#3b2c6a] mb-3 text-center">
                  Espaces de détente
                </h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Zones de repos et de socialisation pour favoriser les échanges
                  entre étudiants.
                </p>
              </div>
            </div>

            {/* Section témoignage étudiant */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <img
                    src={StudyGroupImage}
                    alt="Témoignage étudiant"
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#ff9900] rounded-full"></div>
                    <span className="text-[#ff9900] font-semibold text-sm">
                      TÉMOIGNAGE ÉTUDIANT
                    </span>
                  </div>
                  <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                    "L'ambiance au campus est exceptionnelle. Les espaces sont
                    modernes, les professeurs sont disponibles et l'esprit de
                    collaboration entre étudiants nous pousse à donner le
                    meilleur de nous-mêmes chaque jour."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3b2c6a] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AM</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#3b2c6a]">Amina Moussa</p>
                      <p className="text-gray-500 text-sm">
                        Étudiante en 2ème année - Aide-soignante
                      </p>
                    </div>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>

              {/* Carte 2 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>

              {/* Carte 3 */}
              <div className="bg-[#3b2c6a] text-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>

              {/* Carte 4 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>

              {/* Carte 5 */}
              <div className="bg-[#3b2c6a] text-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>

              {/* Carte 6 */}
              <div className="bg-gray-200 text-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff9900"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0114 0 7 7 0 01-14 0z" />
                    <path d="M10 16v6m0-6h6m-6 0v-6m0 0l-8-8" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold mb-2">
                  Laboratoire équipé
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Nos Actualités */}
        <section id="actualites" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* En-tête de la section */}
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl md:text-4xl text-[#3b2c6a] font-bold mb-2">
                Nos <span className="text-[#ff9900]">Actualités</span>
              </h2>
              <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Restez informés des dernières nouvelles, événements et
                développements de notre école de formation sanitaire.
              </p>
            </div>

            {/* Grille des actualités */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Article 1 */}
              <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={HeroImage}
                    alt="Nouvelle formation en soins d'urgence"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#ff9900] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nouveau
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>15 Janvier 2024</span>
                    <span className="mx-2">•</span>
                    <span>Formation</span>
                  </div>
                  <h3 className="heading-font text-xl font-bold text-[#3b2c6a] mb-3">
                    Nouvelle formation en soins d'urgence
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Découvrez notre nouveau programme de formation spécialisé
                    dans les soins d'urgence, conçu pour répondre aux besoins
                    croissants du secteur de la santé...
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-[#ff9900] font-semibold hover:text-[#e68a00] transition-colors"
                  >
                    Lire la suite
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </article>

              {/* Article 2 */}
              <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={MyFie}
                    alt="Partenariat avec l'hôpital régional"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#3b2c6a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Partenariat
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>10 Janvier 2024</span>
                    <span className="mx-2">•</span>
                    <span>Actualités</span>
                  </div>
                  <h3 className="heading-font text-xl font-bold text-[#3b2c6a] mb-3">
                    Partenariat avec l'hôpital régional
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Notre école renforce ses liens avec l'hôpital régional pour
                    offrir de meilleures opportunités de stage pratique à nos
                    étudiants...
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-[#ff9900] font-semibold hover:text-[#e68a00] transition-colors"
                  >
                    Lire la suite
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </article>

              {/* Article 3 */}
              <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={HeroImage}
                    alt="Cérémonie de remise des diplômes"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Événement
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>5 Janvier 2024</span>
                    <span className="mx-2">•</span>
                    <span>Événements</span>
                  </div>
                  <h3 className="heading-font text-xl font-bold text-[#3b2c6a] mb-3">
                    Cérémonie de remise des diplômes 2023
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Félicitations à nos 150 nouveaux diplômés qui rejoignent le
                    secteur de la santé avec excellence et dévouement...
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-[#ff9900] font-semibold hover:text-[#e68a00] transition-colors"
                  >
                    Lire la suite
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            </div>

            {/* Bouton pour voir toutes les actualités */}
            <div className="text-center">
              <a
                href="#"
                className="inline-block bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Voir toutes les actualités
              </a>
            </div>
          </div>
        </section>

        {/* Section CTA (Call to Action) */}
        <section
          id="cta"
          className="py-20 md:py-32 bg-gradient-to-br from-[#3b2c6a] to-[#2a2251] relative overflow-hidden"
        >
          {/* Éléments décoratifs de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#ff9900] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#ff9900] rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="heading-font text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Prêt à <span className="text-[#ff9900]">commencer</span> votre
                parcours
                <br />
                dans le secteur de la{" "}
                <span className="text-[#ff9900]">santé</span> ?
              </h2>
              <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Rejoignez notre communauté d'étudiants passionnés et
                préparez-vous à faire la différence dans le monde de la santé.
                Votre avenir commence ici !
              </p>
            </div>

            {/* Actions principales */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a
                href="#"
                className="bg-[#ff9900] hover:bg-[#e68a00] text-white heading-font font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Demande d'admission
              </a>
              <a
                href="#"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#3b2c6a] text-white heading-font font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Conditions d'admission
              </a>
            </div>

            {/* Informations de contact rapide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Contact téléphonique */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold mb-2">Appelez-nous</h4>
                  <p className="text-gray-200 text-sm">+237 6XX XXX XXX</p>
                  <p className="text-gray-200 text-sm">Lun-Ven 8h-17h</p>
                </div>
              </div>

              {/* Visite du campus */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold mb-2">
                    Visitez le campus
                  </h4>
                  <p className="text-gray-200 text-sm">Meiganga, Cameroun</p>
                  <p className="text-gray-200 text-sm">
                    Visites guidées disponibles
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold mb-2">Écrivez-nous</h4>
                  <p className="text-gray-200 text-sm">contact@epfps.cm</p>
                  <p className="text-gray-200 text-sm">Réponse sous 24h</p>
                </div>
              </div>
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
