import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from './AppRouter';
import { ToastServiceProvider } from './context/toast';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastServiceProvider>
          <CssBaseline />
          <AppRouter />
        </ToastServiceProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
