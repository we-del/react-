/* 
 * 2022/10/10 11:08
 * author: xxx
 * @description:
 */
import React, {useState,useEffect} from "react";
import Dayjs from 'dayjs'

import InputEntry from "./InputEntry";
import ItemShow from "./ItemShow";
import './css/todolist.less'

export type Todo = {
    content: string,
    _id: number,
    isCheck: boolean,
    isCovered: boolean,
    isText: boolean
}

export default () => {

    const [todo, setTodo] = useState([{
        content: 'test1',
        _id: Date.now(),
        isCheck: false,
        isCovered: false,
        isText: false
    }] as Todo[])


    const [isAllChecked, setIsAllChecked] = useState(false)
    /**
     @description: 当前完成的任务个数
     */
    const getDoneNumber = () => todo.filter((to) => to.isCheck).length

    /**
     @description: 清除所有已经完成的任务
     */
    const clearAll = () => {
        if(window.confirm('你真的要清除所有任务吗？')){

            while (true) {
                const n = todo.findIndex((t) => t.isCheck);
                if (n !== -1) {

                    todo.splice(n, 1)
                } else break;
            }
            setTodo([...todo])
        }
    }

    /**
     @description: 反选所有todo
     */
    const selectAll = () => {
        if (!isAllChecked)
            todo.forEach(t => t.isCheck = true)
        else todo.forEach(t => t.isCheck = false)
        setTodo([...todo])
        setIsAllChecked(!isAllChecked)
    }
    useEffect(()=>{
        if(!todo.length) setIsAllChecked(false)
        console.log('@day1',Dayjs('2022-10-09T06:35:41.240369Z'));
        console.log('@day2',Dayjs('2022-10-09T06:35:41.240369Z').format('YYYY-MM-DD HH:mm:ss '));
    },[todo])
    return (
        <>
            <div id="todolist">
                <div id="todo-header">
                    <InputEntry todo={todo} setTodo={setTodo}/>
                </div>
                <div id="todo-content">
                    <ItemShow todo={todo} setTodo={setTodo}/>
                </div>
                <div id="todo-footer">
                    <div className="left-operate">
                        <input type="checkbox" checked={isAllChecked} onChange={selectAll}/>
                        <span>已完成 {getDoneNumber()} / 全部 {todo.length}</span>
                    </div>
                    <div className="right-operate" onClick={clearAll}>
                        清除已完成任务
                    </div>
                </div>
            </div>
        </>
    );
}