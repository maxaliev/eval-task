import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar'
import InputBar from '../InputBar/InputBar'
import Messages from '../Messages/Messages'
import RoomMembers from '../RoomMembers/RoomMembers'


let socket

const Chat = ({ location }) => {
    const ENDPOINT = 'localhost:5000'

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])

    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        const paramVals = location.search.split(/\?name=|&room=/)
        const name = paramVals[1]
        const room = paramVals[2]
        
        setName(name)
        setRoom(room)

        socket = io(ENDPOINT)

        socket.emit('join', { name, room }, (error) => {
            if (error) alert(error)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (msg) => {
            setMsgs([...msgs, msg])
            const scrlDown = document.querySelector('.scrlToBtm.msgs')
            scrlDown.scrollTop = scrlDown.scrollHeight
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [msgs])

    const sendMsg = (ev) => {
        ev.preventDefault()

        if (msg) {
            socket.emit('sendMessage', msg, () => setMsg(''))
        }
    }
    
    return (
        <div className='outer'>
            <div className='container'>
                <InfoBar admin={users.length > 0 ? users.find((user) => user.room == room)['name'] : null} />
                <Messages 
                    msgs={msgs} 
                    name={name}
                />
                <InputBar
                    msg={msg}
                    setMsg={setMsg}
                    sendMsg={sendMsg}
                />
            </div>
            <RoomMembers users={users} />
        </div>
    )
}

export default Chat