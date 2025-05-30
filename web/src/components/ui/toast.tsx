import { Toaster as Sonner } from 'sonner';

export const ToasterCustom = () => (
  <Sonner
    richColors
    toastOptions={{
      duration: 4000,
      classNames: {
        error:
          'bg-red-200 text-red-800 border-red-300',
          title: 'text-sm font-semibold text-danger',
          description: 'text-sm font-normal text-danger',
          icon: 'text-danger',
      },
    }}
  />
);
