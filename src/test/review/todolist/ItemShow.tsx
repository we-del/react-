/*
 * 2022/10/10 11:10
 * author: xxx
 * @description:
 */
import React, {useRef} from "react";
import {Todo} from "./Todolist";
import {TODO_LENGTH_LIMIT} from "./config"

// 指定了这个对象的类型，并对其进行解构
export default ({todo, setTodo}: { todo: Todo[], setTodo: any, children?: any }) => {

    // 收集input将其聚焦
    const inputRef = useRef<HTMLInputElement>(null);
    /**
     @description: 编辑todo
     */
    const editTodo = (_id: number) => {
        todo.find((i) => _id === i._id ? i.isText = true : null)
        setTodo([...todo])
        setTimeout(() => {
            inputRef.current?.focus()
        },100)
    }
    /**
     @description: 编辑todo
     */
    const editBlur = (_id: number) => {
        todo.find((i) => _id === i._id ? i.isText = false : null)
        setTodo([...todo])
    }

    /**
     @description: 更新当前内容
     */
    const updateContent = (_id: number, value: string) => {
        if (!value) {
            alert('不能为空')
            return
        }
        if (value.length > TODO_LENGTH_LIMIT) {
            alert('目标不要太长啊')
            return
        }
        todo.find((i) => _id === i._id ? i.content = value : null)
        setTodo([...todo])
    }

    /**
     @description: 删除一个todo
     */
    const removeTodo = (_id: number) => {
        if (window.confirm('确定要删除此todo吗？')) {
            todo.splice(todo.findIndex((i) => _id === i._id), 1)
            setTodo([...todo])
        }
    }

    
    /**
      @description: 改变当前todo的选中状态
    */
    const changeTodoState = (_id:number)=>{
        todo.find((i) => _id === i._id ? i.isCheck = !i.isCheck : null)
        setTodo([...todo])
    }

    /**
      @description: 控制当前todo操作按钮的显示与隐藏
    */
    const changeTodoOperateBtnShow = (_id:number,isCovered:boolean)=>{
        todo.find((i) => _id === i._id ? i.isCovered = isCovered : null)
        setTodo([...todo])
    }
    
    /**
     @description: 返回所有todo列表
     */
    const getTodos = () => todo.map(({isCheck, isText, isCovered, _id, content}) => (
        <div className="todo-show" key={_id} onMouseEnter={_=>changeTodoOperateBtnShow(_id,true)}
             onMouseLeave={_=>changeTodoOperateBtnShow(_id,false)}>
            <div className="todo-left">
                <input type="checkbox" checked={isCheck}  onChange={_=>changeTodoState(_id)}/>
                <span style={!isText ? {display: 'inline-block'} : {display: 'none'}}>{content}</span>
                <input ref={inputRef} type="text" onBlur={_ => editBlur(_id)} id="edit-input" onChange={e =>
                    updateContent(_id, e.target.value)}
                       style={isText ? {display: 'inline-block'} : {display: 'none'}} value={content}/>
            </div>
            <div className="todo-right">
                <div id="delete-btn" onClick={_ => removeTodo(_id)}   style={isCovered ? {display: 'inline-block'} : {display: 'none'}}>删除</div>
                <div id="change-btn" onClick={_ => editTodo(_id)}   style={isCovered ? {display: 'inline-block'} : {display: 'none'}}>修改
                </div>
            </div>
        </div>)
    )
    return (
        <>
            {getTodos()}
        </>
    );
}