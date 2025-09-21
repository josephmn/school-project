export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}