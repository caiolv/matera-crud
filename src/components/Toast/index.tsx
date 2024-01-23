import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

export interface IToastOptions {
  message: string;
  variant: 'success' | 'info' | 'warning' | 'error';
}

interface IToast extends IToastOptions {
  open: boolean;
}

export function ToastDialog({ open, message, variant = 'info' }: IToast) {
  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={variant} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
