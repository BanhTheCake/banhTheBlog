import * as z from 'zod';

const ForgotSchema = z.object({
    email: z.string().email('Email must be correct !'),
});

export type ForgotType = z.infer<typeof ForgotSchema>;
export default ForgotSchema;
