import { configureStore } from '@reduxjs/toolkit';
import reducer from '../services/reducer';


export const store = configureStore({
    reducer: reducer,
})