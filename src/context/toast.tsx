/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import * as React from 'react';

import { IToastOptions, ToastDialog } from '../components/Toast';

export const ToastServiceContext = React.createContext<{
  openToast: (options: IToastOptions) => void;
  closeToast: () => void;
}>({
  openToast: () => undefined,
  closeToast: () => undefined,
});

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
  }, []);

  const closeToast = React.useCallback(() => {
    setToastState(null);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      openToast,
      closeToast,
    }),
    [openToast, closeToast],
  );

  return (
    <>
      <ToastServiceContext.Provider value={contextValue} children={children} />
      <ToastDialog
        open={Boolean(ToastState)}
        onClose={closeToast}
        {...ToastState!}
      />
    </>
  );
}
