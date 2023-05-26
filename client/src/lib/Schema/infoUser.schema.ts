import { z } from 'zod';

export const ZUpdateInfoUser = z.object({
    img: z
        .custom<File | string>(
            (v) => {
                return v instanceof File || typeof v === 'string';
            },
            {
                message: 'Img cannot be empty',
            }
        )
        .refine(
            (item: File | string) => (item instanceof File ? item.type : true),
            {
                message: 'Img must be valid',
            }
        ),
    username: z.string().min(10, 'Username must be higher 10 characters'),
});

export type UpdateInfoUserType = z.infer<typeof ZUpdateInfoUser>;
