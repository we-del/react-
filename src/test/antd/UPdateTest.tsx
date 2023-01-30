import React from "react";
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

/**
 @description: fleList 为图片资源集，收集则图片的所有基础信息，是一个数组，数组中每个索引是一个对象(图片基础信息)
 name : 为该图片的名字  string
 status: 为当前图片的状态，不同状态对应的样式不同    error | success | done | uploading | removed
 url: 为该资源的基础路径
 percent: 为当前图片上传的百分比
 uid: 为当前图片的key ，不设置antd会自动生成
 */

/**
 @description:
 @tips: 每个图片当鼠标移入时，默认渲染底层提供的 预览和删除图标，当点击预览时 调用的时 onPreview时间，
 点击删除时，调用的时onChange事件
 */

/**
 @description: Upload 资源上组件
 action ： 为上传的后端服务器地址
 listType:  上传列表的内建样式（突变的展示方式），支持三种基本样式 text, picture 和 picture-card
 method： 发送请求的方式 。 默认 post 请求
 withCredentials： 上传是否携带 cookie 默认为 false
 onPreview : 点击预览时调用的函数
 onChange: 点击删除，上传中、完成、失败，调用的函数
 onRemove： 点击删除调用的函数

 */

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class App extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        message.info("我预览了", .5);
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = (e:any) => {
        message.info("此时图片被点击了", .5);
        console.log(e);
        console.log(e.fileList);
        this.setState({fileList:e.fileList});
    };
    handleRemove = ({fileList}: any) => {
        message.info("此时图片被点击了", .5);
        console.log(fileList);
        this.setState({fileList});
    };

    render() {
        const {previewVisible, previewImage, fileList, previewTitle} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    listType="picture-card"
                    //@ts-ignore
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={()=>{
                        return false;
                    }}
                    onRemove={(e) => {
                        message.info("删除了图片", .5);
                        console.log(e)
                    }}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </>
        );
    }
}

export default App;