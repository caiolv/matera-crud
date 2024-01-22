import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import userReducer from './reducers/user';

const sessionPersistConfig = {
  key: 'user',
  storage: storageSession,
};

const reducer = {
  user: persistReducer(sessionPersistConfig, userReducer),
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
