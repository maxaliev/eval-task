import React from 'react'

import closeIcon from '../../icons/closeIcon.png'


const InfoBar = ({ admin }) => (
    <div className='infoBar'>
        <div className='innerLeft'>
            <h4>Chatroom of {admin}</h4>
        </div>
        <div className='innerRight'>
            <a href='/'><img src={closeIcon} alt='close icon' /></a>
        </div>
    </div>
)

export default InfoBar