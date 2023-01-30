/* 
 * 2022/5/12 12:03
 * author: xxx
 * @description:
 */
import { Form, Input, Button, Checkbox } from 'antd';

/**
 @description: Form配置项介绍
 @property: Item  ,为form中的一行数据，antd为其设置了对应的外边距
 @config:
        name = " 为该 From组件再渲染为真实dom时的id属性，其下关联的所有组件再渲染时会带上此id前缀"
        labelCol = "是一个对象，对象中有个属性span{span:number}，设置Item组件内为Input的组件的Item整体显示偏移量(相当于offset)"
        wrapperCol = "是一个对象，对象中有个属性span{span:number}，设置Item组件内为Input的组件的Input框宽度"
        onFinish = "是一个函数，当点击提交后，通过前端验证规则调用此函数"
        onFinishFailed= "是一个函数，当点击提交后，未通过前端验证规则调用此函数"

*/

/**
 @description: Form组件下 Item组件的配置项
 @config:
        label = "是一个字符串，设置显示内容"
        name = " 为该 Item组件再渲染为真实dom时的id属性，其下关联的所有组件再渲染时会带上此id前缀"
        rules = "此Item组件下Input组件的验证规则"
            max input表单中输入的最大长度   number
            min input表单输入的最小长度   number
            message 不满足限制条件时，出现的内容 string
            pattern 正则表达式匹配 RegExp
            require 必填项  ，前面会出现 * 提示   true | false
            validator 自定义匹配规则 ，接收的是一个函数，第一个参数为匹配规则(几乎不用使用 _占位接收)，第二个参数为当前input中的信息
            注意：每一次修改input框时就会触发验证
        wrapperCol = "是一个对象，该对象下常用属性offset:4 ,可以设置当前Item组件的偏移量"


*/
export default () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            style={{backgroundColor:"pink"}}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="姓名"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' ,
                        min:5,max:14,pattern:/^[a-zA-Z1-9_]*$/}
                    ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { message: '只能输入4-14位' ,
                        min:5,max:14,pattern:/^[a-zA-Z1-9_]*$/}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 24 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};