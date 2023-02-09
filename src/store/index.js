import {configureStore} from '@reduxjs/toolkit';
import authSlice from './user'

const store = configureStore({
    reducer:{
        "auth":authSlice,
    }
})

export default store;