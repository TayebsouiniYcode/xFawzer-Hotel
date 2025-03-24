import React from 'react';
import LoginForm, { LoginFormData } from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  // Form handlers
  const handleLoginSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    // Implement your login logic here
  };
  
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Navigate to forgot password page or show modal
  };
  
  const handleRegister = () => {
    console.log('Register clicked');
    // Navigate to register page
    window.location.href = 'register.html';
  };
  
  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic
  };
  
  const handleBackToHome = () => {
    window.location.href = 'index.html';
  };
  
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">LuxStay</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>
        
        {/* Login Form */}
        <LoginForm 
          onSubmit={handleLoginSubmit}
          onForgotPassword={handleForgotPassword}
          onRegister={handleRegister}
          onSocialLogin={handleSocialLogin}
        />
        
        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Vous n'avez pas de compte? 
            <a 
              href="#" 
              className="text-primary font-semibold hover:underline ml-1"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              S'inscrire
            </a>
          </p>
        </div>
        
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

export default Login;