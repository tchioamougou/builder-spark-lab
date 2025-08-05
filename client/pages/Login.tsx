import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  GraduationCap,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Brain,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.fillAllFields"));
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError(t("auth.incorrectCredentials"));
    }
  };

  const demoCredentials = [
    { 
      role: t("auth.roles.administrator"), 
      email: "admin@univ.fr", 
      password: "admin123",
      icon: Shield,
      gradient: "from-purple-500 to-blue-600"
    },
    {
      role: t("auth.roles.student"),
      email: "marie.dupont@etud.univ.fr",
      password: "etudiant123",
      icon: GraduationCap,
      gradient: "from-green-500 to-teal-600"
    },
    {
      role: t("auth.roles.teacher"),
      email: "jean.martin@univ.fr",
      password: "enseignant123",
      icon: Brain,
      gradient: "from-orange-500 to-red-600"
    },
    { 
      role: t("auth.roles.hr"), 
      email: "sophie.laurent@rh.univ.fr", 
      password: "rh123",
      icon: Sparkles,
      gradient: "from-pink-500 to-purple-600"
    },
    {
      role: t("auth.roles.studentAffairs"),
      email: "pierre.dubois@scolarite.univ.fr",
      password: "scolarite123",
      icon: Shield,
      gradient: "from-cyan-500 to-blue-600"
    },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/30 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-6 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-50 blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2"
          >
            {t("auth.systemTitle")}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg"
          >
            {t("auth.systemSubtitle")}
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-white text-2xl font-bold">
                {t("auth.loginTitle")}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {t("auth.loginSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50 backdrop-blur">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200 font-medium">
                    {t("auth.emailLabel")}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200 font-medium">
                    {t("auth.passwordLabel")}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.passwordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur"
                      disabled={isLoading}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                      disabled={isLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t("auth.loginInProgress")}
                      </>
                    ) : (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {t("auth.loginButton")}
                        </motion.span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                      className="text-xs bg-white/10 border-white/30 text-gray-200 hover:bg-white/20 hover:text-white backdrop-blur"
                    >
                      {showDemoCredentials ? t("auth.hideDemo") : t("auth.showDemo")} {t("auth.demoAccounts")}
                    </Button>
                  </motion.div>
                </div>

                {showDemoCredentials && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    <p className="text-xs text-gray-300 text-center mb-4">
                      {t("auth.clickRoleToFill")}
                    </p>
                    <div className="grid gap-3">
                      {demoCredentials.map((cred, index) => {
                        const IconComponent = cred.icon;
                        return (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() =>
                              fillDemoCredentials(cred.email, cred.password)
                            }
                            className="relative overflow-hidden text-left p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300 group backdrop-blur"
                            disabled={isLoading}
                            variants={cardVariants}
                            whileHover="hover"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${cred.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                            <div className="flex items-center space-x-3 relative z-10">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${cred.gradient} shadow-lg`}>
                                <IconComponent className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                                  {cred.role}
                                </div>
                                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                  {cred.email}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
            <Shield className="h-4 w-4 text-cyan-400" />
            <p>{t("auth.secureSystem")}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
