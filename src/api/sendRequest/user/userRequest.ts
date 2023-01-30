/* 
 * 2022/5/18 10:46
 * author: xxx
 * @description:
 */
import axios from "../../interceptor/interceptor_axios";
import {BASE_URL, HOST, PORT} from "../../../config";
import {UserBaseMsg, UserUpdateMsg} from "../../../pages/user-manage/UserManage";
// 获取用户列表
export const getUserListReq = () => axios.get(HOST + PORT + "/manage/user/list");

// 添加用户
export const addUserReq = (obj: UserBaseMsg) => axios.post(HOST + PORT + "/manage/user/add", {...obj});

// 更新用户
export const updateUserReq = (obj: UserUpdateMsg) => axios.post(HOST + PORT + "/manage/user/update", {...obj});

// 删除用户
export const deleteUserReq = (userId: string) => axios.post(HOST + PORT + "/manage/user/delete", {userId});
