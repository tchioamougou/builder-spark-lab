import "./global.css";
// Import i18n configuration
import "./i18n";

import { Toaster } from "@/components/ui/toaster";
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
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Formations from "./pages/Formations";
import Admissions from "./pages/Admissions";
import Actualites from "./pages/Actualites";
import FAQ from "./pages/FAQ";
import Recrutement from "./pages/Recrutement";
import Contacts from "./pages/Contacts";
import UsersPage from "./pages/Users";
import ProgramsPage from "./pages/Programs";
import AcademicYearsPage from "./pages/AcademicYears";
import TeachersPage from "./pages/Teachers";
import StudentsPage from "./pages/Students";
import FilesPage from "./pages/Files";
import AdminPage from "./pages/Admin";
import CourseAssignment from "./pages/CourseAssignment";
import StudentDashboard from "./pages/StudentDashboard";
import StudentGrades from "./pages/StudentGrades";
import StudentDocuments from "./pages/StudentDocuments";
import StudentProfile from "./pages/StudentProfile";
import StudentSchedule from "./pages/StudentSchedule";
import StudentRequests from "./pages/StudentRequests";
import StudentMessages from "./pages/StudentMessages";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherGrades from "./pages/TeacherGrades";
import TeacherGradeEntry from "./pages/TeacherGradeEntry";
import TeacherSchedule from "./pages/TeacherSchedule";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherDocuments from "./pages/TeacherDocuments";
import TeacherMessages from "./pages/TeacherMessages";
import TeacherProfile from "./pages/TeacherProfile";
import UserManagement from "./pages/UserManagement";
import StudentDetails from "./pages/StudentDetails";
import RoleManagement from "./pages/RoleManagement";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  // If not logged in, show landing page and login page
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/recrutement" element={<Recrutement />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
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
      <Route
        path="/teacher/students"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/grades"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherGrades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/grade-entry"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherGradeEntry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/schedule"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/courses"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/documents"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/messages"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute requiredRole={["enseignant"]}>
            <TeacherProfile />
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
        path="/user-management"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-details/:id"
        element={
          <ProtectedRoute
            requiredRole={[
              "admin",
              "scolarite",
              "rh",
              "enseignant",
              "etudiant",
            ]}
          >
            <StudentDetails />
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
      <Route
        path="/course-assignment"
        element={
          <ProtectedRoute requiredRole={["admin", "scolarite"]}>
            <CourseAssignment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/role-management"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <RoleManagement />
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

export default App;
