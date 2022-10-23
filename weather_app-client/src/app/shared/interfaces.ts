export interface IUserLoginData {
  email: string;
  password: string;
}
export interface IUserSignupData {
  email: string;
  password: string;
}
export interface IUserData {
  email: string;
  city: string;
  isNewsletter: boolean;
  token?: string;
}

export interface IUserSettingData {
  city: string;
  isNewsletter: boolean;
}

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
}
