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
