/* 
 * 2022/5/11 14:37
 * author: xxx
 * @description:
 */
import React, {Component} from "react";

import {Table, Tag, Space} from 'antd';

/**
 @description: columns是配置每一个列头的数组，数组中的每一个索引为一个对象，该对象内制定每一列的规则
 @config: 常用配置项{
    title : 为该列的名字
    dataIndex: 为其列下的可以展示的对象属性，如 dataIndex：name,表示该列只展示name属性
    render(text,record,index): 是一个函数，起到对原数据的装饰作用(如添加标签样式等)，装饰的标签最终会返回到该列下
                                第一个形参为当前列匹配到的属性值(如果没有匹配到任何信息则为当前行)
                                第二个形参为当前行对象 ， 第三个形参为当前的行(对象)位于数组中的索引位置
                                当此行不需要匹配内容时，可以调用render并返回一个虚拟dom来生产一个我们需要的内容
                                render为最终该列展示的内容，return什么就展示什么
    filters: 表示过滤掉信息(过滤掉不包含选中信息的行)，此时会产生一个过滤图标，当点击此图标即可开始过滤
        是一个数组，每个数组的索引存储一个对象，该对象下有text(展示内容),value(过滤的内容),
        children(进行二次过滤,是一个数组，然后继续适配 text,value)属性
    onFilter: 当点击过滤后底层会遍历每一行然后调用此函数，再调用时把每一个过滤的条件和被被比较目标依次传入比较，因此我们只用做
        简单相等判断 ， 如 record.name.indexOf(value) === 0;(底层会根据此返回值来判断此数据是否被过滤掉，false为过滤，true不过滤)
    defaultSortOrder: 数据初始状态时，默认的排序规则 ，为一个string<"descend"|"ascend">
    sorter: 需要传入一个函数(相当于sort函数，我们可以配置排序规则)，当点击列名时调用
    sortDirections: 可以设置排列方向，是一个数组 [ ?<"ascend"> | ? <"descend">]
    filterMode: 可以选择过滤框展示的类型， 可选值有 <"tree">
    filterSearch : 可以选择是否能使用搜索方式过滤 ，可选值 true(可以搜索过滤) | false(不可以搜索过滤)
    align： 选择当前列即列内容的对齐方式，可选值 <"left"|"center"|"right">
    width: 可以设置当前列的显示宽度
    fixed: 当前列数较多，且给当前table设置了scroll属性后，我们可以使用此属性对当前重要元素进行固定显示(相当于position:fixed)
            可选值 <"left" | "right">
  }
 */
/**
 @description: table常用配置项
 @config:
 columns = "为一个数组，数组每一个索引为一个对象，该对象为当前列的信息和可接收的属性"
 dataSource = "为一个数组，数组每一个索引为一个对象，每个属性对应列中的dataIndex进行匹配(key除外)"
 rowSelection = "用来给每行数据的行头指定一个button类型 为一个对象，该对象的type属性为该button的type,
 另外可以传入一系列方法来展示和改变button的状态"
 pagination ="为一个对象，可以设置当前表单显示的数据列数如 {{pageSize:5}}"
 scroll = "为一个对象，可以设置当前表单的滑动宽高"
 title = "为一个函数，返回一个虚拟dom(组件)到表单头部"
 footer = "为一个函数，返回一个虚拟dom(组件)到表单尾部"
 */
const onFilter = (value: any, record: any) => {
    console.log("onFilter", value, record);
    return record.name.indexOf(value) === 0;
}
const renderShow = (text: any, record: any, index: any) => {
    console.log(text, record, index);
    return (
        <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
        </Space>
    );
}
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 100,
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        filterSearch:true,
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: onFilter,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        sortDirections: ['descend', "ascend"],
    },
    {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a: any, b: any) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        filterMode: 'tree',
        // filterSearch: true,
        onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
    },
];

/**
 @description: data用于收集每一行所展示的内容，是一个数组，数组里存储着每一个对象，其属性值会列名中的 dataIndex对应
 */
const data: any = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }

/**
 @description 当此Table组件发生改变后(调用onChange)，调用此函数，并传入了4个参数
 @param pagination 为当前的页签数 ， 是一个对象{current: number(当前所在页签),pageSize:number(一个页签中能显示的行数)}
 @param filters 为当前点击过滤的选项 ，是一个对象，该对象下name 数组收集着所有过滤选项
 @param sorter 为当前列的排序规则，是一个对象,
 有 column属性(存储着该列的设置信息),field属性(当前排序的字段)，order属性(当前排序的方式 "ascend"|"descend")
 @param extra 为一个对象，有个属性action 记录当前的操作("filter" | "sort" | ...) ,有个属性 currentDataSource 记录当前显示的元素
 */
function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log('params', pagination, filters, sorter, extra);
}

//@ts-ignore
export default () => <Table columns={columns} dataSource={data} onChange={onChange}/>;