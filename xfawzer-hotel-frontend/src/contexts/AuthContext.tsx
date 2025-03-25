import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Vérifier si l'utilisateur est déjà connecté (stockage local, cookies, etc.)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // En production, vous feriez une requête API pour vérifier le token
        const storedUser = localStorage.getItem('luxstay_user');
        
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // En production, vous feriez une requête API
      // Simulation d'une requête API
      // const response = await api.login(email, password);
      
      // Pour la démo, on utilise un utilisateur fictif
      const demoUser: User = {
        id: '1',
        name: 'Thomas Dubois',
        email: email,
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      // Stocker les informations utilisateur
      localStorage.setItem('luxstay_user', JSON.stringify(demoUser));
      setCurrentUser(demoUser);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction de déconnexion
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // En production, vous feriez une requête API pour invalider le token
      // await api.logout();
      
      // Supprimer les informations utilisateur
      localStorage.removeItem('luxstay_user');
      setCurrentUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const isAuthenticated = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';
  
  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated,
    isAdmin
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};