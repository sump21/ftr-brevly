import { Toaster as Sonner } from 'sonner';

export const ToasterCustom = () => (
  <Sonner
    richColors
    toastOptions={{
      duration: 3000,
      classNames: {
        title: 'text-sm font-semibold',
        description: 'text-sm font-normal',
        error: 'text-danger',
        info: 'text-blue-base',
      },
    }}
  />
);
