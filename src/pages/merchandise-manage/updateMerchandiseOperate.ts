/* 
 * 2022/5/13 17:12
 * author: xxx
 * @description:
 */
import React from "react";
import {
    getMerchandiseListReq,
    searchMerchandiseReq,
    updateStateOfMerchandiseReq,
    updateImageOfMerchandiseReq,
    addMerchandiseReq,
    removeImagiesOfMerchandiseReq,
    updateMerchandiseReq
} from "../../api/sendRequest/merchandise/merchandiseRequest";
import {BaseData} from "./updateModule/UpdateMerchandiseComponent";
import {PAGE_SIZE, MERCHANDISE_SHOW} from "../../config";

/**
 @description: 获取商品列表
 */
export const getMerchandiseList = async (pageNum: number) => {
    let reqParam = {pageNum, pageSize: MERCHANDISE_SHOW};
    let res = await getMerchandiseListReq(reqParam);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.data.data)
        });
    })
}

/**
 @description: 搜索商品信息
 */
export const searchMerchandise = async ({productName, productDesc, pageNum, pageSize}: any) => {
    let reqParam = null;
    if (productDesc) {
        reqParam = {productDesc, pageNum, pageSize};
    } else {
        reqParam = {productName, pageNum, pageSize};
    }
    let res = await searchMerchandiseReq(reqParam);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.data.data)
        });
    });
}

/**
 @description: 改变单个商品的状态
 */
export const changeStateOfMerchandise = async (productId: string, status: number) => {
    let res = await updateStateOfMerchandiseReq({productId, status});

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.data)
        });
    });
}

/**
 @description: 添加商品  ,对象简写：value是一个变量保存(指向)的，且其和key值相等时可以简写，如 name = "1" {name}
 */
export const addMerchandise = async (obj: BaseData) => {
    let res = await addMerchandiseReq(obj);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.status)
        })
    });
}

/**
 @description: 更新商品
 */
export const updateMerchandise = async (obj: BaseData) => {
    let res = await updateMerchandiseReq(obj);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res)
        })
    });
}

/**
 @description: 图片上传
 */
export const updateImageOfMerchandise = async (images: string[]) => {
    const formData = new FormData(); // 创建序列化流
    images.forEach((item: any) => {
        console.log(item);
        formData.append('files[]', item);
    })
    console.log(formData);
    let res = await updateImageOfMerchandiseReq(formData);
    console.log(res);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.status)
        })
    });
}

// 删除指定图片
export const removeImageOfMerchandise = async (name: string) => {
    const res = await removeImagiesOfMerchandiseReq({name});
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res)
        })
    })
}
