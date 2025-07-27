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