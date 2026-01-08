import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-lime text-forest hover:bg-lime/90 shadow-sm hover:shadow-md transition-all duration-300",
                destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
                outline:
                    "border-2 border-lime text-lime bg-transparent hover:bg-lime/10 shadow-sm",
                secondary: "bg-forest text-white hover:bg-forest/90 shadow-sm hover:shadow-md",
                ghost: "hover:bg-lime/10 hover:text-forest",
                link: "text-lime underline-offset-4 hover:underline",
                white: "bg-white text-forest hover:bg-cream border border-transparent hover:border-gray-200 shadow-sm transition-all duration-300",
            },
            size: {
                default: "h-11 px-6 py-2.5",
                sm: "h-9 rounded-md px-4 text-xs font-semibold",
                lg: "h-12 rounded-lg px-8 text-base font-semibold",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
