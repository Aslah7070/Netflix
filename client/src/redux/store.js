


// // import { configureStore } from '@reduxjs/toolkit';
// // import userReducer from './slice';
// // import movieReducer from "./movieSlice"
// // import { persistStore, persistReducer } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage'; 
// // import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// // const persistConfig = {
// //   key: 'root',
// //   storage, 
// // };


// // const persistedUserReducer = persistReducer(persistConfig, userReducer);
// // const persistedMovieReducer = persistReducer(persistConfig, movieReducer);

// // export const store = configureStore({
// //   reducer: {
// //     user: persistedUserReducer, 
// //     movies:persistedMovieReducer
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// //       },
// //     }),
// // });

// // // Create a persistor to persist the store
// // export const persistor = persistStore(store);




// // redux/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slice';
// import movieReducer from './movieSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';


// const persistConfig = {
//   key: 'root',
//   storage, 
// };


// const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedMovieReducer = persistReducer(persistConfig, movieReducer);


// export const store = configureStore({
//   reducer: {
//     user: persistedUserReducer,
//     movies: persistedMovieReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // Create persistor to persist the store
// export const persistor = persistStore(store);



import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import movieReducer from './movieSlice';
import profileReducer from "./profile.slice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Separate persistConfigs for each reducer
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

// Persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedMovieReducer = persistReducer(moviePersistConfig, movieReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    movies: persistedMovieReducer,
    profile:persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);
