/* 
 * 2022/5/14 16:05
 * author: xxx
 * @description:
 */

import {createSlice} from "@reduxjs/toolkit";

export interface DetailsOfMerchandise {
    name: string,
    desc: string,
    price: number,
    categoryId?: string,
    imgs: string[],
    detail: string,
    _id?: string,
}

const initialState: DetailsOfMerchandise = {
    name: "",
    desc: "",
    categoryId: "",
    price: 0,
    imgs: [],
    detail: ""
}
export const detailSlice = createSlice({
    name: "detailOfMerchandise",
    initialState,
    reducers: {
        setDetailsOfMerchandise(state: DetailsOfMerchandise, {payload}: any) {
            let {name, desc, price, imgs, detail, categoryId} = payload;
            state = {name, desc, price, imgs, detail, categoryId};
            return state;
        }
    }
});
export default detailSlice.reducer;
export const {setDetailsOfMerchandise} = detailSlice.actions;