/* 
 * 2022/5/4 12:26
 * author: xxx
 * @description:
 */
import {createSlice} from "@reduxjs/toolkit";

export interface LoginStateLimit {
    loginState: number,
    loginToken: string,
    loginUser: string
}


const state = JSON.parse(<string>localStorage.getItem("loginState"));

/**
  @description:  && 从左到右依次执行，返回为假的那个值，都为真则返回最后一个值
  @description:  || 从左到右依次执行，返回为真的那个值，都为假则返回最后一个值
  @description:  &&在做判断时，为假不会继续执行(已经知道结果)， || 为 真 不会继续执行后面的判断(已经知道结果)
*/
const initialState: LoginStateLimit = {
    loginState: (state && state.status) || -1,
    loginToken: (state && state.data.token) || "",
    loginUser: (state && state.data.user.username) || ""
}

/**
 @description: 原始状态，再刷新后，会重置状态进而回到主页面
 */
// const initialState:LoginStateLimit = {
//     loginState:  -1,
//     loginToken:"",
//     loginUser:""
// }
export const loginStateSlice = createSlice({
    name: "loginState",
    initialState,
    reducers: {
        loginSuccess(state: LoginStateLimit, {payload}) {
            console.log(payload);
            state.loginState = payload.status;
            state.loginToken = payload.data.token;
            state.loginUser = payload.data.user.username;
        },
        loginFailed(state: LoginStateLimit, {payload}) {
            state.loginState = payload.status;
        }
    }
});
export default loginStateSlice.reducer;
export const {loginSuccess, loginFailed} = loginStateSlice.actions;
