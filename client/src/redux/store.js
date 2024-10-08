import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userSlice  from './user/userSlice';
import themeSlice from './theme/themeSlice';
import {persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { version } from 'mongoose';
  
const rootReducer=combineReducers({
  
    user:userSlice,
    theme:themeSlice,





});

    
    const persistConfig={
        key:'root',
        storage,
        version: 1,



    };

  const persistedReducer=persistReducer(persistConfig,rootReducer);





//   const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  
  export const persistor = persistStore(store);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch