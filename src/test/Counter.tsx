/* 
 * 2022/5/1 17:59
 * author: xxx
 * @description:
 */
import {useState} from "react";
export default (w:any,e:any) => {
    let [count, setCount] = useState(0);
    console.log("update");
    console.log(w,e);
    return (
        <>
            <h1>当店计数为：{count}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}>+1
            </button>
        </>
    );
}