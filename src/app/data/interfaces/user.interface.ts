export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
  website: string;
}

export interface ApiError {
  message: string;
  code?: number;
}

export interface UsersState {
  users: IUser[];
  error: ApiError | null;
  loading: boolean;
}
