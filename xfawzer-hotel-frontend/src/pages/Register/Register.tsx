import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm, { RegisterFormData } from '../../components/auth/RegisterForm';
import AuthLayout from '../../components/layout/AuthLayout';

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Form handlers
  const handleRegisterSubmit = (data: RegisterFormData) => {
    console.log('Register form submitted:', data);
    // Implement your registration logic here
    
    // Example: If successful, navigate to login
    alert('Inscription réussie! Vous allez être redirigé vers la page de connexion.');
    navigate('/login');
  };
  
  const handleSocialRegister = (provider: string) => {
    console.log(`Social registration with ${provider}`);
    // Implement social registration logic
  };
  
  const handleTermsClick = () => {
    console.log('Terms and conditions clicked');
    // Navigate to terms page or show modal
  };
  
  const handlePrivacyClick = () => {
    console.log('Privacy policy clicked');
    // Navigate to privacy page or show modal
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const footerContent = (
    <p className="text-gray-600">
      Vous avez déjà un compte? 
      <a 
        href="/login" 
        className="text-primary font-semibold hover:underline ml-1"

      >
        Se connecter
      </a>
    </p>
  );
  
  return (
    <AuthLayout 
      title="LuxStay" 
      subtitle="Créez votre compte"
      footerContent={footerContent}
    >
      <RegisterForm 
        onSubmit={handleRegisterSubmit}
        onSocialRegister={handleSocialRegister}
        onTermsClick={handleTermsClick}
        onPrivacyClick={handlePrivacyClick}
      />
    </AuthLayout>
  );
};

export default Register;