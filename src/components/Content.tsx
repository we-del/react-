/* 
 * 2022/5/6 19:44
 * author: xxx
 * @description:
 */

import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Layout, Modal, Col, Row} from "antd";
import dayjs from "dayjs";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {LoginStateLimit} from "../redux/slice/projectSlice/loginStateSlice";
import "./css/content.less";

/**
 @description: 此组件为展示内容部分，需要展示部分通过嵌套方式或者 prop方式传递，就会来完成呈现
 */
export default (props: any) => {

    // 初始化操作(结构及获得初始数据)
    let [time, setTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss '));
    const {confirm} = Modal;
    const navigate = useNavigate();
    const {Header, Content} = Layout;
    const loginState: LoginStateLimit = useSelector(({loginState}: LoginStateLimit): any => loginState);


    // 在该组件初次挂载(执行函数体的内容，不包括返回值)和卸载时(执行返回的函数)执行
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(dayjs().format('YYYY-MM-DD HH:mm:ss '));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);


    const handlerLoginOut = () => {
        confirm({
            title: '你确定要登出吗',
            icon: <ExclamationCircleOutlined/>,
            content: 'tips:退出后你的所有信息将被清除',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                localStorage.clear();
                navigate("/login");
            }
        });
    }
    return (
        <>
            <Header style={{backgroundColor: "#fff", height: "80px", margin: 0, padding: 0}}>
                <div className="user-message-show">
                    <div className="upper-part">
                        <div className="user-message">
                            <span>欢迎用户:{loginState.loginUser}</span>
                            <span onClick={handlerLoginOut}
                                  style={{color: "#ace", cursor: "pointer"}}>退出登录</span>
                        </div>
                    </div>
                    <hr className={"parallel-line"}/>
                    <div className={"lower-part"}>
                        <Row>
                            <Col className="page-hint" offset={3}>{props.cur}</Col>
                            <Col offset={3} className={"triangle-header"}/>
                            <Col xxl={{
                                offset: 13
                            }}
                                 xl={{
                                     offset: 10
                                 }}
                                 lg={{
                                     offset: 7
                                 }}

                            >
                                <div style={{float: "left"}}>{time}</div>
                                {/*天气框直接引入外部资源，导致每次加载需要流量请求*/}
                                {/*<div style={{marginLeft: 20, float: "right"}}>*/}
                                {/*    <iframe*/}
                                {/*        src="https://tianqiapi.com/api.php"*/}
                                {/*        style={{border: 0, height: 40, width: 200, marginTop: 10}}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </Col>
                        </Row>
                    </div>

                </div>
            </Header>

            <Content style={
                {
                    padding: "30px 10px 0 10px",
                    width: "100%",
                    height: "100%"
                }
            }>
                <div style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%"
                }}>
                    {props.children}
                </div>
            </Content>
        </>
    );
}