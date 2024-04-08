export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface DecodedUser {
  fullName: string;
  pfp: string;
  store: string;
  _id: string;
}

export interface UpdateUserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address?: string;
}
