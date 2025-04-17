export interface RegisterUserInput {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  profile_image?: string;
}
