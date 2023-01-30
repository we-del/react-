/* 
 * 2022/5/19 18:09
 * author: xxx
 * @description:
 */

import React, {useState} from "react";
import {message, Modal, Tree} from "antd";
import {RoleLimit, UpdateUserAuthLimit} from "./RoleManage";
//@ts-ignore
import {v4 as uuidv4} from 'uuid';
import {AUTHOR_PAGE} from "../../config";
import {updateRoleAuth} from "./updateRole";

const {HOME,CATEGORY,CHARTS,PIE,PRODS,PRODUCT,LINE,ROLE,BAR,USER} = AUTHOR_PAGE;
let updateUserAuth: UpdateUserAuthLimit = {
    _id: "",
    auth_name: "",
    menus: [],
    auth_time: 0
}
export default (props: { curUserMsg: RoleLimit, ModalState: [any, any], countState: [any, any] }) => {
    let {curUserMsg, ModalState, countState} = props;
    let [authModalState, setAuthModalState]: any = ModalState;
    let [count, setCount]: any = countState;
    let {menus} = curUserMsg;

    // 设置默认选中的key的状态
    let [checkedKeys, setCheckedKeys] = useState(menus ? menus : [""]);

    // 默认展开的父节点
    let [expandedKeys, setExpandedKeys] = useState(menus ? menus : ["platform-limit"]);

    // 展开父节点
    let [autoExpandParent, setAutoExpandParent] = useState(true);
    /**
     @description: 当点击展开时，改变展开的状态，完成页面重绘
     */
    const handlerExpand = (e: any) => {
        console.log(e);
        setExpandedKeys(e);
        setAutoExpandParent(false);
    }

    /**
     @description: 当点击复选框时，改变选中的所有复选框的状态
     */
    const handlerChecked = (e: any) => {
        console.log(e);
        setCheckedKeys(e);

    }

    // 定义树节点规则
    let treeData = [
        {
            title: "平台权限",
            key: "platform-limit",
            children: [
                {
                    title: "首页",
                    key: HOME
                },
                {
                    title: "商品",
                    key: PRODS,
                    children: [
                        {
                            title: "分类管理",
                            key: CATEGORY
                        },
                        {
                            title: "商品管理",
                            key: PRODUCT
                        }
                    ]
                },
                {
                    title: "用户管理",
                    key: USER
                },
                {
                    title: "角色管理",
                    key: ROLE
                },
                {
                    title: "图形图标",
                    key: CHARTS,
                    children: [
                        {
                            title: "柱状图",
                            key: BAR
                        },
                        {
                            title: "折线图",
                            key: LINE
                        }, {
                            title: "饼状图",
                            key: PIE
                        }
                    ]
                }

            ]
        }
    ];

    /**
     @description: Modal点击确认时，修改角色权限
     */
    const handlerOk = async () => {
        let _id: string = curUserMsg._id as string;
        let auth_name = JSON.parse(localStorage.getItem("loginState") as string).data.user.username;
        let menus = checkedKeys;
        let auth_time = Date.now();
        console.log("_id", typeof _id);
        updateUserAuth = {auth_name, auth_time, menus, _id};
        await updateRoleAuth(updateUserAuth);
        message.success(`${curUserMsg.name}的权限设置成功`, 1);
        setCount(count + 1);
        setAuthModalState(false);

    }
    return (
        <Modal title={`设置权限（当前角色：${curUserMsg.name}）`}
               visible={authModalState} onOk={handlerOk}
               onCancel={() => setAuthModalState(false)}>
            <Tree treeData={treeData}
                  checkable
                  onCheck={handlerChecked}
                  checkedKeys={checkedKeys}
                  expandedKeys={expandedKeys}
                  onExpand={handlerExpand}
                  autoExpandParent={autoExpandParent}
                  key={uuidv4()}
            />
        </Modal>
    );
}