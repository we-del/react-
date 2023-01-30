/* 
 * 2022/5/18 10:49
 * author: xxx
 * @description:
 */

import {
    getUserListReq,
    addUserReq,
    updateUserReq,
    deleteUserReq
} from "../../api/sendRequest/user/userRequest";
import {UserBaseMsg, UserUpdateMsg} from "./UserManage";

// 获得角色列表
export const getUserList = async () => {
    let res = await getUserListReq();
    console.log(res.data.data.users);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.data.data)
        });
    });
}
// await 作用： 阻塞后续代码执行(不包括return 语句) ，等待目标promise确认状态后，之情其成功的回调，然后放行
// 添加用户
export const addUser = async (obj: UserBaseMsg) => {
    let res = await addUserReq(obj);
    return new Promise((resolve) => {
        setTimeout(() => {
            if (res.status === 0) {
                resolve(res)
            }
        })
    })
}

// 更新角色
export const updateUser = async (obj: UserUpdateMsg) => {
    let res = await updateUserReq(obj);
    console.log(res);
    new Promise((resolve) => {
        resolve(res);
    })
}

// 删除角色
export const deleteUser = async (userId: string) => {
    let res = await deleteUserReq(userId);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res)
        })
    })
}