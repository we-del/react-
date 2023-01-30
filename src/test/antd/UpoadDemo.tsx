/* 
 * 2022/5/17 10:55
 * author: xxx
 * @description:
 */

import React from "react";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {BASE_URL} from "../../config";

class Demo extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        console.log(fileList);
        fileList.forEach(file => {
            formData.append('file[]', file);
        });
        this.setState({
            uploading: true,
        });
        // You can use any AJAX library you like
        fetch(`${BASE_URL}/manage/img/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then((e) => {
                console.log(e);
                this.setState({
                    fileList: [],
                });
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                this.setState({
                    uploading: false,
                });
            });
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            name:"image",
            onRemove: (file:any) => {
                this.setState((state:any) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file:any) => {
                this.setState(state => ({
                    // @ts-ignore
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </>
        );
    }
}

export default Demo;