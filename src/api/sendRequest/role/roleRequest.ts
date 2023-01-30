/* 
 * 2022/5/19 11:39
 * author: xxx
 * @description:
 */
 
import axios from "../../interceptor/interceptor_axios";
import {UpdateUserAuthLimit} from "../../../pages/role-manage/RoleManage";
import {HOST,PORT} from "../../../config";

// 获取角色的列表
export const getRoleListReq = ()=> axios.get(HOST+PORT+"/manage/role/list");

// 添加角色
export const addRoleReq = (roleName:string)=> axios.post(HOST+PORT+"/manage/role/add",{roleName});

// 更新角色权限
export const updateRoleAuthorityReq = (obj:UpdateUserAuthLimit)=>axios.post(HOST+PORT+"/manage/role/update",{...obj});
