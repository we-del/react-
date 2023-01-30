/* 
 * 2022/4/28 20:12
 * author: xxx
 * @description:
 */
import TodoShow from "./TodoShow";
import TodoInput from "./TodoInput";
import {Card, Switch} from "antd";
import {useDispatch} from "react-redux";
import {changeStateToFalse,changeStateToTrue} from "../../redux/slice/sliceTest/asyncModeSlice";
export default () => {
    let dispatch = useDispatch();
    const handlerSwitch = (flag:boolean)=>{
        if(flag){
            dispatch(changeStateToTrue());
        }else{
            dispatch(changeStateToFalse());
        }
    }

    return (
        <>
            <Card title={<TodoInput/>} bordered style={{width: 500, margin: "100px auto"}}
                  extra={
                      <Switch checkedChildren={"异步"} unCheckedChildren={"同步"}
                              onChange={handlerSwitch}/>
                  }>
                <TodoShow/>
            </Card>
        </>
    );
}