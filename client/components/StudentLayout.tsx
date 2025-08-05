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
} from "lucide-react";

interface StudentLayoutProps {
  children: ReactNode;
}

const getStudentNavigation = (t: any) => [
  { name: t('navigation.studentDashboard'), href: "/student/dashboard", icon: Home },
  { name: t('common.grades'), href: "/student/grades", icon: FileText },
  { name: t('common.schedule'), href: "/student/schedule", icon: Calendar },
  { name: t('common.documents'), href: "/student/documents", icon: Download },
  { name: t('common.requests'), href: "/student/requests", icon: Upload },
  { name: t('common.messages'), href: "/student/messages", icon: MessageSquare },
  { name: t('common.profile'), href: "/student/profile", icon: User },
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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">
                  {t('navigation.studentDashboard')}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700">
                    {user?.nom}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.numeroEtudiant}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.filiere} {user?.niveau}
                  </div>
                </div>
              </div>

              {/* Language switcher */}
              <LanguageSwitcher />

              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">{t('common.logout')}</span>
              </Button>
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
                {t('student.academicStatus')}
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('common.grades')}:</span>
                  <span className="font-medium">14.5/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('programs.credits')}:</span>
                  <span className="font-medium">45/60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('student.financialStatus')}:</span>
                  <span className="font-medium text-green-600">{t('status.upToDate')}</span>
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
                {t('common.quickActions')}
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
                      {t('student.requestAbsence')}
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
                  {t('common.download')} bulletin
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
