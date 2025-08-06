import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/assets/images/landingpageimage/Logo de EPFPS.png"; // Import the image

const LandingHeader = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#3b2c6a]/80 backdrop-blur-sm shadow-md" : "bg-[#3b2c6a shadow-none"}`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-xl font-bold heading-font flex items-center">
          <img src={Logo} alt="Logo EPFPS" className="h-10 w-auto mr-2" />
          <span className="hidden md:block">EPFPS</span>
        </div>
        {/* Liens de navigation */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-200 font-medium">
          <Link
            to="/"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.home")}
          </Link>
          <Link
            to="/about"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.about")}
          </Link>
          <Link
            to="/formations"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.formations")}
          </Link>
          <Link
            to="/admissions"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.admissions")}
          </Link>
          <Link
            to="/actualites"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.news")}
          </Link>
          <Link
            to="/faq"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.faq")}
          </Link>
          <Link
            to="/recrutement"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.recruitment")}
          </Link>
          <Link
            to="/contacts"
            className="hover:text-[#ff9900] transition-colors duration-300"
          >
            {t("pages.contact")}
          </Link>
          <Link
            to="/login"
            className="bg-[#ff9900] hover:bg-[#e68a00] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm"
          >
            {t("common.clientArea")}
          </Link>
          <LanguageSwitcher />
        </div>
        {/* Bouton pour la version mobile */}
        <button className="lg:hidden p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-white">
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default LandingHeader;
