/* 
 * 2022/5/19 16:14
 * author: xxx
 * @description:
 */

/**
  @description: Tree 组件常用配置项
    @config:
        checkable : tree结构中是否有复选框
        onExpand : 为一个函数，当树结构被折叠或扩大时调用，函数的第一个形参为此次操作受影响的节点key值
        onSelect : 为一个函数，当某个树节点的文字本选中时调用，，函数的第一个形参为此次被选中的节点信息
        onCheck: 为一个函数，当某个树节点的复选框被选中时调用， 函数的第一个形参为此次被选中的节点的key值
        selectedKeys: 为一个数组，在初始化显示时，默认选中的节点
        checkedKeys: 为一个数组，在初始化显示时，默认展开的节点
        expandedKeys: 为一个数组，在初始化显示时，默认展开的节点
        autoExpandParent: 为一个 布尔值 true|false , 初始化时，是否展开所有树节点
        treeData: 为树结构信息，为一个数组，数组里为一个个对象
            treeData 对象配置
                title: 为此节点的展示信息
                key: 为该节点的Key值
                children: 为该树分支的子树节点
 */
import React, { useState } from 'react';
import { Tree } from 'antd';
const treeData = [
    {
        title: '内容1',
        key: '0-0',
        children: [
            {
                title: '内荣2',
                key: '0-0-0',
                children: [
                    {
                        title: '你-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

const Demo = () => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState(['0-2']);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue:any) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue:any) => {
        console.log('onCheck', checkedKeysValue);
        console.log();
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue:any, info:any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
        />
    );
};

export default Demo;