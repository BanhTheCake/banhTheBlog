import React, { ComponentProps, FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '@/lib/Utils/cn';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const buttonProps = cva(
    'border rounded-sm py-2 px-3 capitalize transition-all',
    {
        variants: {
            variant: {
                default: 'text-white',
                ghost: 'text-white/60 border-white/60 bg-transparent',
                primary:
                    'rounded-md text-white font-semibold bg-green-700 hover:bg-green-800',
                secondary:
                    'rounded-md text-white font-semibold bg-black/80 hover:bg-black',
                text: 'rounded-md text-black font-semibold hover:bg-black/5',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonProps> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        { className, variant, children, disabled, isLoading = false, ...props },
        ref
    ) => {
        return (
            <button
                {...props}
                ref={ref}
                className={cn(
                    buttonProps({ variant, className }),
                    (disabled || isLoading) && 'opacity-60 cursor-not-allowed'
                )}
            >
                {isLoading ? (
                    <AiOutlineLoading3Quarters
                        size={26}
                        className="animate-twSpin animate-infinite m-auto"
                    />
                ) : (
                    <>{children}</>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
