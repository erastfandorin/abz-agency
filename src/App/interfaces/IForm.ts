export interface IFormFields {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string | File;
  [key: string]: string | File;
}
export interface IFormErrors {
  name: string;
  email: string;
  phone: string;
  photo: string;
}

// export interface I
export interface IPosition {
  id: number;
  name: string;
}

export interface IUserView {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

export interface IUser extends IUserView {
  id: number;
  position_id: number;
  registration_timestamp: number;
}

export interface IUsers {
  // success: boolean;
  // message?: string;
  lastPage: boolean;
  users: IUser[];
}
