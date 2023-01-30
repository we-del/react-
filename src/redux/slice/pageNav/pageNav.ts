/* 
 * 2022/6/28 11:55
 * author: xxx
 * @description:
 */

import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    curPage: 1,
    curState: 1,
    buttonState: 1,
    maxPage: 34
};
const pageNavStore = createSlice({
    name: "pageNav",
    initialState,
    reducers: {
        update(state, {payload}) {
            if (payload < 1 || payload > state.maxPage) return;
            state.curPage = payload;
            if (state.curPage <= 5) {
                state.curState = 1;
            } else if (state.curPage >= state.maxPage - 5) {
                state.curState = 3;
            } else {
                state.curState = 2;
            }
            if (state.curPage === 1) {
                state.buttonState = 1;
            } else if (state.curPage === state.maxPage) {
                state.buttonState = 2;
            } else {
                state.buttonState = 0;
            }
        }
    }

});
export const {update} = pageNavStore.actions;
export default pageNavStore.reducer;