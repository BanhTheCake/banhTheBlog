import * as z from 'zod';

const ZCreateCategory = z.string().min(3).nonempty();

export type TCreateCategory = z.infer<typeof ZCreateCategory>;
export default ZCreateCategory;
