import { ProfileFormData } from '../../lib/shema/profileShema';
import { FormEvent } from 'react';
import {
  UseFormRegisterReturn,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

//--------------------------------------------//
//Users type
//--------------------------------------------//

//profile type
export interface ProfileType {
  profile: UserProfile;
}

//profile props
export interface ProfileProps {
  user: UserProfile;
}

//user profile
export interface UserProfile {
  _id?: string;
  name?: string | null;
  email: string;
  image?: File | string | null;
  imagePublicId?: string | null;
}

//--------------------------------------------//
//connectino interface
//--------------------------------------------//

//login
export interface FormDataLogin {
  email: string;
  password: string;
  general?: string;
}

//signup
export interface FormDataSignUp {
  email: string;
  password: string;
  repeat: string;
}

//new password
export interface FormDataNewPassword {
  password: string;
  repeat: string;
}

//reset password email
export interface FormDataResetPasswordEmail {
  email: string;
}

//password errors
export interface PasswordErrorsProps {
  password: string;
  repeat: string;
}

//--------------------------------------------//
//Nav Type
//--------------------------------------------//

//nav wrapper
export interface NavWrapperProps {
  type: string;
  isSelected: boolean;
  link: string;
  onClick?: () => void;
}

//button component
export interface ButtonComponent {
  label: string;
  onClick?: () => void;
  color: 'empty' | 'filled';
  IconComponent?: React.ComponentType<{ fill?: string }>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  iconColor?: string;
  isLoading?: boolean;
}

//--------------------------------------------//
//inputs type
//--------------------------------------------//

//input with no icons
export interface CustomsInputProps {
  name: keyof ProfileFormData;
  type: string;
  label: string;
  placeholder: string;
  error: string;
  autoComplete: string;
  register: UseFormRegister<ProfileFormData>;
}

//input with icons
export interface InputWithIconProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  IconComponent: React.ComponentType<{ fill?: string }>;
  error: string;
  registration: UseFormRegisterReturn<string>;
}

//--------------------------------------------//
//Profile Type
//--------------------------------------------//

//profile picture wrapper
export interface ProfilePictureWrapperProps {
  imagePreview: string | null;
  handleImageChange: (file: File) => void;
}

//profile wrapper
export interface ProfileWrapperProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
}

//input field
export interface InputFieldProps {
  name: keyof ProfileFormData;
  label: string;
  placeholder: string;
  autoComplete: string;
}

//--------------------------------------------//
//Hooks Type
//--------------------------------------------//

//manage profile hook
export interface UseManageProfileReturn {
  register: UseFormRegisterReturn;
  handleSubmit: UseFormHandleSubmit<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  errors: FieldErrors<ProfileFormData>;
  isSubmitting: boolean;
  imagePreview: string | null;
  handleImageChange: (selectedFile: File) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profilError: string | null;
}

//signup hook
export interface UseSignUpReturn {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataSignUp;
  signupErrors: FormDataSignUp;
  isLoading: boolean;
}

//login hook
export interface UseLoginReturn {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataLogin;
  loginErrors: FormDataLogin;
  isLoading: boolean;
  register: UseFormRegisterReturn;
}
