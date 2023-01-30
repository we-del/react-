/* 
 * 2022/5/8 10:57
 * author: xxx
 * @description:
 */
import {BaseData} from "../../../pages/merchandise-manage/updateModule/UpdateMerchandiseComponent";
import axios from "../../interceptor/interceptor_axios";
import {BASE_URL, HOST, PORT} from "../../../config";

// 获得商品列表
export const getMerchandiseListReq = ({pageNum, pageSize}: any) =>
    axios.get(HOST + PORT + "/manage/product/list", {params: {pageNum, pageSize}})

// 搜索商品
export const searchMerchandiseReq = ({productName, productDesc, pageNum, pageSize}: any) =>
    axios.get(HOST + PORT + "/manage/product/search", {
        params: productDesc ? {productDesc, pageNum, pageSize} : {productName, pageNum, pageSize}
    });

// 更新商品售卖状态
export const updateStateOfMerchandiseReq = ({productId, status}: any) =>
    axios.post(HOST + PORT + "/manage/product/updateStatus", {productId, status});


// 商品添加
export const addMerchandiseReq = (obj:BaseData) =>
    axios.post(HOST + PORT + "/manage/product/add", {...obj});

// 更新商品
export const updateMerchandiseReq = (obj:BaseData)=>
    axios.post(HOST + PORT + "/manage/product/update", {...obj});

// 图片上传
export const updateImageOfMerchandiseReq = (image: any) => {
    console.log(image);
    console.log(typeof image);
    // 必须使用前端代理才能完成图片的上传？
    return axios({method: "POST", url: BASE_URL + "/manage/img/upload", data: image});
}

// 删除图片
export const removeImagiesOfMerchandiseReq = async ({name}: any) =>
    axios.post(HOST + PORT + "/manage/img/delete", {name});


