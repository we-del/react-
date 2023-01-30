/* 
 * 2022/5/7 16:27
 * author: xxx
 * @description:
 */
import React, {useState, useEffect, useRef} from "react";
import {Card, Button, Modal, Table, Input, message, Form} from "antd";
import Content from "../../components/Content";
import {getCategoryList, addCategoryToServer, updateCategoryToServer, UpdateLimit} from "./updateCatory";
import {PAGE_SIZE,PAGE_TITLE} from "../../config";
const {MERCHANDISE_MANAGE} = PAGE_TITLE;

/**
 *
 @description: 此组件只负责页面展示，业务逻辑再该目录下额外开一个文件写，遵守单一职责原则，一个模块只做一件事
 */
export interface TableContent {
    name: string,
    key: any
}

export default () => {
    // 设置展示分类状态
    let [msgArr, setMsgArr]: any = useState({loading: true, msgArr: []});
    // 设置modal组件的展示与延时
    let [modalState, setModalState] = useState({
        caller: "", isVisible: false, title: "", categoryDescription: {
            name: "",
            key: ""
        }
    });
    const [form] = Form.useForm();
    // 设置更新显示状态
    let [count, setCount] = useState(0);
    let {isVisible, title, caller, categoryDescription} = modalState;
    const inputRef: any = useRef();
    // const formRef:any = useRef();
    useEffect(() => {
        getCategory();
    }, [count]);

    /**
     @description:  得到当前分类列表
     */
    const getCategory = async () => {
        let res: any = await getCategoryList();
        saveCategoryListToLocalStore(res);
        res = res.reverse();
        setMsgArr({loading: false, msgArr: res});
    }

    /**
     @description: 爆仓当前分类到本地信息，方便以后获取
     */
    interface CategoryLimit {
        name: string,
        key: string
    }

    const saveCategoryListToLocalStore = (res: CategoryLimit[]) => {
        let obj: any = {};
        res.forEach((item: CategoryLimit) => {
            obj[item.key] = item.name;
        })
        localStorage.setItem("categoryList", JSON.stringify(obj));
    }

    /**
     @description: 展示modal提示框
     */
    const showModal = (caller: string, extra?: any) => {
        if (caller === "add") {
            setModalState({
                caller: "add", isVisible: true, title: "添加分类", categoryDescription: {
                    name: "",
                    key: ""
                }
            });
        } else {
            form.setFieldsValue({category: extra.name});
            setModalState({caller: "update", isVisible: true, title: "修改分类", categoryDescription: extra});
        }
    }

    /**
     @description: 点击modal组件的取消时调用
     */
    const clickModalCancel = () => {
        concealModal();
    }

    /**
     @description: 添加分类
     */
    const addCategory = async () => {
        let categoryName: string = inputRef.current.input.value;
        let res: any = await addCategoryToServer({categoryName});
        if (res.data.status === 0) {
            concealModal(); // 关闭Modal组件
            setCount(count + 1); // 组件更新次数
        } else {
            message.error("当前分类已存在", .5);
        }
    }

    /**
     @description: 更新分类
     */
    const updateCategory = async () => {
        let {key} = categoryDescription;
        let name: string = inputRef.current.input.value;
        let obj: UpdateLimit = {
            categoryName: name,
            categoryId: key
        };
        let res: any = await updateCategoryToServer(obj);
        if (res.data.status === 0) {
            setCount(count + 1);
            concealModal();
        } else {
            message.error("网络波动原因导致数据修改失败", .5);
        }
    }

    /**
     @description: 隐藏 Modal组件
     */
    const concealModal = () => {
        form.resetFields(); // 重置form的初始字段
        setModalState({
            caller: "", isVisible: false, title: "", categoryDescription: {
                name: "",
                key: ""
            }
        });
    }
    /**
     @description: 配置列头
     */
    const columns = [
        {
            title: "商品",
            dataIndex: "name",

        },
        {
            title: "操作",
            render: (value: any) =>
                <Button type={"link"} onClick={() => {


                    showModal("update", value)
                }}
                >修改</Button>,
            width: 200,
            align: "center"
        }
    ];


    return (
        <>
            <Content cur={MERCHANDISE_MANAGE}>
                <Card extra={
                    <Button type={"primary"} onClick={() => {
                        showModal("add")
                    }}>+ 添加</Button>
                }>
                    {/*@ts-ignore*/}
                    <Table columns={columns} dataSource={msgArr.msgArr} loading={msgArr.loading}
                           pagination={{pageSize: PAGE_SIZE}}
                    />
                </Card>
                <Modal title={title} visible={isVisible} onOk={caller === "add" ? addCategory : updateCategory}
                       onCancel={clickModalCancel} okText={"确认"} cancelText={"取消"} centered={true}>
                    <Form initialValues={{remember: false}} form={form}>

                        <Form.Item rules={[{required: true, message: "分类不能为空", pattern: /^\w*/}]} label={"分类："}
                                   name={"category"}>
                            <Input
                                placeholder={"请输入信息"} ref={inputRef}
                                onPressEnter={caller === "update" ? updateCategory : addCategory}

                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </Content>
        </>
    );
}
