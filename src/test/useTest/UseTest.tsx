/* 
 * 2022/11/5 8:40
 * author: xxx
 * @description:
 */
import React, {useMemo, useCallback, memo, useState, useEffect} from "react";

export default memo(() => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(1)
    const [total, setTotal] = useState(0)

    const calcul1 = () => {
        setNum1(num1 + 1);

    }

    const calcul2 = () => {
        setNum2(num2 + 1);

    }

    const calcul3 = () => {
        console.log('calcu3')
        setTotal(num1 + num2 + 1)

    }

    // 缓存多个状态的加工后的数据，只有在指定状态发生改变的时候才会再次缓存(第二个参数数组离的状态)
    const count = useMemo(() => {
        console.log('num1或num2改变了重新计算值')
        return num1 + num2
    }, [num1])
    //缓存一个函数，只有当指定状态发生改变后才会再次缓存(第二个参数数组离的状态)
    const fn1 = useCallback(() => {
        return total + count
    }, [total, count])

    useEffect(() => {
        console.log('@count', count)
        console.log('@fn1', fn1)
    }, [])
    return (
        <>
            <h1>count:{count}</h1>
            <h2>total:{total}</h2>
            <button onClick={calcul1}>opeNum1</button>
            <button onClick={calcul2}>opeNum2</button>
            <button onClick={calcul3}>opeTotal</button>
            <button onClick={fn1}>fall</button>
        </>
    );
})