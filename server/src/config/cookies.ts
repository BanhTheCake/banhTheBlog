import { CookieOptions } from 'express';

const cookieConfig: CookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
};

export default cookieConfig;
