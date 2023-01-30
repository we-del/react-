/* 
 * 2022/5/6 15:46
 * author: xxx
 * @description:
 */
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Menu, MenuProps} from 'antd';
import {
    HomeOutlined, MailOutlined, AppstoreAddOutlined,
    BarsOutlined, DatabaseOutlined, UserOutlined, AreaChartOutlined
    , BarChartOutlined, LineChartOutlined, PieChartOutlined
} from '@ant-design/icons';
import {ROUTERS, AUTHOR_PAGE} from "../../config";

const {
    INDEX, MERCHANDISE, CATEGORY_MANAGE, MERCHANDISE_MANAGE, USER_MANAGE,
    ROLE_MANAGE, ICON_MANAGE, BAR_GRAPH, LINE_GRAPH, PIE_GRAPH
} = ROUTERS;

const {HOME, CATEGORY, CHARTS, PIE, PRODS, PRODUCT, LINE, ROLE, BAR, USER} = AUTHOR_PAGE;


type MenuItem = Required<MenuProps>['items'][number];

/**
 @description: 工厂函数，用于生成导航栏的规则
 */
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

// 获取当前用户可观看的权限范围


// 记录当前页面，避免重复渲染
let curPage = INDEX;

/**
 @description: 每次选中第一个导航Sider函数会重新调用依次
 */
const Sider = () => {

    const navigate = useNavigate(); //

    const {pathname} = useLocation(); // 获得当前路由信息
    const curRoute = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    let selectedPage = localStorage.getItem("curPage") || INDEX;


    /**
     @description: 配置导航栏规则
     */
    let items: MenuProps['items'] = []
    let menus: string[] = [];
    try {
        menus = JSON.parse(localStorage.getItem("loginState") as string).data.user.role.menus;
    } catch (e) {
    }

    let [] = useState([]);


    console.log(menus);
    if (!(menus.length > 0)) {
        // 说明是 admin(超级管理员)登录
        items = [
            getItem('首页', INDEX, <HomeOutlined/>),
            getItem('商品', MERCHANDISE, <AppstoreAddOutlined/>, [
                getItem('分类管理', CATEGORY_MANAGE,
                    <BarsOutlined/>),
                getItem('商品管理', MERCHANDISE_MANAGE,
                    <DatabaseOutlined/>)
            ]),
            getItem('用户管理', USER_MANAGE, <MailOutlined/>),
            getItem('角色管理', ROLE_MANAGE, <UserOutlined/>),
            getItem('图标管理', ICON_MANAGE, <AreaChartOutlined/>, [
                getItem('柱状图', BAR_GRAPH, <BarChartOutlined/>),
                getItem('折线图', LINE_GRAPH,
                    <LineChartOutlined/>),
                getItem('饼状图', PIE_GRAPH, <PieChartOutlined/>)
            ]),
        ];
    } else {
        // 指定用户登录
        menus = menus as string[];
        items = [
            menus.findIndex((page: string) => page === HOME) !== -1 ? getItem('首页', INDEX, <HomeOutlined/>) : null,
            menus.findIndex((page: string) => page === PRODS) !== -1 ? getItem('商品', MERCHANDISE,
                <AppstoreAddOutlined/>, [
                    menus.findIndex((page: string) => page === CATEGORY) !== -1 ? getItem('分类管理', CATEGORY_MANAGE,
                        <BarsOutlined/>) : null,
                    menus.findIndex((page: string) => page === PRODUCT) !== -1 ? getItem('商品管理', MERCHANDISE_MANAGE,
                        <DatabaseOutlined/>) : null
                ]) : null,
            menus.findIndex((page: string) => page === USER) !== -1 ? getItem('用户管理', USER_MANAGE,
                <MailOutlined/>) : null,
            menus.findIndex((page: string) => page === ROLE) !== -1 ? getItem('角色管理', ROLE_MANAGE,
                <UserOutlined/>) : null,
            menus.findIndex((page: string) => page === CHARTS) !== -1 ? getItem('图标管理', ICON_MANAGE,
                <AreaChartOutlined/>, [
                    menus.findIndex((page: string) => page === BAR) !== -1 ? getItem('柱状图', BAR_GRAPH,
                        <BarChartOutlined/>) : null,
                    menus.findIndex((page: string) => page === LINE) !== -1 ? getItem('折线图', LINE_GRAPH,
                        <LineChartOutlined/>) : null,
                    menus.findIndex((page: string) => page === PIE) !== -1 ? getItem('饼状图', PIE_GRAPH,
                        <PieChartOutlined/>) : null
                ]) : null,
        ];
    }


    // 避免刷新时错误选中
    switch (curRoute) {
        case INDEX:
            selectedPage = INDEX;
            break;
        case CATEGORY_MANAGE:
            selectedPage = CATEGORY_MANAGE;
            break;
        case  MERCHANDISE_MANAGE:
            selectedPage = MERCHANDISE_MANAGE;
            break;
        case USER_MANAGE:
            selectedPage = USER_MANAGE;
            break;
        case ROLE_MANAGE:
            selectedPage = ROLE_MANAGE;
            break;
        case BAR_GRAPH:
            selectedPage = BAR_GRAPH;
            break;
        case LINE_GRAPH:
            selectedPage = LINE_GRAPH;
            break;
        case PIE_GRAPH:
            selectedPage = PIE_GRAPH;
            break;
    }
    /**
     @description: 用于路由跳转
     */
    const onClick: MenuProps['onClick'] = e => {

        if (curPage === e.key) return; // 减少页面无效重绘
        curPage = e.key;
        // 做一个排我，即自己点击自己无响应
        switch (e.key) {
            case INDEX:
                navigate(INDEX);
                break;
            case CATEGORY_MANAGE:
                navigate(MERCHANDISE + "/" + CATEGORY_MANAGE);
                break;
            case MERCHANDISE_MANAGE:
                navigate(MERCHANDISE + "/" + MERCHANDISE_MANAGE);
                break;
            case USER_MANAGE:
                navigate(USER_MANAGE);
                break;
            case ROLE_MANAGE:
                navigate(ROLE_MANAGE);
                break;
            case BAR_GRAPH:
                navigate(ICON_MANAGE + "/" + BAR_GRAPH);
                break;
            case LINE_GRAPH:
                navigate(ICON_MANAGE + "/" + LINE_GRAPH);
                break;
            case PIE_GRAPH:
                navigate(ICON_MANAGE + "/" + PIE_GRAPH);
                break;

        }

    };

    // 存储当前页签
    localStorage.setItem("curPage", selectedPage);

    return (
        <Menu
            onClick={onClick}
            style={{width: "100%", height: "90%"}}
            defaultSelectedKeys={[selectedPage]}
            defaultOpenKeys={[pathname.includes(MERCHANDISE) ? MERCHANDISE : "",
                pathname.includes(ICON_MANAGE) ? ICON_MANAGE : ""]}
            mode="inline"
            items={items}
        />
    );
};

export default () => <Sider/>;