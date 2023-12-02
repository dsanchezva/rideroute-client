import React from 'react'
import { Link } from 'react-router-dom'
import RouteMap from './RouteMap'

function RouteCard(props) {
    const { destiny, origin, user, _id } = props.data

  return (
    <div id='route-Card'>
       <Link to={`/routeDetails/${_id}`} >
        <div>
            <h3>Nombre del creador</h3>
            <img src="https://www.inforchess.com/images/motocicletas/ducati-gp-0027.jpg" alt="motoimg" style={{width: "20px"}}/>
        </div>
        <div>
            <RouteMap origin={origin} destiny={destiny}/>
        </div>
        </Link>
    </div>
  )
}

export default RouteCard