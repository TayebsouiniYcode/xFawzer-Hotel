import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerContent?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  footerContent,
}) => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">LuxStay</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        
        {/* Main Content */}
        {children}
        
        {/* Footer Content */}
        {footerContent && (
          <div className="text-center mt-6">
            {footerContent}
          </div>
        )}
        
        {/* Back to Home */}
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="text-primary hover:underline flex items-center justify-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Retour à l'accueil</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;