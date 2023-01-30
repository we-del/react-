/* 
 * 2022/5/1 17:42
 * author: xxx
 * @description:
 */
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Form, Input, Button, message} from "antd";
import {loginReq} from "../../api/sendRequest/login/loginRequest";
import {loginSuccess, loginFailed} from "../../redux/slice/projectSlice/loginStateSlice";
import "./css/login.less";
import logo from "../../assets/img/logo.png";

export default () => {

    const dispatch = useDispatch();
    // 拿到store管理的loginState状态

    let navigate = useNavigate();
    /**
     @description: 符合前端验证发送就向接口发起请求
     */
    const loginHandlerOnFinishSuccess = async ({username, password}: any) => {
        let res = await loginReq(username, password);
        console.log(res);
        // 拦截网络错误情况
        if(res === undefined){
            message.warning("网络错误", 1);
            return;
        }

        let {data} = res;
        if (data !== undefined && data.status === 0) {
            dispatch(loginSuccess(data));
            message.success("登录成功", 1);
            saveDateToLocalStorage(data);
            navigate("/guide/home");
        } else if (data !== undefined && data.status === 1) {
            message.error("账号或密码错误", 1);
        }
    }


    /**
     @param data 为需要爆粗你的对象
     @description: 存储登录信息到用户的localStorage中
     @return:
     */
    const saveDateToLocalStorage = (data: any) => {
        localStorage.setItem("loginState", JSON.stringify(data));
    }

    /**
     @description:  不符合前端验证则提示错误
     */
    const loginHandlerOnFinishFailed = (e: any) => {
        console.log(e);
        message.error("请按要求输入", 1);
    }

    /**
     @description: input框验证规则
     */
    const verifyConfig = (_: any, value: string) => {
        let reg = /^[a-zA-Z\d_]+$/;
        // 想正确的条件很简单，想错误的条件很难想全，因此我们只用列出满足条件的判断，然后取反就是不满足条件
        if (value === undefined) return Promise.reject(new Error("表单不能为空"));
        if (!(value.length >= 5 && value.length <= 15)) {
            return Promise.reject(new Error("长度需大于4位小于16位"));
        }
        if (!reg.exec(value)) return Promise.reject(new Error("只能输入字母数字或下划线"));
        return Promise.resolve("");
    }

    /**
     @description: 点击提交按钮时的反馈
     */

    let {Item} = Form;
    return (
        <>
            <div className="login_bg">
                <h1>
                    <img src={logo} alt="logo"/>
                    后台管理系统
                </h1>
                <div className="login-form-commit">
                    <div className="login-form-commit-title">
                        用户登录
                    </div>
                    <Form
                        name="login-form-region"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        onFinish={loginHandlerOnFinishSuccess}
                        onFinishFailed={loginHandlerOnFinishFailed}
                        autoComplete="off"
                    >
                        <Item
                            label="用户名"
                            name="username"
                            rules={[{validator: verifyConfig}]}
                        >
                            <Input/>
                        </Item>

                        <Item
                            label="密码"
                            name="password"
                            rules={[{validator: verifyConfig}]}

                        >
                            <Input.Password autoComplete="on"/>
                        </Item>

                        <Item wrapperCol={{offset: 8, span: 20}}
                              labelCol={{span: 6}}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>

        </>
    );
}