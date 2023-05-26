import { Response } from 'src/interfaces/response.interface';
export declare class RegisterResponse implements Response {
    code: number;
    ok: boolean;
    error: string;
    msg: string;
}
