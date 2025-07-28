
export interface IUser {
    id: number
    name: string
    username: string
    email: string
    phone: string,
    company: {
        bs: string
        catchPhrase: string
        name: string
    }
    website: string
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
