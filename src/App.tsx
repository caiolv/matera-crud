import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from './AppRouter';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
