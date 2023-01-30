/* 
 * 2022/5/1 17:20
 * author: xxx
 * @description:
 */
import {lazy} from "react";
import {Navigate} from "react-router-dom";
import projectRouters from "./projectRouters";
import testRouters from "./testRouters";

// 懒加载引入 ，随用随更新，增加用户体验
const NotFound = lazy(()=>import("./NotFound"));
export default [
    ... projectRouters,
    ...testRouters,
    {
        path: "/",
        element: <Navigate to={"/login"}/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
]
