import React from 'react'


const InputBar = ( { msg, setMsg, sendMsg } ) => (
    <form className='form'>
        <input 
            className='input'
            type='text'
            value={msg}
            onChange={ev => {
                    setMsg(ev.target.value)
                    const scrlDown = document.querySelector('.scrlToBtm.msgs')
                    scrlDown.scrollTop = scrlDown.scrollHeight
                }
            }
            onKeyPress={ev => ev.key == 'Enter' ? sendMsg(ev) : null}
        />
        <button 
            className='sendBtn'
            onClick={(ev) => sendMsg(ev)}
        >
        Send
        </button>
    </form>
)

export default InputBar