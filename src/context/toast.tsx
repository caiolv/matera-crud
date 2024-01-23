/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import * as React from 'react';

import { IToastOptions, ToastDialog } from '../components/Toast';

export const ToastServiceContext = React.createContext<
  (options: IToastOptions) => void
>(() => undefined);

export const useToast = () => React.useContext(ToastServiceContext);

export function ToastServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ToastState, setToastState] = React.useState<IToastOptions | null>(
    null,
  );

  const openToast = React.useCallback((options: IToastOptions) => {
    setToastState(options);
    setTimeout(() => {
      setToastState(null);
    }, 6000);
  }, []);

  return (
    <>
      <ToastServiceContext.Provider value={openToast} children={children} />
      <ToastDialog open={Boolean(ToastState)} {...ToastState!} />
    </>
  );
}
