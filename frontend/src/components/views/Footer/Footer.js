import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </div>
    )
}

export default Footer
