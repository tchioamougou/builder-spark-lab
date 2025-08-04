import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: 'admin' | 'enseignant' | 'etudiant' | 'rh' | 'scolarite';
  avatar?: string;
  permissions: string[];
  filiere?: string;
  niveau?: string;
  numeroEtudiant?: string;
  specialite?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data - in real app this would come from API
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@univ.fr': {
    password: 'admin123',
    user: {
      id: '1',
      nom: 'Administrateur Système',
      email: 'admin@univ.fr',
      role: 'admin',
      permissions: ['*'], // All permissions
    }
  },
  'marie.dupont@etud.univ.fr': {
    password: 'etudiant123',
    user: {
      id: '2',
      nom: 'Marie Dupont',
      email: 'marie.dupont@etud.univ.fr',
      role: 'etudiant',
      filiere: 'Pharmacie',
      niveau: 'Année 1',
      numeroEtudiant: 'ETU2024001',
      permissions: ['view_own_profile', 'view_own_notes', 'submit_documents', 'request_documents']
    }
  },
  'jean.martin@univ.fr': {
    password: 'enseignant123',
    user: {
      id: '3',
      nom: 'Dr. Jean Martin',
      email: 'jean.martin@univ.fr',
      role: 'enseignant',
      specialite: 'Anatomie',
      permissions: ['view_students', 'manage_notes', 'view_teaching_schedule', 'manage_course_content']
    }
  },
  'sophie.laurent@rh.univ.fr': {
    password: 'rh123',
    user: {
      id: '4',
      nom: 'Sophie Laurent',
      email: 'sophie.laurent@rh.univ.fr',
      role: 'rh',
      permissions: ['manage_teachers', 'manage_job_offers', 'view_hr_reports', 'manage_applications']
    }
  },
  'pierre.dubois@scolarite.univ.fr': {
    password: 'scolarite123',
    user: {
      id: '5',
      nom: 'Pierre Dubois',
      email: 'pierre.dubois@scolarite.univ.fr',
      role: 'scolarite',
      permissions: ['manage_students', 'manage_enrollments', 'manage_academic_programs', 'generate_reports']
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = mockUsers[email];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('currentUser', JSON.stringify(userData.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true; // Admin has all permissions
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
