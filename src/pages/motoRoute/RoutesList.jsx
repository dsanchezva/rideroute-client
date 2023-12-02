import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../services/config';
import RouteCard from '../../components/RouteCard';

function RoutesList() {
  const navigate = useNavigate();

 const [ allRoutes, setAllRoutes] = useState(null)
 const [ isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {

    try {
      const response = await service.get("/routes/all")
      console.log(response.data)
      setAllRoutes(response.data)
      setIsLoading(false)
    } catch (err) {
      navigate("/error")
    }
  }





  if(isLoading) {
    return(
    <div>
        <div id="loop" className={"center"}></div>
        <div id="bike-wrapper" className={"center"}>
          <div id="bike" className={"centerBike"}></div>
        </div>
      </div>
      )}
  return (
    <div>
        <h3>RoutesList</h3>
        <div id='list-container'>
        {allRoutes.map((eachRoute, index)=>{
          return <RouteCard  key={index} data={eachRoute}/>
        })}

        </div>

    </div>
  )
}

export default RoutesList