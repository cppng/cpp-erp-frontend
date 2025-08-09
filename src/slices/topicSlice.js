import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    topic: {},
    topicComponents: []
}

export const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        setTopic: (state, action) => {
            state.topic = action.payload;
        },
        setTopicComponents: (state, action) => {
            state.topicComponents = action.payload;
        }
    }
});

//SETTER: set values to variables
export const {
    setTopic,
    setTopicComponents
} = topicSlice.actions;

export const topicData = (state)=>state.topic;
export default topicSlice.reducer;