/* 
 * 2022/5/12 14:49
 * author: xxx
 * @description:
 */
import {getCategoryLitReq, addCategory, updateCategory} from "../../api/sendRequest/category/categoryRequest";

import {message} from "antd";
import {TableContent} from "./Category";

// 活粉分裂列表
export let getCategoryList = async () => {
    // await会阻塞接下来的代码执行(除了return)等待目标  Promise完成状态后，await才会拿到对应的数据，并放行，因此await的执行队列
    // 前一个promise的状态结束时机确定(await再其确认了状态后立即执行)
    let res = await getCategoryLitReq();
    if (res && res.data) { // 获取到服务器数据
        let tableArr: TableContent[] = [];
        res.data.data.forEach((item: any) => {
            let showObj: TableContent = {name: "", key: ""};
            showObj.name = item.name;
            showObj.key = item._id;
            tableArr.push(showObj);
        })
        // return为同步返回，因此我们必须返回一个promise实例(也是同步执行)，
        // 然后调用方使用 await 等待此promise结果来达到阻塞后序代码执行，等该任务(宏任务)执行后，await拿到成功的回调
        // return new Promise((resolve)=>{
        //     setTimeout(()=>{resolve(tableArr)});
        // })

        message.success("列表更新成功");
        return new Promise((resolve) => {
            console.log(tableArr);
            setTimeout(() => {
                resolve(tableArr)
            });
        })
        // return tableArr;
        // setMsgArr({loading: false, msgArr: tableArr});
    } else {
        message.warning("当前网络不稳定，请售后再试");
    }
}

// 添加分类
export let addCategoryToServer = async (categoryName: any) => {
    let res = await addCategory(categoryName);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(res)});
    });
}

// 更新分类
export interface UpdateLimit {
    categoryId: string,
    categoryName: string
}

export let updateCategoryToServer = async (obj: UpdateLimit) => {
    // 我们写的函数的await调用时机是确定的，但底层写的函数的await调用时机是不确定的，
    // 因此为了我们应该返回一个promise实例，然后该promise在宏队列时确认状态，然后外部使用await等待结果即可(达成数据一致性)
    let res = await updateCategory(obj);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(res)});
    });
}