import { Response } from 'src/interfaces/response.interface';
export declare class LoginResponse implements Response {
    code: number;
    error: string;
    ok: boolean;
    msg: string;
    token: string;
}
