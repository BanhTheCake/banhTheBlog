import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...className: ClassValue[]) => twMerge(clsx(className));

export default cn;
