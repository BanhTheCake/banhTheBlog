export enum Roles {
    ADMIN = 'admin',
    USER = 'user',
}

export interface User {
    _id: string;
    username: string;
    email: string;
    img?: string | null | undefined;
    firstLogin: boolean;
    role: Roles;
    createdAt: string;
}

export interface Author
    extends Pick<User, '_id' | 'username' | 'email' | 'img' | 'createdAt'> {}
