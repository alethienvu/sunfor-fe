export interface IUser {
  id: string;
  email: string;
  address?: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  gender: Gender;
  dateOfBirth: Date;
  role: UserRole;
  status: UserStatus;
}
export interface ILoginData {
  id: string;
  accessToken: string;
  refreshToken: string;
  email: string;
  role: UserRole;
}
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
  LOCKED = 'LOCKED'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}
export interface ILoginDto {
  email: string;
  password: string;
}
export interface IRegisterDto {
  email: string;
  password: string;
}
