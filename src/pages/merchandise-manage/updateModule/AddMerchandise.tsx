/* 
 * 2022/5/15 19:10
 * author: xxx
 * @description:
 */
import React from "react";
import UpdateMerchandiseComponent from "./UpdateMerchandiseComponent";
import Content from "../../../components/Content";
import {PAGE_TITLE} from "../../../config";

const {MERCHANDISE_MANAGE} = PAGE_TITLE;
export default () => {
    return (
        <Content cur={MERCHANDISE_MANAGE}>
            <UpdateMerchandiseComponent title={"商品添加"}/>
        </Content>
    );
}