


import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import movieReducer from "./movieSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage, 
};


const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMovieReducer = persistReducer(persistConfig, movieReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, 
    movies:persistedMovieReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor to persist the store
export const persistor = persistStore(store);

