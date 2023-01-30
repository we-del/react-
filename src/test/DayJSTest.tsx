/* 
 * 2022/5/7 22:12
 * author: xxx
 * @description:
 */
import DayJS from "dayjs";

export default () => {
    console.log(DayJS('2018-08-08'));
    return (
        <>
            {DayJS().format('YYYY MM-DD HH:mm:ss ')}
        </>
    );
}