import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png'

const RoomMembers = ({ users }) => (
    <div className='roomMembers'>
        {
      users
        ? (
          <div>
            <h3>Room members:</h3>
            <div className="activeContainer">
              <h5>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img src={onlineIcon} alt="online" />
                    {name}
                  </div>
                ))}
              </h5>
            </div>
          </div>
        )
        : null
    }
    </div>
)

export default RoomMembers