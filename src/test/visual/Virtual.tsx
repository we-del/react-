/* 
 * 2022/9/4 11:25
 * author: xxx
 * @description:
 */
import React, {useState, useEffect} from "react";

export default () => {
    const [arrayState, setArrayState] = useState([1, 2, 3, 4, 5, 6]);
    useEffect(() => {
        console.log("当前arr", arrayState);
    }, [arrayState]);
    const changeArr = () => {
        setArrayState(arrayState.map(n => n + (Math.floor(Math.random() * 10 + 2))));
    }
    return (
        <>
            <p>{
                arrayState
            }</p>
            <hr/>
            <div>
                {/*
                    1. {} 在标签内 可以写js表达式和虚拟dom标签 ，
                    2. 如果dom标签内还想写js表达式这使用{}包裹
                    3. 1 2可以反复编写形成闭环

                    */}
                {
                    <ul>
                        {
                            arrayState.map(number => <li>{number}</li>)
                        }
                        {arrayState}
                    </ul>
                }
            </div>
            <hr/>
            <button onClick={changeArr}>改变</button>
        </>
    );
}