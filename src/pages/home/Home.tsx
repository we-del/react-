/* 
 * 2022/5/4 16:31
 * author: xxx
 * @description:
 */

import Content from "../../components/Content";
import {PAGE_TITLE} from "../../config";
const {INDEX} = PAGE_TITLE;
export default () => {


    return (
        <>
            {
                <Content cur={INDEX}>
                    <h1 style={{margin: "0 auto"}}>this is the home</h1>
                </Content>
            }
        </>
    );
}