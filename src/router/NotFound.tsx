/* 
 * 2022/5/1 17:25
 * author: xxx
 * @description:
 */
import React from "react";
import { Result, Button } from 'antd';
import {useNavigate} from "react-router-dom";
import {ShrinkOutlined} from "@ant-design/icons";
export default () => {
    const navigate = useNavigate();

    /**
      @description: 点击按钮回到主页面
    */
    const triggerRedirect = ()=>{
        navigate("/guide/home");
    }
    return (
        <Result
            status="404"
            title="404"
            icon={<ShrinkOutlined />}
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={triggerRedirect}>Back Home</Button>}
        />
    );
}