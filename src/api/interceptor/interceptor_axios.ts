/* 
 * 2022/5/2 18:35
 * author: xxx
 * @description:
 */
import axios from "axios";
import Qs from "qs";
import {message} from "antd";
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {RES_SECRET} from "../../config";

axios.defaults.timeout = 2000; // 设置依次请求最多等待市场 2s
// 请求拦截器
axios.interceptors.request.use((config) => {
    let {method, data} = config;

    // 开启浏览器进度条
    NProgress.start();
    // 如果是Post请求，后端需要使用 app.use(express.json())中间件进行解析，否则我们就需要使用Qs库做一个包装
    if (method?.toLocaleUpperCase() === "POST") {
        config.data = Qs.stringify(data);
    }

    // 在对一接口发送请求是要携带token因此需要加上特殊的请求头
    // console.log(config);
    let res = JSON.parse(<string>localStorage.getItem("loginState"));
    if (res) {
        // console.log(res);
        let {data} = res;
        // @ts-ignore
        config.headers.Authorization = RES_SECRET + data.token;
    }
    console.log(config);
    return config;
})

// 响应拦截器
axios.interceptors.response.use((res) => {
    console.log(res);
    NProgress.done();
    return res;
}, (err) => { // 出现网络错误
    // 后序再来改变state状态表示网络错误
    NProgress.done(); // 请求响应完毕
    // 返回一个fulfill状态的promise但值为undefined,前端可以以此做判断
    console.log(err);
    message.warning("网络错误");
    return Promise.resolve(undefined);
})
export default axios;
