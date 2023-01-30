/* 
 * 2022/5/7 16:31
 * author: xxx
 * @description:
 */
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Card, Button, Table, Select, message, Input, Form} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Content from "../../components/Content";
import {getMerchandiseList, searchMerchandise, changeStateOfMerchandise} from "./updateMerchandiseOperate";
import {PAGE_SIZE, MERCHANDISE_SHOW, PAGE_TITLE} from "../../config";
import {setDetailsOfMerchandise} from "../../redux/slice/projectSlice/detailOfMerchandise";

const {Option} = Select;
const {MERCHANDISE_MANAGE} = PAGE_TITLE;
export default () => {

    // 管理返回的商品信息
    const [merchandiseList, setMerchandiseList] = useState({
        list: [], pageNum: 1, total: 0
    });
    const {list, pageNum, total} = merchandiseList;


    let curPage = JSON.parse(localStorage.getItem("currentTablePageOfMerchandise") as string) || 1;
    useEffect(() => {
        getList(curPage);
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     @param pageNum 当前所在的table页签
     @description: 获取商品列表
     */
    const getList = async (pageNum: number) => {
        let res: any = await getMerchandiseList(pageNum);

        setMerchandiseList(res);
    }

    /**
     @description: 改变商品状态
     */
    const changeState = async (val: any) => {
        let {_id, status} = val;
        // @ts-ignore
        status = (!status) + 0;
        let res: any = await changeStateOfMerchandise(_id, status);
        if (res.status === 0) {
            message.success("状态修改成功", .5);
            getList(pageNum);
        } else {
            message.warning("网络错误，稍后再试", .5);
        }
    }

    /**
     @param val 当前匹配的属性信息，如果没有匹配到任何属性，则为当前行的信息
     @param record  当前行信息
     @description: 使用 list种每个对象种的status来管理当前商品的售卖状态
     @return: table表种状态栏的数据
     */
    const showMerchandiseState = (val: any, record: any) => {
        let {status, _id} = val;
        return (
            <>
                <Button type={"primary"}
                        danger={status}
                        onClick={() => {
                            changeState(val)
                        }}
                >{status ? "下架" : "上架"}</Button>
                {status ? "在售" : "已下架"}
            </>
        )
    }


    /**
     @description: 点击详情后，完成页面跳转，并存储当前商品信息到redux
     */
    const handlerClickDetail = (val: any) => {
        // 传入对象信息
        console.log("val----", val);
        let {categoryId, desc, detail, imgs, name, price} = val;
        localStorage.setItem("saveCurrentMerchandiseDetailsToShow", JSON.stringify({
            name,
            desc,
            price,
            categoryId,
            imgs,
            detail
        }));
        dispatch(setDetailsOfMerchandise(val));
        navigate(`merchandise-details/${val._id}?a=1&b=2`);
    }

    /**
     @description: 定义表的列头
     */
    const column = [
        {
            title: "商品名称",
            dataIndex: "name",
            width: 150
        },
        {
            title: "商品描述",
            dataIndex: "desc"
        },
        {
            title: "价格",
            dataIndex: "price",
            render: (price: number) => "￥" + price,
            align: "center"
        },
        {
            title: "状态",
            render: showMerchandiseState,
            width: 100,
            align: "center"
        },
        {
            title: "操作",
            render: (val: any) => (
                <>
                    <Button type={"link"} onClick={() => {
                        handlerClickDetail(val);
                    }}>详情</Button>
                    <Button type={"link"} onClick={() => {
                        console.log(val);
                        const {name, desc, price, categoryId, imgs, detail, _id} = val;
                        localStorage.setItem("saveCurrentMerchandiseDetailsToUpdate", JSON.stringify({
                            name,
                            desc,
                            price,
                            categoryId,
                            imgs,
                            detail,
                            _id
                        }));
                        navigate("update-merchandise");
                    }}>修改</Button>
                </>)
            ,
            width: 150,
            align: "center"
        }
    ]

    return (
        <>
            {
                <Content cur={MERCHANDISE_MANAGE}>
                    <Card title={Title({setMerchandiseList, merchandiseList})}
                          extra={<Button type={"primary"} onClick={() => {
                              navigate("add-merchandise")
                          }}>添加商品 +</Button>}>
                        <Table pagination={{
                            pageSize: MERCHANDISE_SHOW, total, onChange: (e: number) => {
                                localStorage.setItem("currentTablePageOfMerchandise", JSON.stringify(e));
                                getList(e)
                            }, current: curPage
                        }}
                            // @ts-ignore
                               dataSource={list} columns={column} rowKey={"_id"} bordered
                               style={{width: "100%", height: "100%"}}/>
                    </Card>
                </Content>
            }
        </>
    );
}

const Title = (props: any) => {
    let {setMerchandiseList, merchandiseList} = props;
    let inputRef: any = useRef();
    let {pageNum, pageSize} = merchandiseList;
    /**
     @description: searchState === 0 表示没选择搜索，条件需给出提示
     searchState === 1表示名称搜索
     searchState === 2 表示描述搜索
     */

    let tmpSearchState: number = JSON.parse(localStorage.getItem("selectChoose") as string) || 0; // 临时保存状态


    /**
     @description: 处理搜索过滤
     */
    const handlerSearch = () => {
        if (tmpSearchState === 0) {
            message.warning("请选择过滤方式", .7);
            return;
        }
        let inputValue = inputRef.current.input.value.trim();
        if (inputValue === "") {
            message.warning("请输入内容", .7);
            return;
        }
        if (tmpSearchState === 1) {
            actionSearch({productName: inputValue, pageNum, pageSize});
        } else if (tmpSearchState === 2) {
            actionSearch({productDesc: inputValue, pageNum, pageSize});
        }
    }
    /**
     @description: 开始搜索过滤
     */
    const actionSearch = async (obj: any) => {

        let res = await searchMerchandise(obj);
        setMerchandiseList(res);
        message.success("更新更改", .5);
    }

    return (
        <>
            <Select defaultValue="请选择搜索方式" style={{width: 160, float: "left", marginRight: 5}} onChange={(e) => {
                if (e === "searchByName") {
                    tmpSearchState = 1;
                } else if (e === "searchByDescription") {
                    tmpSearchState = 2;
                }
                // 讲状态存入本地，解决页面更新不一致问题
                localStorage.setItem("selectChoose", JSON.stringify(tmpSearchState));

            }}>
                <Option value="searchByName">按名称搜索</Option>
                <Option value="searchByDescription">按描述搜索</Option>
            </Select>
            <Form style={{float: "left"}}>
                <Form.Item>
                    {/*@ts-ignore*/}
                    <Input placeholder={"请输入搜索关键字"} width={500} ref={inputRef} allowClear onPressEnter={handlerSearch}/>
                    <Button type={"primary"} icon={<SearchOutlined/>} onClick={handlerSearch}>搜索</Button>
                </Form.Item>

            </Form>
        </>);
}