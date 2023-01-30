/* 
 * 2022/5/7 11:11
 * author: xxx
 * @description:
 */
import {Layout} from "antd";
const {Sider,Header,Content,Footer} = Layout;
export default () => {
    return (
        <>
            <Layout style={{width:"100%",height:"100%"}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </>
    );
}