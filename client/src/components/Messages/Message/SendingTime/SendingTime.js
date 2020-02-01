import React, { useMemo } from 'react'


const times = []

const SendingTime = ({ idx }) => {

    const time = useMemo(() => new Date().toLocaleTimeString(), [idx])

    if (time != times[times.length - 1] || times.length == 0) {
        times.push(time)
    }    

    return (
        <p className='msgSender sendingTime'>{times[idx].slice(0, -3)}</p>
    )
}

export default SendingTime