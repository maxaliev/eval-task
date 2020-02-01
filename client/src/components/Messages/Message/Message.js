import React from 'react'

import SendingTime from './SendingTime/SendingTime'


const Message = ({ msg: { user, text }, name, idx }) => {
    let isCurUsr = false
    name = name.trim().toLowerCase()
    
    if (user == name) {
        isCurUsr = true
    }

    return isCurUsr 
        ? (
            <div className='msgContainer justifyEnd'>
                <p className='msgSender pr-10'>{name}</p>
                <div>
                <div className='msgBox bgLightGreen'>
                    <p className='msgText'>{text}</p>
                </div>
                <SendingTime idx={idx} />
                </div>
            </div>
        )
        : (
            <div className='msgContainer justifyStart'>
                <div>
                    <div className='msgBox bgLightBlue'>
                        <p className='msgText'>{text}</p>
                    </div>
                    <SendingTime idx={idx} />
                </div>
                <p className='msgSender pl-10'>{user}</p>
            </div>
        )
}

export default Message