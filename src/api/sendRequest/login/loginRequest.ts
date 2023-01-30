/* 
 * 2022/5/2 18:42
 * author: xxx
 * @description:
 */
import axios from "../../interceptor/interceptor_axios";
import {HOST, PORT} from "../../../config";

export const loginReq =  (username: string, password: string) =>  axios.post(HOST + PORT + "/login", {
    username,
    password
});