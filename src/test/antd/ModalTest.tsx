/* 
 * 2022/5/12 11:37
 * author: xxx
 * @description:
 */

import React, { useState } from 'react';
import { Modal, Button } from 'antd';

/**
 @description: Modal配置项介绍
 @config:
        title = "为该Modal框的标题"
        visible = "该modal选项框是否显示，可选值 true | false，配合button完成启停"
        onOk = ”当点击ok(确认)时，调用的函数“
        onCancel = ”当点击取消时，调用的函数“
        okText = "设置 成功按钮的文本"
        cancelText = "设置 失败按钮的文本"
        centered = "居中展示 modal对话框 ， 可选值 true | false"
        closable = "是否显示可关闭按钮 ， 可选值 true | false"
        width = "可设置 对话框宽度"
        包裹的为显示的内容
 @tips:
        Modal对象下有 info,success,error,warning 四个方法，该方法接收一个对象，其对象配置和Modal配置差不多，可以显示对应效果
    的提示框

*/

export default () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};