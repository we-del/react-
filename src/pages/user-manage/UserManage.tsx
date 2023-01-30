/* 
 * 2022/5/7 16:33
 * author: xxx
 * @description:
 */

import React, {useEffect, useState} from "react";

import {Card, Button, Table, Form, Select, Modal, message} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Content from "../../components/Content";
import ModalTips from "./ModalTips";
import {getUserList, deleteUser} from "./updateUserOperate";
import {PAGE_TITLE, PAGE_SIZE} from "../../config";


/**
 @description: 把时间戳转换为指定事件
 */
function getLocalTime(n: any): string {
    return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

export interface UserBaseMsg {
    username: string,
    password: string,
    phone: string,
    email: string,
    role_id: string
}

export interface UserUpdateMsg {
    _id: string,
    username: string,
    phone: string,
    email: string,
    role_id: string
}

const {USER_MANAGE} = PAGE_TITLE;
const {Item} = Form;
const {Option} = Select;

let updateUserObj = {
    _id: "",
    username: "",
    phone: "",
    email: "",
    role_id: ""
}
export default () => {

    const [modal, contextHolder] = Modal.useModal();
    // 记录对话框状态
    let [modalIsVisible, setModalIsVisible] = useState<false | true>(false);
    // 记录角色列表状态
    let [userList, setUserList]: any = useState([]);
    // 记录角色添加状态
    let [count, setCount] = useState(0);

    // 记录当前modal栏title的状态(需要强制重绘才能完成功能)
    let [title, setTitle] = useState("");


    const getData = async () => {
        let list: any = await getUserList();
        list.users = list.users.reverse();
        setUserList(list);
    }

    // 定义一个添加用户对象
    const userObj: UserBaseMsg = {
        username: "",
        password: "",
        phone: "",
        email: "",
        role_id: ""
    }

    /**
     @description: // 定义一个更新用户对象
     @tips: 该数据应该维护到状态中，因为其数据需要进行改变后再传递给另一个组件，否则只能传递初始状态(由另一个组件完成给值)
     */
    // let [updateUserObj, setUpdateUserObj] = useState<UserUpdateMsg>({
    //     _id: "",
    //     username: "",
    //     phone: "",
    //     email: "",
    //     role_id: ""
    // });


    useEffect(() => {
        getData();
    }, [count]);

    const {confirm} = Modal;

    /**
     @description: 删除指定用户
     */
    function showConfirm(user: any) {
        confirm({
            icon: <ExclamationCircleOutlined/>,
            content: `你确定要删除${user.username}吗？`,
            onOk() {
                deleteUser(user._id);
                message.success("删除成功");
                setCount(count + 1);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }


    // 列头
    const column = [
        {
            title: "用户名",
            dataIndex: "username",
            width: 200
        },
        {
            title: "邮箱",
            dataIndex: "email",
            width: 200
        },
        {
            title: "电话",
            dataIndex: "phone",
            width: 150
        }
        ,
        {
            title: "注册时间",
            dataIndex: "create_time",
            render: (val: any) => getLocalTime(val),
            width: 150
        }
        , {
            title: "所属角色",
            dataIndex: "role_id",
            render: (val: any) => {
                let role = userList.roles.find((role: any) => val === role._id);
                return role && role.name;
            },
            width: 150
        }
        , {
            title: "操作",
            render: (value: any, record: any) => {
                return (
                    <>
                        <Button type={"link"} onClick={() => {
                            console.log(value, record);
                            let {username, _id, phone, email, role_id} = value;
                            setTitle("修改用户");
                            updateUserObj = {username, _id, phone, email, role_id};
                            // setUpdateUserObj({username, _id, phone, email, role_id});
                            setModalIsVisible(true);
                        }}>修改</Button>
                        <Button type={"link"} onClick={() => {
                            showConfirm(value);
                        }}>删除</Button>
                    </>
                )
            },
            width: 200,
            align: "center"
        }
    ];

    return (
        <>
            {
                <Content cur={USER_MANAGE}>
                    <Card title={
                        <Button type={"primary"} onClick={() => {
                            setTitle("添加用户");
                            setModalIsVisible(true);
                        }}>创建用户</Button>
                    }>

                        <Table
                            /*@ts-ignore*/
                            columns={column} dataSource={userList.users} rowKey={"_id"}
                            pagination={{pageSize: PAGE_SIZE}}/>
                        <ModalTips title={title} countState={[count, setCount]} userObj={userObj}
                                   updateUserObj={updateUserObj}
                                   modalState={[modalIsVisible, setModalIsVisible]} userList={userList}/>

                    </Card>
                </Content>
            }
        </>
    );
}