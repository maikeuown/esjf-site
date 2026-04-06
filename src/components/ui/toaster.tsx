'use client';

import { useTheme } from 'next-themes';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@radix-ui/react-toast';

export function Toaster() {
  return (
    <ToastProvider>
      {/* Toasts will be triggered via useToast hook */}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport } from '@radix-ui/react-toast';
