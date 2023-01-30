/* 
 * 2022/5/16 15:26
 * author: xxx
 * @description:
 */

import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

import {BaseData} from "./UpdateMerchandiseComponent";

interface Props {
    baseMsg: BaseData
}

export default class EditorDemo extends React.Component<Props> {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.baseMsg.detail)
    }

    async componentDidMount() {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent() // 后端获取的数据接口
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            // editorState: BraftEditor.createEditorState(htmlContent)
            editorState: BraftEditor.createEditorState(this.props.baseMsg.detail)
        })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML();
        this.props.baseMsg.detail = htmlContent; // 把新增的文本放置到主收集器中

    }

    handleEditorChange = (editorState: any) => {

        // 每次输入内容即向 基础对象中存储一次内容
        const htmlContent = this.state.editorState.toHTML();
        this.props.baseMsg.detail = htmlContent; // 把新增的文本放置到主收集器中
        this.setState({editorState})
    }

    render() {

        const {editorState} = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                    style={{border: "1px solid #000"}}
                />
            </div>
        )

    }

}