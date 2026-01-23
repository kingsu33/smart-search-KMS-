"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "./utils";


const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
    >(({ className, ...props }, ref) => (
        <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "data-[state=open]",
            className,
        )}
        {...props}
        />
    ));

// const DialogContent = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        
    </DialogPortal>
));

export {
    Dialog,
    DialogContent,
}