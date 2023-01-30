import React, {Component} from "react";
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {BaseData} from "./UpdateMerchandiseComponent";
import {BASE_URL} from "../../../config";

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

// 转换为 base64编码格式
function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

interface Props {
    baseMsg: BaseData,
    removedImgsList: string[]
}

let imgsFactory = (url: string) => ({
    uid: url,
    name: url,
    status: "done",
    url: `${BASE_URL}/upload/${url}`,
})

export default class UpdateImages extends React.Component<Props> {

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        // @ts-ignore
        fileList: this.props.baseMsg.imgs.map((img) => imgsFactory(img))
        // 此处需要做删除逻辑和添加图片的逻辑判断，在Merchandise中
    };

    handleCancel = () => this.setState({previewVisible: false});


    /**
     @description: 点击预览时调用
     */
    handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };


    /**
      @description: 删除指定图片(添加到待删除数组中，等待删除)
    */
     removeImg = (file:any)=>{
        // 需要删除原有的图片
        let {removedImgsList} = this.props;
        let name: string = "";
        // 获得存储到服务器后的图片名
        //@ts-ignore
        name = (/^image\w*/.exec(file.name) && /^image\w*/.exec(file.name).input) || file.response.data.name;

        // 向删除数组中添加一个删除图片 ,再点击删除后，会被删除
        removedImgsList.push(name);

        // 删除提交列表里的相同元素
        let index = this.props.baseMsg.imgs.findIndex((item) => item === name)
        console.log(index);
        this.props.baseMsg.imgs.splice(index, 1);
    }

    /**
     @description: 复变状态改变时调用(上传，更新，删除，三种状态会体现在file的status属性下)，
     */
    handleChange = (files: any) => {
        // fileList 为当前的文件列表，file为当前产生修改的文件
        const {fileList, file} = files;
        // 只处理状态为done且上传成功的图片
        if (fileList && file.status === "done" && file.response.status === 0) {
            this.props.baseMsg.imgs.push(file.response.data.name);
        } else if (file.status === "removed") {
           this.removeImg(file);
        }
        this.setState({fileList: fileList});
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
                    action={BASE_URL + "/manage/img/upload"}
                    method={"post"} // 必须要写上传方式
                    name={"image"}
                    listType="picture-card"
                    //@ts-ignore
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    // beforeUpload={() => { // 不让图片自动上传
                    //     return false;
                    // }}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    onCancel={this.handleCancel}
                >
                    {[1,3].map((item:any)=> <div>{item}</div>)}
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </>
        );
    }
}