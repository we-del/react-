import React, {Suspense} from 'react';
import {useRoutes, Outlet} from "react-router-dom";
import router from "./router";
import "antd/dist/antd.less";

function App() {
    // 等待做页面优化
    // window.onbeforeunload = ()=>{
    //     localStorage.clear(); // 浏览器关闭时，清空所有记录
    // }
    let element = useRoutes(router);
    // let location = useLocation()
    // console.log('@first', location)
    return (
        <div className="App">
            {/*<button style={{zIndex: 9999, width: '100px', height: '100px',margin:'100px 300px'}}*/}
            {/*        onClick={() => {*/}
            {/*    console.log('@event', location)*/}
            {/*}}>我来显示当前路由信息*/}
            {/*</button>*/}
            {/*<p>我是app</p>*/}
            <Suspense fallback={"1"}>
                {element}
            </Suspense>
            <Outlet/>
        </div>
    );
}

export default App;
