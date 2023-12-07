import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../services/config';
import RouteCard from '../../components/RouteCard';
import { Pagination } from 'antd';
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

function RoutesList() {
  const navigate = useNavigate();

 const [ allRoutes, setAllRoutes] = useState(null)
 const [ isLoading, setIsLoading] = useState(true)
 const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [totalElement, setTotalElement] = useState(0)

const onShowSizeChange = (current, pageSize) => {
  setPageSize(pageSize);
}
  useEffect(() => {
    getData()
  },[pageSize])

  const getData = async (sendPage) => {
    try {
      const response = await service.patch("/routes/all", {sendPage, pageSize} )
      setAllRoutes(response.data.routes)
      setTotalElement(response.data.size)
      setIsLoading(false)
    } catch (err) {
      navigate("/error")
    }
  }


const handlePagination = (e ) => {
  setCurrentPage(e)
  getData(e)
  setIsLoading(true)
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
        <Pagination defaultCurrent={currentPage} total={totalElement} onShowSizeChange={onShowSizeChange} onChange={handlePagination}/>
    </div>
  )
}

export default RoutesList