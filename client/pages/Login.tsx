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
  Heart,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoEcole from "@/assets/images/landingpageimage/Logo de EPFPS.png";

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
      email: "directeur@epfps.cm",
      password: "epfps2024",
      icon: Shield,
      color: "bg-[#3b2c6a]",
    },
    {
      role: t("auth.roles.student"),
      email: "aissatou.bello@etudiant.epfps.cm",
      password: "student2024",
      icon: GraduationCap,
      color: "bg-[#ff9900]",
    },
    {
      role: t("auth.roles.teacher"),
      email: "dr.moussa@professeur.epfps.cm",
      password: "prof2024",
      icon: BookOpen,
      color: "bg-[#3b2c6a]",
    },
    {
      role: t("auth.roles.hr"),
      email: "aminata.kane@rh.epfps.cm",
      password: "rh2024",
      icon: Users,
      color: "bg-[#ff9900]",
    },
    {
      role: t("auth.roles.studentAffairs"),
      email: "ibrahim.sall@scolarite.epfps.cm",
      password: "scolarite2024",
      icon: UserCheck,
      color: "bg-[#3b2c6a]",
    },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-white/50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b2c6a' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative flex justify-center ">
              <div className="rounded-2xl shadow-lg">
                <img src={LogoEcole} alt="Logo EPFPS" className="h-16 w-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#3b2c6a] mb-2 align-middle self-center">
                EPFPS
              </h1>
            </div>
          </div>

        </div>

        {/* Login Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-[#3b2c6a] text-2xl font-bold">
              {t("auth.loginTitle")}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t("auth.loginSubtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {t("auth.emailLabel")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#3b2c6a] focus:ring-[#3b2c6a]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {t("auth.passwordLabel")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#3b2c6a] focus:ring-[#3b2c6a]"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#3b2c6a] transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#3b2c6a] to-[#ff9900] hover:from-[#2d1f4f] hover:to-[#e68a00] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("auth.loginInProgress")}
                  </>
                ) : (
                  t("auth.loginButton")
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="text-sm border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-[#3b2c6a]"
                >
                  {showDemoCredentials
                    ? t("auth.hideDemo")
                    : t("auth.showDemo")}{" "}
                  {t("auth.demoAccounts")}
                </Button>
              </div>

              {showDemoCredentials && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {t("auth.clickRoleToFill")}
                  </p>
                  <div className="grid gap-3">
                    {demoCredentials.map((cred, index) => {
                      const IconComponent = cred.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            fillDemoCredentials(cred.email, cred.password)
                          }
                          className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 group"
                          disabled={isLoading}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-lg ${cred.color} shadow-sm`}
                            >
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 group-hover:text-[#3b2c6a] transition-colors">
                                {cred.role}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {cred.email}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="h-4 w-4 text-[#3b2c6a]" />
            <p>{t("auth.secureSystem")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
