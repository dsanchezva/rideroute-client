import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../services/config';
import RouteCard from '../../components/RouteCard';
import { Pagination } from 'antd';

function RoutesList() {
  const navigate = useNavigate();

 const [ allRoutes, setAllRoutes] = useState(null)
 const [ isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {

    try {
      const response = await service.get("/routes/all", )
      console.log(response.data)
      setAllRoutes(response.data)
      setIsLoading(false)
    } catch (err) {
      navigate("/error")
    }
  }


const handlePagination = (pageNumber) => {
  console.log(pageNumber)
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
    <div className='route-container'>
        <h1>All routes</h1>
        <div id='list-container'>
        {allRoutes.map((eachRoute, index)=>{
          return <RouteCard  key={index} data={eachRoute}/>
        })}
        </div>
        <Pagination showQuickJumper defaultCurrent={2} total={10} onChange={handlePagination} />
    </div>
  )
}

export default RoutesList