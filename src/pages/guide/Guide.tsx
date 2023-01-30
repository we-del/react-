/* 
 * 2022/5/5 21:22
 * author: xxx
 * @description:
 */
import React,{lazy} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {LoginStateLimit} from "../../redux/slice/projectSlice/loginStateSlice";
import {useMatch} from "react-router-dom";

import MenuLayout from "./MenuLayout";
import MyMenu from "./MyMenu";
import logo from "../../assets/img/logo.png";
import "./css/menu.less";

const MyMenuLazy = lazy(()=>(import("./MyMenu")));
const MenuLayoutLazy = lazy(()=>(import("./MenuLayout")));

export default () => {
    // loginStateLimit只能用在组件的 render部分和return 部分？
    //  const loginState: LoginStateLimit = useSelector(({loginState}: LoginStateLimit): any => loginState);


    const loginState: LoginStateLimit = useSelector(({loginState}: LoginStateLimit): any => loginState);

    /**
     @description: 当匹配到 输入的路由时给出该配置新的配置对象
     */
    const match = useMatch("/guide"); // 解决重复渲染问题

    /**
     @description: 路由拦截，根据当前登录状态导航到对应页面
     @tips: antd配合react时，不能渲染在一个组件中同时渲染多个相同的组件，要注意逻辑编写严谨，否则报错很难定位位置
     */
    let loginInterceptor = () => {
        if (loginState.loginToken.trim() === "") { // 过滤掉没登录的情况
            return (<Navigate to={"/login"}/>);
        } else if (match !== null) { // 过滤掉误入情况
            return (<Navigate to={"/guide/home"}/>);
        }
    }

    /**
     @description: 最近一级子路由展示
     */
    let nextChildRouterShow = () => {
        return (<Outlet/>);
    }

    /**
     @description: 做一个身份检查，如果已经登录且命中的是该路由则引入主路由
     */
    return (
        <>
            {loginInterceptor()}

            <MenuLayout>
                <>
                    <div className="main-nav-menu" >
                        <div className="main-nav-menu-title">
                            <img src={logo} alt="logo"/>
                            后台管理系统
                        </div>
                        <MyMenu />
                    </div>
                    <div className="show-first-children-content" style={{width:"100%",height:"100%"}}>
                        {nextChildRouterShow()}
                    </div>
                </>
            </MenuLayout>

        </>
    );
}