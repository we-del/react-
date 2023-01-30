/* 
 * 2022/4/28 20:13
 * author: xxx
 * @description:
 */

import { Input} from "antd";
import {useDispatch,useSelector} from "react-redux";
import {addTodo,todoInitState,asyncAdd} from "../../redux/slice/sliceTest/todolistSlice";


export default  ()=> {
        const dispatch = useDispatch();
        let isAsync = useSelector((state:any)=>state.async)
        console.log("async",isAsync);

        /**
          @description: 验证是否添加todo
        */
        const additionTodo = (e:any):void=>{
            let value = e.target.value;
            if(value.trim() === "") return ;
            let todo:todoInitState = {
                id: Date.now()+"",
                data:value,
                btnShow:false
            };
            console.log("async",isAsync);
            if(isAsync){
                dispatch(asyncAdd(todo));
            }else{
                dispatch(addTodo(todo));
            }
            e.target.value = "";
        };
        return (
            <>
                <Input onPressEnter={additionTodo} placeholder={"输入你要做的事情"}/>
            </>
        );
}