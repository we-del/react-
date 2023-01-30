/* 
 * 2022/4/28 20:12
 * author: xxx
 * @description:
 */

import {List,Button} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {todoInitState,removeTodo,btnDisplay,btnHidden} from "../../redux/slice/sliceTest/todolistSlice";
export default () => {

    let todoData:todoInitState[] = useSelector((state: any) => {

        return state.todo;
    })
    let dispatch = useDispatch();

    const {Item} = List;
    return (
        <>
            <List
                bordered
                dataSource={todoData}
                renderItem={({id,data,btnShow}) => (
                    <Item key={id} onMouseOut={()=>{dispatch(btnHidden(id))}} onMouseOver={()=>{dispatch(btnDisplay(id))}}>
                        {data}
                        <Button type={"primary"} danger
                                style={btnShow ? {float:"right", display:"block"}:{float:"right",display:"none"}}
                                size={"small"} onClick={()=>{dispatch(removeTodo(id))}}>

                            删除</Button>
                    </Item>
                )
                }
            />
        </>
    );
}