import * as z from 'zod';

export const ZHandlePostSchema = z.object({
    titleImg: z
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
    title: z.string().min(5, 'Title must be higher 5 characters').trim(),
    categories: z.array(z.string()).min(1, 'Categories must be required'),
    content: z.string().min(10, 'Content must be higher 10 characters'),
});

export type HandlePostType = z.infer<typeof ZHandlePostSchema>;

export const ZCreateBlogSchema = z.object({
    titleImg: z
        .custom<File>((v) => v instanceof File, {
            message: 'File cannot be empty',
        })
        .refine((file: File) => file.type, {
            message: 'File must be valid',
        }),
    title: z.string().min(5, 'Title must be higher 5 characters').trim(),
    categories: z.array(z.string()).min(1, 'Categories must be required'),
    content: z.string().min(10, 'Content must be higher 10 characters'),
});

export type CreateBlogType = z.infer<typeof ZCreateBlogSchema>;
