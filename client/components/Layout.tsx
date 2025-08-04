import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  Settings,
  Home,
  FileText,
  UserCog,
  UserCheck,
  Building2,
  Bell,
  LogOut,
  Search,
  UserPlus,
  CheckCircle,
  ChevronRight,
  User,
  MessageSquare,
  ChevronDown
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const getNavigation = (t: any) => [
  { name: t('common.dashboard'), href: "/", icon: Home },
  { name: t('common.users'), href: "/users", icon: Users },
  { name: t('common.programs'), href: "/programs", icon: BookOpen },
  { name: t('common.academicYears'), href: "/academic-years", icon: Calendar },
  { name: t('common.teachers'), href: "/teachers", icon: GraduationCap },
  { name: t('common.students'), href: "/students", icon: UserCog },
  { name: t('common.courseAssignment'), href: "/course-assignment", icon: UserCheck },
  { name: t('common.files'), href: "/files", icon: FileText },
  { name: t('common.administration'), href: "/admin", icon: Building2 },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/95 via-primary to-primary/90 shadow-lg border-b border-primary/20 sticky top-0 z-50 backdrop-blur-sm">
        {/* Top notification banner - can be conditionally rendered */}
        <div className="bg-amber-500/90 py-1 px-4 text-center text-xs md:text-sm font-medium text-white hidden">
          {t('common.semester2')} {t('dates.today')}
        </div>
        
        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="flex items-center bg-white/15 backdrop-blur-sm p-2 rounded-full shadow-md border border-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="ml-3 flex flex-col">
                  <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    Edu<span className="text-white/90">Manage</span>
                    <span className="text-amber-300 font-light">Pro</span>
                  </h1>
                  <span className="text-[10px] text-white/60 -mt-1 tracking-wider uppercase hidden md:inline-block">
                    {t('common.academics')} {new Date().getFullYear()}
                  </span>
                </div>
              </Link>
            
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-1 md:space-x-3">
              {/* Search button */}
              <Button variant="ghost" size="sm" className="hidden md:flex items-center bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 h-9">
                <Search className="h-4 w-4 mr-2" />
                <span className="text-xs">{t('common.search')}...</span>
              </Button>
              
              {/* Notifications dropdown */}
              <div className="relative group">
                <Button variant="ghost" size="sm" className="relative bg-white/10 hover:bg-white/20 text-white rounded-full p-2 h-9 w-9">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-amber-500 text-[10px] text-white font-bold rounded-full shadow-sm border border-white/20">3</span>
                </Button>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right invisible group-hover:visible border border-gray-100">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-700">{t('common.notifications')}</h3>
                    <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">3 {t('common.new')}</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 transition-colors border-l-4 border-amber-500">
                      <div className="flex items-start">
                        <div className="bg-amber-100 p-1.5 rounded-full mr-3">
                          <UserPlus className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{t('student.newEnrollmentValidated')}</p>
                          <p className="text-xs text-gray-500 mt-1">{t('dates.hoursAgo', { count: 2 })}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 transition-colors border-l-4 border-blue-500">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{t('student.absenceRequestPending')}</p>
                          <p className="text-xs text-gray-500 mt-1">{t('dates.hoursAgo', { count: 4 })}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 transition-colors border-l-4 border-green-500">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-1.5 rounded-full mr-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{t('teacher.teacherApplicationApproved')}</p>
                          <p className="text-xs text-gray-500 mt-1">{t('dates.daysAgo', { count: 1 })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <Link to="/notifications" className="text-xs font-medium text-primary hover:text-primary/80 flex items-center">
                      {t('common.viewAll')} <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 h-auto py-1">
                      {t('common.markAsRead')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* User profile dropdown */}
              <div className="relative group">
                <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 transition-colors p-1.5 rounded-full cursor-pointer pr-3">
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
                      {user?.role}
                    </div>
                  </div>
                </div>
                
                {/* User dropdown menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right invisible group-hover:visible border border-gray-100">
                  <div className="p-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700">{user?.nom}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email || 'admin@example.com'}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="h-4 w-4 mr-3 text-gray-400" />
                      {t('common.profile')}
                    </Link>
                    <Link to="/messages" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <MessageSquare className="h-4 w-4 mr-3 text-gray-400" />
                      {t('common.messages')}
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-3 text-gray-400" />
                      {t('common.settings')}
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-100 bg-gray-50">
                    <button onClick={logout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-3 text-red-500" />
                      {t('common.logout')}
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

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-2">
              {getNavigation(t).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
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
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
