import React, { useState, useEffect } from 'react';
import IconInput from '../../common/IconInput';
import Input from '../../common/Input';
import Button from '../../common/Button';
import SocialButton from '../../common/SocialButton';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ValidationErrors {
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  form?: string;
}

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
  onSocialRegister?: (provider: string) => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onSocialRegister,
  onTermsClick,
  onPrivacyClick,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when field is changed
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    
    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSocialRegister = (provider: string) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Social Register */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SocialButton 
          provider="facebook"
          onClick={() => handleSocialRegister('facebook')}
        />
        <SocialButton 
          provider="google"
          onClick={() => handleSocialRegister('google')}
        />
      </div>
      
      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="bg-white px-3 text-gray-500 text-sm absolute">ou</span>
      </div>
      
      {/* Register Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prénom"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Jean"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Nom"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Dupont"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        
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
          <label className="block text-gray-700 mb-2" htmlFor="password">Mot de passe</label>
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
          <p className="text-xs text-gray-500 mt-1">Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre</p>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <IconInput 
            icon="fas fa-lock"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="acceptTerms" 
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
            J'accepte les {' '}
            <a 
              href="#" 
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                if (onTermsClick) onTermsClick();
              }}
            >
              conditions d'utilisation
            </a> 
            {' '} et la {' '}
            <a 
              href="#" 
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                if (onPrivacyClick) onPrivacyClick();
              }}
            >
              politique de confidentialité
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-xs">{errors.acceptTerms}</p>
        )}
        
        {errors.form && (
          <p className="text-red-500 text-sm text-center">{errors.form}</p>
        )}
        
        <Button type="submit" variant="primary" fullWidth>
          Créer un compte
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;