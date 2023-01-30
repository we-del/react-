/* 
 * 2022/10/10 11:10
 * author: xxx
 * @description:
 */
import React,{useRef} from "react";
import {Todo} from './Todolist'
import {TODO_LENGTH_LIMIT} from "./config";

export default (props: { todo: Todo[], setTodo: any, children?: any }) => {
    const {todo, setTodo} = props

    const inputRef = useRef<HTMLInputElement>(null)
    const curTodo: Todo = {
        content: '',
        isCheck: false,
        isText: false,
        isCovered: false,
        _id: 0
    }
    /**
     @description: 添加一个todo
     */
    const newTodo = (e: any) => {
        if (e.key.toUpperCase() === 'ENTER') {
            if (!curTodo.content) {
                alert('不能为空')
                return
            }
            curTodo._id = Date.now()
            todo.unshift(JSON.parse(JSON.stringify(curTodo)))
            setTodo([...todo])

            //@ts-ignore
            inputRef.current.value=''
        }
    }

    /**
     @description: 监听输入框的内容
     */
    const getInputContent = (val: string) => {
        if (curTodo.content.length > TODO_LENGTH_LIMIT) {
            alert('目标不要太长啊')
            return
        }
        curTodo.content = val;
    }
    return (
        <>
            <input ref={inputRef} type="text" id="todo-input" placeholder={'请输入计划'} onChange={e => getInputContent(e.target.value)}
                   onKeyUp={newTodo}/>
        </>
    );
}