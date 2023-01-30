/* 
 * 2022/5/7 16:30
 * author: xxx
 * @description:
 */
import ReactECharts from 'echarts-for-react';
import Content from "../../components/Content";
import {PAGE_TITLE} from "../../config";

const {LINE_GRAPH} = PAGE_TITLE;
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
                    type: 'line',
                    name: '2016',
                    data: [95.8, 89.4, 91.2, 76.9]
                }
            ]
        }
    );


    return (
        <>
            {
                <Content cur={LINE_GRAPH}>
                    <div style={{padding:50}}>
                        <ReactECharts option={getOption()}/>
                    </div>
                </Content>
            }
        </>
    );
}