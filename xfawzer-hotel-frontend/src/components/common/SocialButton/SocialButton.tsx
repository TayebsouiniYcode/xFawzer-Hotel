import React from 'react';

type SocialProvider = 'facebook' | 'google' | 'twitter' | 'apple';

export interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  className = '',
}) => {
  const getProviderConfig = (provider: SocialProvider) => {
    switch (provider) {
      case 'facebook':
        return {
          bgColor: 'bg-[#4267B2] hover:bg-blue-700',
          icon: 'fab fa-facebook-f',
          text: 'Facebook',
        };
      case 'google':
        return {
          bgColor: 'bg-[#DB4437] hover:bg-red-700',
          icon: 'fab fa-google',
          text: 'Google',
        };
      case 'twitter':
        return {
          bgColor: 'bg-[#1DA1F2] hover:bg-blue-500',
          icon: 'fab fa-twitter',
          text: 'Twitter',
        };
      case 'apple':
        return {
          bgColor: 'bg-black hover:bg-gray-800',
          icon: 'fab fa-apple',
          text: 'Apple',
        };
      default:
        return {
          bgColor: 'bg-gray-500 hover:bg-gray-600',
          icon: 'fas fa-globe',
          text: 'Connect',
        };
    }
  };

  const { bgColor, icon, text } = getProviderConfig(provider);
  
  return (
    <button 
      className={`flex items-center justify-center gap-2 ${bgColor} text-white py-2 px-4 rounded-md transition ${className}`}
      onClick={onClick}
      type="button"
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;