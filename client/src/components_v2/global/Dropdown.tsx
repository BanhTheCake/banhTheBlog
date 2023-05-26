import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import cn from '@/lib/Utils/cn';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    Radix.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                className={cn(
                    'min-w-[220px] border shadow-md rounded-md p-2 mr-1 animate-fadeIn animate-duration-100 bg-white relative z-50',
                    className
                )}
                ref={forwardedRef}
                sideOffset={16}
                {...props}
            >
                {children}
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    Radix.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Item
            {...props}
            ref={forwardedRef}
            className="w-full pl-[25px] p-1 flex items-center hover:bg-purple-400 hover:text-white transition-all rounded-sm border-none outline-none cursor-pointer"
        >
            {children}
        </DropdownMenuPrimitive.Item>
    );
});

DropdownItem.displayName = 'DropdownItem';

export const DropdownItemNoCss = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    Radix.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Item {...props} ref={forwardedRef}>
            {children}
        </DropdownMenuPrimitive.Item>
    );
});

DropdownItemNoCss.displayName = 'DropdownItemNoCss';

export const DropdownSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    Radix.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Separator
            {...props}
            ref={forwardedRef}
            className="h-[1px] bg-black/20 m-[5px]"
        >
            {children}
        </DropdownMenuPrimitive.Separator>
    );
});

DropdownSeparator.displayName = 'DropdownSeparator';
