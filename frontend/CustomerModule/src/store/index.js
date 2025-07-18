import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import storage from 'redux-persist/lib/storage';
import notificationReducer from './NotificationSlice';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['notification'],
}
const rootReducer = combineReducers({
    cart: cartReducer,
    notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };