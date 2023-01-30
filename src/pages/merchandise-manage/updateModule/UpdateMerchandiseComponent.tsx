/* 
 * 2022/5/15 17:59
 * author: xxx
 * @description:
 */
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Button, Select, message, Input, Form} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import RichTextComponent from "./RichTextComponent";
import UpdateImagesComponent from "./UpdateImagesComponent";
import {
    addMerchandise,
    updateImageOfMerchandise,
    removeImageOfMerchandise,
    updateMerchandise
} from "../updateMerchandiseOperate";

const {Item} = Form;
const {Option} = Select;

export interface BaseData {
    categoryId: string,
    name: string,
    price: string,
    desc: string,
    detail: string,
    imgs: string[],
    _id?: string
}

// 判断是否未相等的数据
const isEqual = (obj1: BaseData, obj2: BaseData) => {
    if (obj1.categoryId !== obj2.categoryId || obj1.name !== obj2.name || obj1.price !== obj2.price ||
        obj1.detail !== obj2.detail || JSON.stringify(obj1.imgs.sort()) !== JSON.stringify(obj2.imgs.sort())) {
        return false;
    }
    return true;
}


export default (props: { title: string }) => {


    const navigate = useNavigate();

    // 用于传递修改信息 (当点击添加时为此状态)
    let baseMsg: BaseData = {
        categoryId: "",
        name: "",
        price: "",
        desc: "",
        detail: "",
        imgs: []
    }
    let copyBaseMsg = JSON.parse(JSON.stringify(baseMsg));
    // 当此页面为修改商品状态时，存储需要删除的图片名，并做修改

    const removedImgsList: string[] = [];

    // 处理上传图片然后刷新导致浪费空间问题
    // useEffect(() => {
    //     return () => {
    //         baseMsg.imgs.forEach((img: string) => removeImageOfMerchandise(img))
    //     }
    // }, [])

    if (props.title === "商品修改") {
        const {categoryId, desc, detail, imgs, name, price, _id} = JSON.parse(
            localStorage.getItem("saveCurrentMerchandiseDetailsToUpdate") as string);
        baseMsg = {categoryId, desc, detail, imgs, name, price, _id};
        copyBaseMsg = JSON.parse(JSON.stringify(baseMsg));
        console.log(baseMsg);
    }

    // 获取分类列表用于展示
    const categoryObj: any = JSON.parse(localStorage.getItem("categoryList") as string);

    /**
     @description: 过滤掉不需要更新的情况
     */
    const isUselessClick = (): boolean => {
        // 过滤错误情况
        for (const key in baseMsg) {
            // @ts-ignore
            if (!baseMsg[key]) {
                return true;
            }
        }
        // 数组判断会显示bug 因此需要再进行单独的一次判断
        if (baseMsg.imgs.length <= 0) {
            return true;
        }
        return false;
    }
    /**
     @description: 点击提交后向数据库更新信息
     */
    const handlerClick = async () => {

        if (isUselessClick()) {

            message.error("必须全部填写", .5)
            return ;
        }


        if (props.title === "商品添加") {
            let addRes = await addMerchandise(baseMsg);

            // 自定义向后端传送图片有问题，因此我们进行优化不发送请求，让Upload组件自己发送
            // let imgRes = await updateImageOfMerchandise(imgs);

            if (addRes) {
                message.success("商品添加成功", .5);
                //  当点击确认时，移除所有需要删除的图片
                removedImgsList.forEach((img: string) => {
                    removeImageOfMerchandise(img);
                })
                navigate(-1); // 添加成功，退回到一界面
            } else message.warning("商品添加意外(可能网络错误)", .5);
        } else if (props.title === "商品修改") {
            if (!isEqual(baseMsg, copyBaseMsg)) {
                // 请输入 img中 缓存的已经删除的数据
                // const singleImg = getSingleImg(baseMsg.imgs, removedImgsList);
                // console.log(baseMsg);
                // baseMsg.imgs = singleImg;

                updateMerchandise(baseMsg);
                removedImgsList.forEach((img: string) => { // 当点击确认时，移除服务器本次操作中需要删除的图片
                    removeImageOfMerchandise(img);
                })
                navigate(-1); // 添加成功，退回到一界面
            } else {
                message.warning("你没有产生任何修改");

            }
        }

    }
    return (
        <>
            <Card title={<Title title={props.title} baseData={baseMsg} removedImgsList={removedImgsList}/>}>
                <Form name={"update-merchandise"} labelCol={{span: 4}} wrapperCol={{span: 12}}>
                    <Item name={"merchandise-name"} label={"商品名"}
                          rules={[{message: "输入不能为空", required: true}]}>
                        <Input placeholder={"请输入商品名称"} defaultValue={baseMsg.name} onChange={(e: any) => {
                            baseMsg.name = e.target.value
                        }}/>
                    </Item>
                    <Item name={"merchandise-desc"} label={"商品描述"} rules={[{message: "输入不能为空", required: true}]}>
                        <Input placeholder={"请输入商品描述"} defaultValue={baseMsg.desc} onChange={(e: any) => {
                            baseMsg.desc = e.target.value
                        }}/>
                    </Item>
                    <Item name={"merchandise-price"} label={"商品价格"} rules={[{message: "输入不能为空", required: true}]}>
                        <Input placeholder={"请输入商品价格"} defaultValue={baseMsg.price} onChange={(e: any) => {
                            baseMsg.price = e.target.value
                        }} prefix={"￥"}/>
                    </Item>
                    <Item name={"merchandise-"} label={"商品分类"} rules={[{message: "输入不能为空", required: true}]}>
                        <Select
                            showSearch
                            placeholder="搜索或下拉选择分类"
                            optionFilterProp="children"
                            defaultValue={categoryObj[baseMsg.categoryId]}
                            onChange={(e) => {
                                baseMsg.categoryId = e;
                                console.log(e);
                            }}
                        >
                            {
                                Object.keys(categoryObj).map((key: any) =>
                                    <Option value={key} key={key}>{categoryObj[key]}</Option>)
                            }
                        </Select>
                    </Item>
                    <Item name={"merchandise-name"} label={"商品图片"} rules={[{message: "输入不能为空", required: true}]}>
                        <UpdateImagesComponent baseMsg={baseMsg} removedImgsList={removedImgsList}/>
                    </Item>
                    <Item name={"merchandise-detail"} label={"商品详情"}>
                        <RichTextComponent baseMsg={baseMsg}/>
                    </Item>
                    <Item name={"commit-message"} wrapperCol={{offset: 3}}>
                        <Button type={"primary"} onClick={handlerClick}>提交</Button>
                    </Item>
                </Form>
            </Card>
        </>
    );
}

const Title = (props: { title: string, baseData: BaseData, removedImgsList: any }) => {
    const navigate = useNavigate();
    const imgsCopy = JSON.parse(JSON.stringify(props.baseData));
    const handlerClick = () => {
        // 此处处理之前上传到服务器的尚未添加成功的商品的图片(因为Upload组件再传入图片时，默认向服务器上传图片)
        const {baseData} = props;
        if (props.title === "商品添加") {
            // 删除全部已添加到服务端的图片数据，不管其是否点击删除
            baseData.imgs.forEach(async (name) => {
                await removeImageOfMerchandise(name);
            });

        } else if (props.title === "商品修改") {
            // 点击取消，即恢复数据库的图片的原装即可(因为Upload组件特性，当点击上传后，会将图片提交到数据库)
            let originLen = imgsCopy.imgs.length; // 原数据中 img数组长度
            let curLen = baseData.imgs.length; // 新数据中 img数组长度
            if (curLen > originLen) {
                for (let i = originLen; i < curLen; i++) {
                    removeImageOfMerchandise(baseData.imgs[i]);
                }
            }
        }
        props.removedImgsList.forEach((img: string) => {
            removeImageOfMerchandise(img);
        })
        setTimeout(() => {
            navigate(-1); // 退回到上一界面
        })
    }
    return (
        <>
            <Button icon={<LeftOutlined/>} type="link" onClick={handlerClick}>返回</Button>
            <span style={{fontSize: 20, marginLeft: 10}}>{props.title}</span>
        </>
    );
}