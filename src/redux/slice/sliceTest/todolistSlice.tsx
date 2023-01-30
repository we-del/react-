/* 
 * 2022/4/28 21:28
 * author: xxx
 * @description:
 */

import {createSlice} from "@reduxjs/toolkit";

export interface todoInitState {
    id: string,
    data: string,
    btnShow: boolean
}

const initialState: todoInitState[] = [];
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        removeTodo(state: todoInitState[], action: any) {
            let {payload} = action;
            state.forEach((todo: any, index: number) => {
                console.log(todo);
                if (todo.id === payload) {
                    state.splice(index, 1);
                }
                console.log(todo);
            })
            console.log(state);
        },
        addTodo(state: any, action: any) {
            let {payload} = action;
            state.push(payload);
        },
        btnDisplay(state, action) {
            let {payload} = action;
            state.forEach(todo => {
                if (todo.id === payload) {
                    todo.btnShow = true;
                }
            })
        },
        btnHidden(state, action) {
            let {payload} = action;
            state.forEach(todo => {
                if (todo.id === payload) {
                    todo.btnShow = false;
                }
            })
        }
    }
});
export const asyncAdd: any = (payload: any) => (dispatch: any) => {
    setTimeout(() => {
        dispatch(addTodo(payload));
    }, 1000);
}
export const {removeTodo, addTodo, btnDisplay, btnHidden} = todoSlice.actions;
export default todoSlice.reducer;