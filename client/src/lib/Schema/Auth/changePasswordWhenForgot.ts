import * as z from 'zod';

const ChangeForgotPasswordSchema = z
    .object({
        password: z
            .string()
            .nonempty('Password is required')
            .min(6, 'Password must have at least 6 character'),
        cfPassword: z
            .string()
            .nonempty('Confirm password is required')
            .min(6, 'Confirm password must have at least 6 character'),
    })
    .refine((data) => data.cfPassword === data.password, {
        message: "Password don't match",
        path: ['cfPassword'],
    });

export type ChangeForgotPasswordType = z.infer<
    typeof ChangeForgotPasswordSchema
>;
export default ChangeForgotPasswordSchema;
