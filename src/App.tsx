import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastServiceProvider } from './context/toast';
import Router from './Router';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastServiceProvider>
          <CssBaseline />
          <Router />
        </ToastServiceProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
