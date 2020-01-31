import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const Join = () => {
    const [name, setName] = useState('')
    return (
        <div className='joinOuter'>
            <div className='joinInner'>
                <h1 className='heading'>Let's chat!</h1>
                <div>
                    <input 
                        type='text' 
                        className='joinInput mt-20' 
                        placeholder='Name' 
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </div>
                <Link  
                    to={`/chat?name=${name}&room=${require('uuid').v4()}`}
                    onClick={(ev) => !name ? ev.preventDefault() : null}
                >
                    <button type='submit' className='button mt-20'>Sign in</button>
                </Link>
            </div>
        </div>
    )
}


export default Join