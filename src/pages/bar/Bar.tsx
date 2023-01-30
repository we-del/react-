/* 
 * 2022/5/7 16:31
 * author: xxx
 * @description:
 */
import {useState} from "react";
import ReactECharts from 'echarts-for-react';
import Content from "../../components/Content";
import {PAGE_TITLE} from "../../config";
import "./bar.less";
const {BAR_GRAPH} = PAGE_TITLE;
export default () => {

    const getOption = () => (
        {
            title: {
                text: '销售情况'
            },
            tooltip: {},
            legend: {
                // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子']
            },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    name: '2016',
                    data: [95.8, 89.4, 91.2, 76.9]
                }
            ]
        }
    );
    let [classState,setClassState] = useState(["a","b","c"]);

    return (
        <>
            {
                <Content cur={BAR_GRAPH}>
                    <div style={{padding:50}}>
                        <ReactECharts option={getOption()}/>
                    </div>
                </Content>
            }
        </>
    );
}