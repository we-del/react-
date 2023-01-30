/* 
 * 2022/5/15 21:22
 * author: xxx
 * @description:
 */
import React, {useState} from "react";
import {Image, Modal} from 'antd';

const App = () => {
    const [modalState, setModalState] = useState(false);
    return (
        <>
            <Image.PreviewGroup>
                <Image width={200} height={100} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                <Image
                    width={200}
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    onClick={()=>{setModalState(!modalState)}}
                />
                <Modal visible={modalState}  onCancel={()=>{setModalState(!modalState)}}>
                    <Image
                        width={200}
                        style={{ display: 'none' }}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                    />
                </Modal>
            </Image.PreviewGroup>
        </>

    );
}

export default App;