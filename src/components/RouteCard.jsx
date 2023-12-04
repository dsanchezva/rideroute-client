import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RouteMap from './RouteMap'

function RouteCard(props) {
    const { destiny, origin, user, _id } = props.data;
  
    

  return (
    <div id='route-Card'>
       <Link to={`/routeDetails/${_id}`} >
        <div className='user-info'>
            <h3>{user.username}</h3>
            <img src={user.userPicture} alt="motoimg"/>
        </div>
        <div>
            <RouteMap origin={origin} destiny={destiny}/>
        </div>
        </Link>
    </div>
  )
}

export default RouteCard