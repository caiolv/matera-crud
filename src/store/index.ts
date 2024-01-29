import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import productReducer from './reducers/produts';
import userReducer from './reducers/user';

const productsPersistConfig = {
  key: 'root',
  storage,
};

const sessionPersistConfig = {
  key: 'user',
  storage: storageSession,
};

const reducer = {
  user: persistReducer(sessionPersistConfig, userReducer),
  product: persistReducer(productsPersistConfig, productReducer),
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
