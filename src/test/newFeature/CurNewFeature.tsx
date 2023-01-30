/* 
 * 2022/5/8 16:42
 * author: xxx
 * @description:
 */
import React, {Component, PureComponent, useState, useEffect, useRef} from "react";

export default class A extends PureComponent {
    state = {
        isError: ""
    }

    // 用于捕获错误并维护到状态中
    static getDerivedStateFromError(error: any) {

        return {isError: error};
    }

    // 当发生错误时调用的此生命周期函数
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error);
        console.log(errorInfo);
    }

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {

        return (
            <>
                <h1>我是A组件</h1>
                {this.state.isError ? <h1>网络不稳定，稍后再试</h1> :

                    <B count={12} render={(name: any) => (<C name={name}/>)}/>}

            </>
        );
    }
}

interface Props {
    count?: number;
    render?: any;
}

interface State {

}

class B extends PureComponent<Props, State> {
    render(): React.ReactNode {
        console.log(this.props);
        return (
            <>
                <h1>我是B组件</h1>
                {this.props.render("张三")}
            </>
        );
    }
}

interface CState {

}

interface CProps {
    name?: string;
}

class C extends PureComponent<CProps, CState> {
    constructor(props:any) {
        super(props);
        this.state = {a: 1};
    }
    render(): React.ReactNode {
        // @ts-ignore
        let {a} = this.state;
        return (
            <>
                <h1>我是C组件</h1>
                {a.map((item:any)=>{
                    console.log(item);
                })}
                {<h2>my name is {this.props.name}</h2>}
            </>
        );
    }
}

// export class AVC extends Component<any, any> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             name: "张三",
//             feature: {
//                 height: 1.78,
//                 weight: 45
//             },
//             like: "play"
//         }
//     }
//
//     public handlerClick = () => {
//         let {name,like}: any = this.state;
//         name = "李四";
//         like = 12;
//         this.setState({name,like});
//     }
//
//     render() {
//         console.log("A is rendered");
//         let {name, feature: {height, weight},like}: any = this.state;
//         return (
//             <>
//                 <h1>当前状态的信息是 ：姓名:{name} , 身高{height},体重{weight},爱好：{like}</h1>
//                 <button onClick={this.handlerClick}>更新</button>
//                 <B/>
//             </>
//         );
//     }
// }
//
// class B extends Component<any, any> {
//     render(): React.ReactNode {
//         console.log("B is rendered");
//         return (
//             <>
//                 <h2>我是b组件</h2>
//             </>
//         );
//     }
// }


// export class AVC extends PureComponent {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             name: "张三",
//             feature: {
//                 height: 1.78,
//                 weight: 45
//             },
//             like: "play"
//         }
//     }
//
//     public handlerClick = () => {
//         let {name,like}: any = this.state;
//         name = "李四";
//         like = 12;
//         this.setState({name,like});
//     }
//
//     render() {
//         console.log("A is rendered");
//         let {name, feature: {height, weight},like}: any = this.state;
//         return (
//             <>
//                 <h1>当前状态的信息是 ：姓名:{name} , 身高{height},体重{weight},爱好：{like}</h1>
//                 <button onClick={this.handlerClick}>更新</button>
//                 <B/>
//             </>
//         );
//     }
// }
//
// class B extends PureComponent {
//     render(): React.ReactNode {
//         console.log("B is rendered");
//         return (
//             <>
//                 <h2>我是b组件</h2>
//             </>
//         );
//     }
// }

// export default () => {
//     let [opeObj, setObj] = useState({name: "张三", age: 18});
//     let [count, setCount] = useState(0);
//
//     let inputRef = useRef(null);
//     const changeUser = () => {
//         console.log(inputRef);
//
//         // @ts-ignore
//         const value: string = inputRef.current && inputRef.current.value;
//         const celarSpaceValue = value.trim();
//         const newName = celarSpaceValue.substring(0, celarSpaceValue.indexOf(" "));
//         const newAge = celarSpaceValue.substring(celarSpaceValue.lastIndexOf(" "), celarSpaceValue.length);
//         console.log(newName, newAge);
//         // @ts-ignore
//         setObj((state: any) => ({
//             age: newAge,
//             name: newName
//         }));
//     }
//     useEffect(() => {
//         console.log("此函数被调用了");
//         return () => {
//             console.log("此函数被卸载了");
//         }
//     }, [])
//
//     const incremenrtCount = () => {
//         setCount(count + 1);
//     }
//     return (
//         <>
//             <h1>
//                 当前的用户是{opeObj.name},
//             </h1>
//             <h1>
//                 他的年龄是{opeObj.age}
//             </h1>
//             <div>
//                 <input type="text"
//                        placeholder={"此处添加更改的内容，格式如 张三 18"}
//                        ref={inputRef}
//                 />
//             </div>
//
//             <p>
//                 <span>当前数量为{count}</span>
//                 <button onClick={incremenrtCount}>点击增加数字</button>
//
//                 <button onClick={changeUser}>改变姓名和年龄(随机)</button>
//             </p>
//         </>
//     );
// }

// export default class CurNewFeature extends Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//     }
//
//     updateNumber = () => {
//         // setState 是异步任务，会进入微任务队列执行
//         let {count}: any = this.state;
//         // 对象式写法
//         this.setState({
//             count: count + 1
//         }, () => {
//             console.log("我在setState改变状态后执行");
//         })
//         // 函数式写法
//         // this.setState((state: any, props: any) => {
//         //     console.log(state, props);
//         //
//         //     return {count: state.count + 1};
//         // });
//     }
//
//     render() {
//         let {count}: any = this.state;
//         return (
//             <>
//                 <h1>当前数字为{count}</h1>
//                 <button onClick={this.updateNumber}>+1</button>
//             </>
//         );
//     }
// }