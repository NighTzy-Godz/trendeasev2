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

export interface UpdateUserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: {
    houseNumber: string;
    street: string;
    province: string;
    municipality: string;
    baranggay: string;
  };
}

export interface UpdateUserPasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
