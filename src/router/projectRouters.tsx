/* 
 * 2022/5/8 16:58
 * author: xxx
 * @description:
 */
import {lazy} from "react";
import {ROUTERS} from "../config";

import Login from "../pages/login/Login";
import Guide from "../pages/guide/Guide";
import Home from "../pages/home/Home";
import Bar from "../pages/bar/Bar";
import Category from "../pages/category_manage/Category";
import Line from "../pages/line/Line";
import MerchandiseManage from "../pages/merchandise-manage/MerchandiseManage";
import Pie from "../pages/pie/Pie";
import RoleManage from "../pages/role-manage/RoleManage";
import UserManage from "../pages/user-manage/UserManage";
import MerchandiseDetails from "../pages/merchandise-manage/MerchandiseDetails";
import AddMerchandise from "../pages/merchandise-manage/updateModule/AddMerchandise";
import UpdateMerchandse from "../pages/merchandise-manage/updateModule/UpdateMerchandse";
// 路由懒加载，提高用户体验
// 懒加载时，antd 的menu组件每次都会抖动
// const Login = lazy(() => import("../pages/login/Login"));
// const Guide = lazy(() => import("../pages/guide/Guide"));
// const Home = lazy(() => import("../pages/home/Home"));
// const Bar = lazy(() => import("../pages/bar/Bar"));
// const Category = lazy(() => import("../pages/category_manage/Category"));
// const Line = lazy(() => import("../pages/line/Line"));
// const MerchandiseManage = lazy(() => import("../pages/merchandise-manage/MerchandiseManage"));
// const Pie = lazy(() => import("../pages/pie/Pie"));
// const RoleManage = lazy(() => import("../pages/role-manage/RoleManage"));
// const UserManage = lazy(() => import("../pages/user-manage/UserManage"));

const {
    INDEX, BAR_GRAPH, LINE_GRAPH, PIE_GRAPH, ROLE_MANAGE, USER_MANAGE, MERCHANDISE_MANAGE
    , CATEGORY_MANAGE, ICON_MANAGE, MERCHANDISE
} = ROUTERS;

export default [
    {
        path: "/login",
        element: <Login/>,
        name:'张三'
    },
    {
        path: "/guide",
        element: <Guide/>,
        name:'导航',
        children: [
            {
                path: INDEX,
                element: <Home/>
            }
            , {
                path: ICON_MANAGE + '/' + BAR_GRAPH,
                element: <Bar/>
            }
            , {
                path: MERCHANDISE + '/' + CATEGORY_MANAGE,
                element: <Category/>
            }
            , {
                path: ICON_MANAGE + '/' + LINE_GRAPH,
                element: <Line/>
            }
            , {
                path: MERCHANDISE + '/' + MERCHANDISE_MANAGE,
                element: <MerchandiseManage/>
            }
            , {
                path: ICON_MANAGE + '/' + PIE_GRAPH,
                element: <Pie/>
            }
            , {
                path: ROLE_MANAGE,
                element: <RoleManage/>
            }
            , {
                path: USER_MANAGE,
                element: <UserManage/>
            }
            , {
                path: MERCHANDISE + "/" + MERCHANDISE_MANAGE + "/" + "merchandise-details/:id",
                element: <MerchandiseDetails/>
            }
            , {
                path: MERCHANDISE + "/" + MERCHANDISE_MANAGE + "/" + "add-merchandise",
                element: <AddMerchandise/>
            }
            , {
                path: MERCHANDISE + "/" + MERCHANDISE_MANAGE + "/" + "update-merchandise",
                element: <UpdateMerchandse/>
            }
        ]
    }
]