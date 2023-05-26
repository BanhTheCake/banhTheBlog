import { Response } from 'src/interfaces/response.interface';
export declare class RefreshTokenResponse implements Response {
    code: number;
    ok: boolean;
    error: string;
    msg: string;
    token: string;
}
