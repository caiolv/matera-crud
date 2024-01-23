import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

export interface IToastOptions {
  message: string;
  variant: 'success' | 'info' | 'warning' | 'error';
}

interface IToast extends IToastOptions {
  open: boolean;
  onClose: () => void;
}

export function ToastDialog({
  open,
  message,
  variant = 'info',
  onClose,
}: IToast) {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      <Alert severity={variant} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
