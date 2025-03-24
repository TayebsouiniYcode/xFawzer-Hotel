import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormData } from '../../components/auth/LoginForm';
import AuthLayout from '../../components/layout/AuthLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form handlers
  const handleLoginSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    // Implement your login logic here
    // After successful login, navigate to home or dashboard
    // navigate('/');
  };
  
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Navigate to forgot password page or show modal
    // navigate('/forgot-password');
  };
  
  const handleRegister = () => {
    console.log('Register clicked');
    // Navigate to register page
    navigate('/register');
  };
  
  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic
  };
  
  const footerContent = (
    <p className="text-gray-600">
      Vous n'avez pas de compte? 
      <a 
        href="/register" 
        className="text-primary font-semibold hover:underline ml-1"

      >
        S'inscrire
      </a>
    </p>
  );
  
  return (
    <AuthLayout 
      title="LuxStay" 
      subtitle="Connectez-vous à votre compte"
      footerContent={footerContent}
    >
      <LoginForm 
        onSubmit={handleLoginSubmit}
        onForgotPassword={handleForgotPassword}
        onRegister={handleRegister}
        onSocialLogin={handleSocialLogin}
      />
    </AuthLayout>
  );
};

export default Login;