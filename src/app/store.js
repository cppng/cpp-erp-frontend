import {configureStore} from '@reduxjs/toolkit';
import headerReducer from '../slices/headerSlice';
import topicReducer from '../slices/topicSlice';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        topic: topicReducer,
    }
});