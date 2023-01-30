/* 
 * 2022/4/29 17:00
 * author: xxx
 * @description:
 */
 import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
 const asyncSlice = createSlice({
    name: "isAsync",
    initialState,
    reducers: {
        changeStateToTrue(state) {
            console.log(state);
            state = true;
            return state;
        },
        changeStateToFalse(state){
            state = false;
            return state;
        }
    }
})
export const {changeStateToFalse,changeStateToTrue} = asyncSlice.actions;
export default asyncSlice.reducer;