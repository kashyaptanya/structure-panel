import { configureStore, getDefaultMiddleware, } from '@reduxjs/toolkit';
import authSlice from './user'
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const reducer = combineReducers({
    "auth": authSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export default store;
// import {configureStore} from '@reduxjs/toolkit';
// import AuthReducer from './user'


// const store = configureStore({
//     reducer:{
//         "auth":AuthReducer,
//     }
// })

// export default store;