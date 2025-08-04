import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";
import ProgramsPage from "./pages/Programs";
import AcademicYearsPage from "./pages/AcademicYears";
import TeachersPage from "./pages/Teachers";
import StudentsPage from "./pages/Students";
import FilesPage from "./pages/Files";
import AdminPage from "./pages/Admin";
import StudentDashboard from "./pages/StudentDashboard";
import StudentGrades from "./pages/StudentGrades";
import StudentDocuments from "./pages/StudentDocuments";
import StudentProfile from "./pages/StudentProfile";
import StudentSchedule from "./pages/StudentSchedule";
import StudentRequests from "./pages/StudentRequests";
import StudentMessages from "./pages/StudentMessages";
import TeacherDashboard from "./pages/TeacherDashboard";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  // If not logged in, show login page
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Role-based routing
  return (
    <Routes>
      {/* Redirect based on user role */}
      <Route
        path="/"
        element={
          user.role === "etudiant" ? (
            <Navigate to="/student/dashboard" replace />
          ) : user.role === "enseignant" ? (
            <Navigate to="/teacher/dashboard" replace />
          ) : (
            <Index />
          )
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/grades"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentGrades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/documents"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/schedule"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/requests"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/messages"
        element={
          <ProtectedRoute requiredRole={["etudiant"]}>
            <StudentMessages />
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin/Staff Routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole={["admin", "rh"]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/programs"
        element={
          <ProtectedRoute requiredRole={["admin", "scolarite"]}>
            <ProgramsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic-years"
        element={
          <ProtectedRoute requiredRole={["admin", "scolarite"]}>
            <AcademicYearsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers"
        element={
          <ProtectedRoute requiredRole={["admin", "rh"]}>
            <TeachersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute requiredRole={["admin", "scolarite"]}>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/files"
        element={
          <ProtectedRoute requiredRole={["admin", "scolarite", "rh"]}>
            <FilesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* General Routes */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
