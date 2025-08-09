import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    siderVisible: false,
    btnVisible: false
}

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setSiderDisplay: (state, action) => {
            state.siderVisible = action.payload;
        },
        setBtnDisplay: (state, action) => {
            state.btnVisible = action.payload;
        }
    }
});

export const {setSiderDisplay, setBtnDisplay} = headerSlice.actions;
export const headerData = (state)=>state.header;
export default headerSlice.reducer;