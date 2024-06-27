import {  createStore,   Reducer } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AuthReducer from "./AuthReducers"
 
 

const appReducer =  AuthReducer 
 

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, appReducer as Reducer<unknown, never>);

const store = createStore(
    persistedReducer,
    
);

persistStore(store);
export default store;


export type RootState = ReturnType<typeof appReducer>;
