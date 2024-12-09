// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slice'; 

// export const store = configureStore({
//   reducer: {
//     user: userReducer, 
//   },
// });



import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// Persist configuration
const persistConfig = {
  key: 'root',
  storage, // Use localStorage as the storage
};

// Wrap the userReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Apply persisted reducer
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

