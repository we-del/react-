/* 
 * 2022/4/29 19:02
 * author: xxx
 * @description:
 */
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
export interface ResponseLimit {
    name:string,
    url:string,
    avatar:string,
    id:number
}
export interface SendReqInitState {
    isLoad:boolean,
    awaitSearch:boolean,
    resArr:ResponseLimit[]
}
const initialState:SendReqInitState = {
    isLoad :false,
    resArr:[],
    awaitSearch:true
};

/**
 @description: 创建一个异步action,并向外暴露，当调用此异步函数后，extraReducers中的对应promise状态就会调用
 */
export const  fetchSend:any = createAsyncThunk("sendReq/fetchSend",async(payload:any)=>{
    const s: string = "stars";
    const url: string = `https://api.github.com/search/repositories?q=${payload}&sort=${s}`;
    return await fetch(url).then(res => res.json());
})
export const sendReq = createSlice({
    name:"sendReq",
    initialState,
    reducers:{
        clear(state){
            state.isLoad = true;
            state.awaitSearch = false;
            state.resArr = [];
        }
    },
    extraReducers:{
        [fetchSend.fulfilled](state:any,action:any){
            const {items} = action.payload;
            items.forEach((obj:any)=>{
                let tmpArr:ResponseLimit = {
                    name:obj.name,
                    url: obj.html_url,
                    avatar: obj.owner.avatar_url,
                    id:obj.id
                };
                state.resArr.push(tmpArr);
            });
            state.isLoad= false;
        },
        [fetchSend.rejected](state:any,action:any){
            console.log("失败了");
        }
    }
});
export default sendReq.reducer;
export const {clear} = sendReq.actions;