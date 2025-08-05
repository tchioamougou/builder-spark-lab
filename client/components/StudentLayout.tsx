import { ReactNode } from "react";
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

  const handleDownloadBulletin = () => {
    if (user) {
      generateBulletinPDF(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/95 via-primary to-primary/90 shadow-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 justify-between items-center">
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
            <div className="flex items-center space-x-1 md:space-x-3 overflow-x-auto">
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
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-white/10 hover:bg-white/20 text-white rounded-full p-2 h-9 w-9"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-amber-500 text-[10px] text-white font-bold rounded-full shadow-sm border border-white/20">
                    2
                  </span>
                </Button>
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible border border-gray-100">
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
              </div>

              {/* User profile dropdown */}
              <div className="relative group">
                <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 p-1.5 rounded-full cursor-pointer pr-3">
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
                <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible border border-gray-100">
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
                    >
                      <User className="h-4 w-4 mr-3 text-gray-400" />
                      {t("common.profile")}
                    </Link>
                    <Link
                      to="/student/messages"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-3 text-gray-400" />
                      {t("common.messages")}
                    </Link>
                    <Link
                      to="/student/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4 mr-3 text-gray-400" />
                      {t("common.settings")}
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-red-500" />
                      {t("common.logout")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Language switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 bg-white shadow-sm h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto border-b lg:border-b-0 lg:border-r">
          <div className="p-4">
            {/* Quick Stats */}
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {t("student.academicStatus")}
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("common.grades")}:</span>
                  <span className="font-medium">14.5/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("programs.credits")}:
                  </span>
                  <span className="font-medium">45/60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("student.financialStatus")}:
                  </span>
                  <span className="font-medium text-green-600">
                    {t("status.upToDate")}
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-2">
              {getStudentNavigation(t).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {t("common.quickActions")}
              </h3>
              <div className="space-y-2">
                <AbsenceRequestDialog
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {t("student.requestAbsence")}
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleDownloadBulletin}
                >
                  <Download className="h-4 w-4 mr-2" />
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
