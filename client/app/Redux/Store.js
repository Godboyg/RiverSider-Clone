import { configureStore } from '@reduxjs/toolkit';
import StateReducer from "./Slice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistToggleReducer = persistReducer(persistConfig , StateReducer);

const store = configureStore({
    reducer : {
        state : persistToggleReducer
    },
})

const persistor = persistStore(store);

export default store;