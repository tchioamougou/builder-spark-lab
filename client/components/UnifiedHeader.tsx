import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  User,
  Settings,
  MessageSquare,
  Bell,
  LogOut,
  ChevronDown,
  Shield,
  GraduationCap,
  Brain,
  Sparkles,
  Menu,
  Search,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";

interface UnifiedHeaderProps {
  onMobileMenuToggle?: () => void;
  showMobileMenuButton?: boolean;
}

export default function UnifiedHeader({
  onMobileMenuToggle,
  showMobileMenuButton = true,
}: UnifiedHeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notificationCount] = useState(3); // Placeholder for notifications

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Shield;
      case "etudiant":
        return GraduationCap;
      case "enseignant":
        return Brain;
      case "rh":
        return Sparkles;
      case "scolarite":
        return Shield;
      default:
        return User;
    }
  };

  const getRoleGradient = (role: string) => {
    switch (role) {
      case "admin":
        return "from-purple-500 to-blue-600";
      case "etudiant":
        return "from-green-500 to-teal-600";
      case "enseignant":
        return "from-orange-500 to-red-600";
      case "rh":
        return "from-pink-500 to-purple-600";
      case "scolarite":
        return "from-cyan-500 to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return t("auth.roles.administrator");
      case "etudiant":
        return t("auth.roles.student");
      case "enseignant":
        return t("auth.roles.teacher");
      case "rh":
        return t("auth.roles.hr");
      case "scolarite":
        return t("auth.roles.studentAffairs");
      default:
        return role;
    }
  };

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "etudiant":
        return "/student/profile";
      case "enseignant":
        return "/teacher/profile";
      default:
        return "/admin";
    }
  };

  const getMessagesPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "etudiant":
        return "/student/messages";
      case "enseignant":
        return "/teacher/messages";
      default:
        return "/admin";
    }
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "etudiant":
        return "/student/dashboard";
      case "enseignant":
        return "/teacher/dashboard";
      default:
        return "/";
    }
  };

  if (!user) return null;

  const RoleIcon = getRoleIcon(user.role);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            {showMobileMenuButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMobileMenuToggle}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            )}

            {/* Logo and Title */}
            <Link
              to={getDashboardPath()}
              className="flex items-center space-x-3 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-xl bg-gradient-to-r ${getRoleGradient(user.role)} shadow-lg`}
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </motion.div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  EPFPS
                </h1>
                <p className="text-xs text-gray-300">
                  {t("auth.systemSubtitle")}
                </p>
              </div>
            </Link>
          </div>

          {/* Center Section - Search (optional) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("common.search")}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 backdrop-blur"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <Link to={getDashboardPath()}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block"
              >
                <Home className="h-5 w-5" />
              </motion.div>
            </Link>

            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 ring-2 ring-white/30">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.nom} ${user.prenom}`}
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${getRoleGradient(user.role)} text-white text-sm font-bold`}
                      >
                        {user.nom?.charAt(0)}
                        {user.prenom?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-white group-hover:text-cyan-200 transition-colors">
                        {user.prenom} {user.nom}
                      </p>
                      <div className="flex items-center space-x-2">
                        <RoleIcon className="h-3 w-3 text-gray-300" />
                        <p className="text-xs text-gray-300">
                          {getRoleName(user.role)}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl"
              >
                {/* User Info Header */}
                <DropdownMenuLabel className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.nom} ${user.prenom}`}
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${getRoleGradient(user.role)} text-white font-bold`}
                      >
                        {user.nom?.charAt(0)}
                        {user.prenom?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.prenom} {user.nom}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={`bg-gradient-to-r ${getRoleGradient(user.role)} text-white text-xs`}
                        >
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {getRoleName(user.role)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Profile Menu Items */}
                <DropdownMenuItem asChild>
                  <Link
                    to={getProfilePath()}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    <span>{t("common.profile")}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    to={getMessagesPath()}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{t("common.messages")}</span>
                    {notificationCount > 0 && (
                      <Badge variant="destructive" className="ml-auto text-xs">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>{t("common.settings")}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center space-x-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("common.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
