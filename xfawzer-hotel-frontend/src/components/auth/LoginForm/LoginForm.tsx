import React, { useState } from 'react';
import IconInput from '../../common/IconInput';
import Button from '../../common/Button';
import SocialButton from '../../common/SocialButton';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onSocialLogin?: (provider: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onRegister,
  onSocialLogin,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSocialLogin = (provider: string) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SocialButton 
          provider="facebook"
          onClick={() => handleSocialLogin('facebook')}
        />
        <SocialButton 
          provider="google"
          onClick={() => handleSocialLogin('google')}
        />
      </div>
      
      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="bg-white px-3 text-gray-500 text-sm absolute">ou</span>
      </div>
      
      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <IconInput 
          icon="fas fa-envelope"
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-700" htmlFor="password">Mot de passe</label>
            <a 
              href="#" 
              className="text-sm text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                if (onForgotPassword) onForgotPassword();
              }}
            >
              Mot de passe oublié?
            </a>
          </div>
          <IconInput 
            icon="fas fa-lock"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            rightIcon={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
            rightIconAction={togglePasswordVisibility}
            required
          />
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="rememberMe" 
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Se souvenir de moi
          </label>
        </div>
        
        <Button type="submit" variant="primary" fullWidth>
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;