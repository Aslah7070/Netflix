


import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import movieReducer from './movieSlice';
import profileReducer from "./profile.slice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from "./adminSlice"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';


const userPersistConfig = {
  key: 'user',
  storage,
};

const moviePersistConfig = {
  key: 'movies',
  storage,
};
const profilePersistConfig = {
  key: 'profile',
  storage,
};
const adminPersistConfig = {
  key: 'admin',
  storage,
};


const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedMovieReducer = persistReducer(moviePersistConfig, movieReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    movies: persistedMovieReducer,
    profile:persistedProfileReducer,
    admin:persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
