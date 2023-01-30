/* 
 * 2022/5/18 16:51
 * author: xxx
 * @description:
 */

import React, {useEffect} from "react";
import {Form, Input, message, Modal, Select} from "antd";
import {UserBaseMsg, UserUpdateMsg} from "./UserManage";
import {addUser, updateUser} from "./updateUserOperate";

const {Item} = Form;
const {Option} = Select;
export default (props: {
    modalState: [any, any], userObj: UserBaseMsg, title: string, updateUserObj: UserUpdateMsg
    countState: [any, any], userList: any
}) => {
    let {modalState, userObj, title, countState, userList, updateUserObj} = props;
    let [modalIsVisible, setModalIsVisible]: any = modalState;
    let [count, setCount]: any = countState;

    /**
     @description: useEffect为副作用钩子函数，其再组件被首次加载时会执行一次形参一的函数体的内容
     然后其第二个参数为监听的状态，如果改状态改变了就执行形参一的函数体的内容(传入空数组表示不监听任何数据相当于componentDidMount)
     不传入时，表示监听全局的变化相当于 componentDidMount() componentDidUpdate()
     */
    useEffect(() => {
        form.resetFields(); // 强制重置所有的form表单
        if (title === "修改用户") {
            console.log(props.updateUserObj);
            form.setFieldsValue({username, telephone: phone, email, role: role_id});
        }
    });

    /**
     @description: 数据过滤
     */
    const dataIsSuitable = (userObj: UserBaseMsg | UserUpdateMsg): boolean => {

        if (title === "添加用户") {
            userObj = userObj as UserBaseMsg;
            let {username, password, phone, email, role_id} = userObj;
            let phonePattern = /^1\d{10}/;
            console.log(phonePattern.exec(phone));
            if (!(username && password && phone && email && role_id &&
                (phonePattern.exec(phone)))) return false;
        } else if (title === "修改用户") {
            userObj = userObj as UserUpdateMsg;
            let {username, phone, email, role_id} = userObj;
            let phonePattern = /^1\d{10}/;
            console.log(phonePattern.exec(phone));
            if (!(username && phone && email && role_id && (phonePattern.exec(phone)))) return false;

        }
        return true;

    }

    // 添加用户后，重置form表单
    const [form] = Form.useForm();
    /**
     @description: 处理modal提交
     */
    const handlerOk = () => {

        if (title === "添加用户") {
            if (!dataIsSuitable(userObj)) {
                message.error("数据不能为空，且邮箱和手机必须符合要求");
                return;
            }
            addUser(userObj); // 发送添加用户请求
        } else {
            if (!dataIsSuitable(updateUserObj)) {
                message.error("数据不能为空，且邮箱和手机必须符合要求");
                return;
            }
            updateUser(updateUserObj);
        }
        message.success("提交成功");
        form.resetFields(); // 强制刷新所有form管理的input
        setCount(count + 1); // 重绘月面，重新获得最新的列表
        setModalIsVisible(false);
    }
    let {username, phone, email, role_id} = updateUserObj;
    return (
        <Modal title={title} closable={true} visible={modalIsVisible} onOk={handlerOk}
               onCancel={() => {
                   setModalIsVisible(false)
               }} okText={"确定"} cancelText={"取消"}>
            <Form name={"add-user"} labelCol={{span: 5}} wrapperCol={{span: 15}}
                  form={form}>
                <Item name={"username"} label={"用户名"} initialValue={title === "修改用户" ? username : ""}
                      rules={[{required: true, message: '用户名不能为空'}]}
                >
                    <Input placeholder={"请输入用户名"} onChange={(e: any) => {
                        if (title === "修改用户") {
                            updateUserObj.username = e.target.value;
                        } else {
                            userObj.username = e.target.value;
                        }
                    }}/>
                </Item>

                {title === "添加用户" ?
                    <Item name={"password"} label={"密码"}
                          rules={[{required: true, message: '用户名不能为空'}]}>
                        <Input placeholder={"请输入密码"} onChange={(e: any) => {
                            userObj.password = e.target.value;
                        }}/>
                    </Item> : ""}
                <Item name={"telephone"} label={"手机号"} initialValue={title === "修改用户" ? phone : ""}
                      rules={[{required: true, message: '用户名不能为空'}]}
                >
                    <Input placeholder={"请输入手机号"} onChange={(e: any) => {

                        if (title === "修改用户") {
                            updateUserObj.phone = e.target.value;
                        } else {
                            userObj.phone = e.target.value;
                        }
                    }}/>
                </Item>
                <Item name={"email"} label={"邮箱"} initialValue={title === "修改用户" ? email : ""}
                      rules={[{required: true, message: '用户名不能为空'}]}
                >
                    <Input placeholder={"请输入邮箱"} onChange={(e: any) => {

                        if (title === "修改用户") {
                            updateUserObj.email = e.target.value;
                        } else {
                            userObj.email = e.target.value;
                        }
                    }}/>
                </Item>
                <Item name={"role"} label={"角色"}
                      rules={[{required: true, message: '用户名不能为空'}]}
                >
                    <Select showSearch placeholder="Select a person" onChange={(e) => {

                        message.info(`当前为${e}`)
                        if (title === "修改用户") {
                            updateUserObj.role_id = e;
                        } else {
                            userObj.role_id = e;
                        }
                    }}>
                        {userList && userList.roles && userList.roles.map((role: any) =>
                            (
                                <Option value={role._id} key={role._id}>{role.name}</Option>))
                        }
                    </Select>
                </Item>
            </Form>
        </Modal>
    );
}