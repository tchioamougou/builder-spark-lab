import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  EyeOff
} from "lucide-react";

export default function LoginPage() {
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
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const demoCredentials = [
    { role: "Administrateur", email: "admin@univ.fr", password: "admin123" },
    { role: "Étudiant", email: "marie.dupont@etud.univ.fr", password: "etudiant123" },
    { role: "Enseignant", email: "jean.martin@univ.fr", password: "enseignant123" },
    { role: "RH", email: "sophie.laurent@rh.univ.fr", password: "rh123" },
    { role: "Scolarité", email: "pierre.dubois@scolarite.univ.fr", password: "scolarite123" }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EduManage Pro</h1>
          <p className="text-gray-600 mt-2">Système de gestion éducative</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre espace personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@univ.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="text-xs"
                >
                  {showDemoCredentials ? "Masquer" : "Voir"} les comptes de démonstration
                </Button>
              </div>

              {showDemoCredentials && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-600 text-center mb-3">
                    Cliquez sur un rôle pour remplir automatiquement les champs :
                  </p>
                  <div className="grid gap-2">
                    {demoCredentials.map((cred, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => fillDemoCredentials(cred.email, cred.password)}
                        className="text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                        disabled={isLoading}
                      >
                        <div className="font-medium">{cred.role}</div>
                        <div className="text-gray-600">{cred.email}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Système sécurisé - Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
}
