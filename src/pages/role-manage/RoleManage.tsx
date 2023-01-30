/* 
 * 2022/5/7 16:33
 * author: xxx
 * @description:
 */
import React, {useState, useEffect} from "react";
import Content from "../../components/Content";
import {Card, Button, Table, Form, Input, Modal, Tree} from "antd";
import DayJS from "dayjs";
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

import {PAGE_TITLE, PAGE_SIZE} from "../../config";
import {getRoleList, addRole} from "./updateRole";
import AuthTree from "./AuthTree";
const {ROLE_MANAGE} = PAGE_TITLE;

// 添加角色得接口限制
export interface RoleLimit {
    menus: string[],
    _id?: string,
    name: string,
    create_time: number,
    __v?: number,
    auth_time: number,
    auth_name: string
}

// 更新角色得接口限制
export interface UpdateUserAuthLimit {
    _id: string,
    auth_name: string,
    menus: string[],
    auth_time: number
}

// 记录添加角色得信息
let addRoleName = "";

/**
 @description: 记录更新用户信息， 此数据要么以常量得形式定义在全局，要么以状态得方式定义在函数组件中
 (状态得值在初始化后不会因为组件得重绘而再次初始化 (useState得状态采取得是享元模式？即没有状态时运行初始化状态，
 有状态时使用已有得状态))
 @tips: 此信息得初始化必须在文件首次被加载时完成，不能定义在函数组件内部，因为其得数据是在点击后获取，此时会触发一次
 函数组件得重绘，导致该值又进行一次初始化，此时目标组件无法获得更新后得数据(得到得是初始化数据)
 函数组件得重绘会把所有非钩子函数在进行一次初始化赋值 (虚拟dom采取diff算法方式重绘)
 */

let curUserMsg: RoleLimit = {
    menus: [],
    name: "",
    create_time: 0,
    auth_time: 0,
    auth_name: ""
}


export default () => {

    let {Item} = Form;
    // 初始角色列表
    let [roleList, setRoleList] = useState<RoleLimit[]>([]);

    // 新增角色Modal组件
    let [modalState, setModalState] = useState<false | true>(false);

    // 设置权限Modal组件状态
    let [authModalState, setAuthModalState] = useState<false | true>(false);



    let [count, setCount] = useState<number>(0);
    useEffect(() => {
        getData();
    }, [count]);


    const getData = async () => {
        let res: any = await getRoleList();
        setRoleList(res);
    }
    console.log(roleList);

    /**
     @description: 用于更新用户权限
     */
    const handlerClick = (userMsg: RoleLimit) => {
        curUserMsg = userMsg;
        setAuthModalState(true);
    }


    // 定义列头
    const column = [
        {
            title: "角色名称",
            dataIndex: "name",
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
            render: (time: any) => DayJS(time).format('YYYY MM-DD HH:mm:ss ')
        },
        {
            title: "授权时间",
            dataIndex: "auth_time",
            render: (time: any) => DayJS(time).format('YYYY MM-DD HH:mm:ss ')
        },
        {
            title: "授权人",
            dataIndex: "auth_name"
        },
        {
            title: "操作",
            render: (userMsg: RoleLimit) => <Button type={"link"} onClick={() => {
                handlerClick(userMsg);
            }}>设置权限</Button>
        }
    ];

    /**
     @description: 当modal组件框点击确认时，触发，用于添加用户
     */
    let handlerOk = (e: any) => {
        addRole(addRoleName);
        setCount(count + 1);
        // 数据验证
        setModalState(false); //关闭modal对话框
    }

    return (
        <>
            {
                <Content cur={ROLE_MANAGE}>
                    <Card title={<Button type={"primary"} onClick={() => {
                        setModalState(true)
                    }}>添加角色</Button>}>
                        <Table rowKey={"_id"} columns={column} dataSource={roleList}
                               pagination={{pageSize: PAGE_SIZE}}/>
                    </Card>
                    <Modal title={"添加角色"} okText={"确定"} cancelText={"取消"} visible={modalState}
                           onOk={handlerOk}
                           onCancel={() => {
                               setModalState(false)
                           }}>
                        <Form name={"add-role"} wrapperCol={{span: 15}} labelCol={{span: 5}}>
                            <Item name={"add-role-input"} label={"角色名称:"}
                                  rules={[{message: "请输入角色名", required: true}]}>
                                <Input placeholder={"请输入角色名"} onChange={(e: any) => {
                                    addRoleName = e.target.value;
                                }}/>
                            </Item>
                        </Form>
                    </Modal>
                    <AuthTree curUserMsg={curUserMsg} ModalState={[authModalState,setAuthModalState]}
                              countState={[count,setCount]} key={uuidv4()}/>
                </Content>
            }
        </>
    );
}