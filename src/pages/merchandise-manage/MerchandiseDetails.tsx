/* 
 * 2022/5/14 15:19
 * author: xxx
 * @description:
 */
import React, {useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {Card, Button, Space, Image} from "antd";
import {LeftOutlined} from "@ant-design/icons";
//@ts-ignore
import {v4 as uuidv4} from 'uuid';
import Content from "../../components/Content";
import {
    ROUTERS, MERCHANDISE_CATEGORY, MERCHANDISE_DESCRIPTION, MERCHANDISE_DETAILS,
    MERCHANDISE_IMAGES, MERCHANDISE_NAME, MERCHANDISE_PRICE, BASE_URL, PAGE_TITLE
} from "../../config";

const {MERCHANDISE, MERCHANDISE_MANAGE} = ROUTERS;

/**
 @description:  && 返回为假的表达式，如果都为真则返回最后一个 (做逻辑判断时，碰到为假的即表达式为假不会继续判断)
 || 返回为真的哪一个表达式，如果都为真则返回最后一个(做逻辑怕地暖是，碰到为真即表达式为真，不会继续判断)
 */

/**
 @description: 工厂函数的状态转换
 */
const titleConvert = (target: string): string => {
    switch (target) {
        case "name":
            return MERCHANDISE_NAME;
        case "desc":
            return MERCHANDISE_DESCRIPTION;
        case "price":
            return MERCHANDISE_PRICE;
        case "categoryId":
            return MERCHANDISE_CATEGORY;
        case "imgs":
            return MERCHANDISE_IMAGES;
        case "detail":
            return MERCHANDISE_DETAILS;

    }
    return "";
}

export default () => {
// 解决刷新时，当前页面数据丢失问题
    let details: any = null;
    details = JSON.parse(localStorage.getItem("saveCurrentMerchandiseDetailsToShow") as string) || details;

    let location = useLocation();

    useEffect(() => {
        console.log(details);
        // 存储当前商品的信息到当前域名的存储空间里(此空间同域名共享一个存储，不同域名互相隔离)
        console.log(location);
    })
    console.log(details);
    // 写一个工厂函数返回相同相同样式不同值的数据
    const detailsFactory = (title: string, content: string): React.ReactNode => {
        title = titleConvert(title);
        console.log(title);
        return (
            <>
                <span style={{fontWeight: 700, fontSize: 20}} key={uuidv4()}>{title}:

                    {
                        <span style={{fontWeight: 400, fontSize: 14, marginLeft: 20, lineHeight: 1}}>
                            {title === MERCHANDISE_IMAGES || title === MERCHANDISE_DETAILS || title === MERCHANDISE_CATEGORY
                                ? handlerOpposite(title, content) : content}</span>
                    }
                </span>
            </>
        )
    }

    /**
     @description: 处理图片和详情的显示
     */
    const handlerOpposite = (title: string, content: string[] | string): React.ReactNode => {
        let res: React.ReactNode = null;
        if (title === MERCHANDISE_IMAGES) {
            content = content as string[];
            res = (
                <>
                    <Image.PreviewGroup>
                        {
                            content.map((url: string) => (
                                <Image width={100} height={100} src={`${BASE_URL}/upload/${url}`}/>))
                        }
                    </Image.PreviewGroup>

                </>
            );
        } else if (title === MERCHANDISE_DETAILS) {
            content = content as string;
            res = (
                <>
                    <p dangerouslySetInnerHTML={{__html: content}}/>
                </>
            );
        } else if (title === MERCHANDISE_CATEGORY) {
            let categoryList: any = JSON.parse(localStorage.getItem("categoryList") as string);
            content = content as string;
            content = categoryList[content];

            res = content;


        }
        return res;
    }

    const renderDetail = [];

    // 往内容数组里添加内容
    for (const title in details) {
        renderDetail.push(detailsFactory(title, details[title]));
    }

    // splice start:开始插入为止 ,delete 插入为止删除元素个数 ，insertEle... 插入元素个数
    // splice的修改会影响原数组
    // renderDetail.splice(1, 0, renderDetail[renderDetail.length - 1]); // 把最后一个元素插入到第二个为止(不会改变该元素的为止)
    // renderDetail.splice(renderDetail.length - 1, 1); // 删除最后一个元素
    return (
        <Content cur={PAGE_TITLE.MERCHANDISE_MANAGE}>
            <Card title={
                <Title/>
            }>
                <Space direction="vertical" size="middle">
                    {
                        renderDetail.map((item) => item)
                    }
                </Space>
            </Card>
        </Content>
    );
}

// 卡片头
const Title = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button icon={<LeftOutlined/>} type={"link"} onClick={() => {
                navigate("/guide/" + MERCHANDISE + "/" + MERCHANDISE_MANAGE)
            }}>返回</Button>
            <span style={{fontSize: 18}}>商品详情</span>
        </>
    );
}