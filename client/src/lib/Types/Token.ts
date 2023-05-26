import { Roles } from './User';

export interface AccessToken {
    email: string;
    role: Roles;
    userId: string;
    iat: number;
    exp: number;
}

export interface RefreshToken {
    email: string;
    role: Roles;
    userId: string;
    iat: number;
    exp: number;
}
