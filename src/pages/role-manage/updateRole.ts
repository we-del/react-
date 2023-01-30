/* 
 * 2022/5/19 11:51
 * author: xxx
 * @description:
 */
// 如果只定位到 目录，则默认会把 该目录下的 index.(js|jsx|ts|tsx)引入
import {
    getRoleListReq,
    addRoleReq,
    updateRoleAuthorityReq
} from "../../api/sendRequest/role/roleRequest";
import {UpdateUserAuthLimit} from "./RoleManage";
// 获得角色列表
export const getRoleList = async () => {
    let res = await getRoleListReq();
    console.log(res);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.data.data)
        })
    });
}

// 添加角色
export const addRole = async (roleName: string) => {
    let res = await addRoleReq(roleName);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res);
        })
    });
}

// 更新角色权限
export const updateRoleAuth = async (obj: UpdateUserAuthLimit) => {
    let res = await updateRoleAuthorityReq(obj);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res);
        })
    });
}
