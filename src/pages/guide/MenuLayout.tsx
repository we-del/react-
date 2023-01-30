/* 
 * 2022/5/7 11:11
 * author: xxx
 * @description:
 */
import {useLocation} from "react-router-dom";
import {Layout} from "antd";
const {Sider, Header, Content, Footer} = Layout;
export default (props: any) => {
    const {pathname} = useLocation();
    return (
        <>
            <Layout style={{
                width: "100%", height: "100vh",
                overflow: pathname.includes("add-merchandise") || pathname.includes("update-merchandise") ||
                pathname.includes("merchandise-details") ? "" : "hidden"
            }} hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >{props.children.props.children[0]}</Sider>
                <Layout style={{marginLeft: 200}}>

                    {props.children.props.children[1]}
                    <Footer style={{textAlign: "center"}}>为获取最佳体验，推荐使用谷歌浏览器</Footer>
                </Layout>
            </Layout>
        </>
    );
}