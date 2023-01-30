/* 
 * 2022/5/2 18:29
 * author: xxx
 * @description:
 */

export const HOST: string = "http://localhost:";
export const PORT: string = "4000";
export const RES_SECRET: string = "atguigu_";

// 基础路径，需要和服务器上线的地址对上，这样才能完成前端代理(先去当前public文件夹下寻找资源。
// 如果没找到去后端的public下寻找，资源（接口也可以来完成共享）)
export const BASE_URL = "http://localhost:3005";

// 路由配置
export const ROUTERS = {
    INDEX: "home",
    MERCHANDISE: "merchandise",
    CATEGORY_MANAGE: "category-manage",
    MERCHANDISE_MANAGE: "merchandise-manege",
    USER_MANAGE: "user-manage",
    ROLE_MANAGE: "role-manage",
    ICON_MANAGE: "icon-manage",
    BAR_GRAPH: "bar",
    LINE_GRAPH: "line",
    PIE_GRAPH: "pie"

};

// 配置每个页面的显现
export const PAGE_TITLE = {
    INDEX: "首页",
    CATEGORY_MANAGE: "分类管理",
    MERCHANDISE_MANAGE: "商品管理",
    USER_MANAGE: "用户管理",
    ROLE_MANAGE: "角色管理",
    BAR_GRAPH: "柱状图",
    LINE_GRAPH: "折线图",
    PIE_GRAPH: "饼状图"
}

// 用于商品的展示(服务于 merchandise-manager路由)
export const PAGE_SIZE = 5; // table组件一页显示行数
export const MERCHANDISE_SHOW = 4;

// 商品细节描述(服务于 merchandise/details路由)
export const MERCHANDISE_NAME = "商品名称";
export const MERCHANDISE_DESCRIPTION = "商品描述";
export const MERCHANDISE_PRICE = "商品价格";
export const MERCHANDISE_CATEGORY = "商品分类";
export const MERCHANDISE_DETAILS = "商品详情";
export const MERCHANDISE_IMAGES = "商品图片";


// 权限分页
export const AUTHOR_PAGE = {
    HOME: "home",
    PRODS: "prods",
    CATEGORY: "category",
    PRODUCT: "product",
    USER: "user",
    ROLE: "role",
    CHARTS: "charts",
    BAR: "bar",
    LINE: "line",
    PIE: "pie"
}