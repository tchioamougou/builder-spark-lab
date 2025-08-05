import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateBulletinPDF } from "@/lib/pdf-utils";
import AbsenceRequestDialog from "@/components/AbsenceRequestDialog";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Home,
  FileText,
  Calendar,
  User,
  Bell,
  Settings,
  LogOut,
  BookOpen,
  Download,
  Upload,
  MessageSquare,
  Clock,
  GraduationCap,
  ChevronDown,
  Search,
} from "lucide-react";

interface StudentLayoutProps {
  children: ReactNode;
}

const getStudentNavigation = (t: any) => [
  {
    name: t("navigation.studentDashboard"),
    href: "/student/dashboard",
    icon: Home,
  },
  { name: t("common.grades"), href: "/student/grades", icon: FileText },
  { name: t("common.schedule"), href: "/student/schedule", icon: Calendar },
  { name: t("common.documents"), href: "/student/documents", icon: Download },
  { name: t("common.requests"), href: "/student/requests", icon: Upload },
  {
    name: t("common.messages"),
    href: "/student/messages",
    icon: MessageSquare,
  },
  { name: t("common.profile"), href: "/student/profile", icon: User },
];

export default function StudentLayout({ children }: StudentLayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleDownloadBulletin = () => {
    if (user) {
      generateBulletinPDF(user);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/95 via-primary to-primary/90 shadow-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 md:h-20 justify-between items-center min-w-0">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/student/dashboard" className="flex items-center">
                <div className="flex items-center bg-white/15 p-2 rounded-full shadow-md border border-white/10">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="ml-3 flex flex-col">
                  <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    EP<span className="text-amber-300">FPS</span>
                  </h1>
                  <span className="text-[10px] text-white/60 -mt-1 tracking-wider uppercase hidden md:inline-block">
                    Espace étudiant • {new Date().getFullYear()}
                  </span>
                </div>
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-1 md:space-x-3 flex-shrink-0">
              {/* Search button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 h-9"
              >
                <Search className="h-4 w-4 mr-2" />
                <span className="text-xs">{t("common.search")}...</span>
              </Button>

              {/* Notifications dropdown */}
              <div className="relative" ref={notificationRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-white/10 hover:bg-white/20 text-white rounded-full p-2 h-9 w-9"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-amber-500 text-[10px] text-white font-bold rounded-full shadow-sm border border-white/20">
                    2
                  </span>
                </Button>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {t("common.notifications")}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                        2 nouvelles
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 border-l-4 border-blue-500">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              Nouvelle note disponible
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Il y a 1 heure
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 border-l-4 border-green-500">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-1.5 rounded-full mr-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              Cours annulé demain
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Il y a 3 heures
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User profile dropdown */}
              <div className="relative" ref={userMenuRef}>
                <div 
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 p-1.5 rounded-full cursor-pointer pr-3"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <Avatar className="h-7 w-7 border-2 border-white/30">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary-foreground text-primary font-medium text-xs">
                      {user?.nom
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-white flex items-center">
                      {user?.nom}
                      <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                    </div>
                    <div className="text-[10px] text-white/70 capitalize -mt-0.5">
                      {user?.numeroEtudiant} • {user?.filiere}
                    </div>
                  </div>
                </div>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.nom}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user?.numeroEtudiant} • {user?.filiere} {user?.niveau}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/student/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.profile")}
                      </Link>
                      <Link
                        to="/student/messages"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.messages")}
                      </Link>
                      <Link
                        to="/student/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                        {t("common.settings")}
                      </Link>
                    </div>
                    <div className="py-1 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-red-500" />
                        {t("common.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Language switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 bg-gradient-to-b from-gray-50 to-white shadow-lg h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/50">
          <div className="p-4">
            {/* Quick Stats with futuristic design */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-amber-50 rounded-xl border border-primary/20 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                {t("student.academicStatus")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">{t("common.grades")}:</span>
                  <span className="font-bold text-primary">14.5/20</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">
                    {t("programs.credits")}:
                  </span>
                  <span className="font-bold text-blue-600">45/60</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span className="text-gray-600">
                    {t("student.financialStatus")}:
                  </span>
                  <span className="font-bold text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    {t("status.upToDate")}
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-1">
              {getStudentNavigation(t).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-md",
                      )}
                    >
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-white/20"
                            : "bg-gray-100 group-hover:bg-primary/10",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive
                              ? "text-white"
                              : "text-gray-600 group-hover:text-primary",
                          )}
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions with enhanced design */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <div className="w-1 h-1 bg-amber-400 rounded-full mr-2"></div>
                {t("common.quickActions")}
              </h3>
              <div className="space-y-3">
                <AbsenceRequestDialog
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-orange-800 shadow-sm"
                    >
                      <div className="p-1 bg-orange-100 rounded-lg mr-2">
                        <Clock className="h-3 w-3 text-orange-600" />
                      </div>
                      {t("student.requestAbsence")}
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 text-blue-700 hover:text-blue-800 shadow-sm"
                  onClick={handleDownloadBulletin}
                >
                  <div className="p-1 bg-blue-100 rounded-lg mr-2">
                    <Download className="h-3 w-3 text-blue-600" />
                  </div>
                  {t("common.download")} bulletin
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
