import React from 'react'

import Message from './Message/Message'


const Messages = ({ msgs, name }) => (
    <div className='scrlToBtm msgs'>
        {msgs.map((msg, idx) => 
            <div key={idx}>
                <Message name={name} msg={msg} idx={idx} />
            </div>
        )}
    </div>
)

export default Messages