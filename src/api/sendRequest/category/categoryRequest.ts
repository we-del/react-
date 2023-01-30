/* 
 * 2022/5/8 11:07
 * author: xxx
 * @description:
 */
import axios from "../../interceptor/interceptor_axios";

import {HOST, PORT} from "../../../config";
// 获取分类列表
export const getCategoryLitReq = () => axios.get(HOST + PORT + "/manage/category/list");

// 添加分类
export const addCategory = ({categoryName}: any) => axios.post(HOST + PORT + "/manage/category/add", {categoryName});

// 更新分类
export const updateCategory = ({categoryId, categoryName}: any) =>
    axios.post(HOST + PORT + "/manage/category/update", {categoryId, categoryName});