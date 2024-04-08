export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserProfileUpdate {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
}
