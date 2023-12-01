import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import service from "../../services/config"


function RouteCreate() {
  const navigate = useNavigate()
  const {loggedUser} = useContext(AuthContext)
  const [ user, setUser] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  //data to send to create
  const [ desciption, setDescription] = useState("")
  const [ country, setCountry] = useState("Spain")
  const [ origin, setOrigin] = useState("")
  const [ destiny, setDestiny] = useState("")
  //state handlers
  const handleDescription = (e) => setDescription(e.target.value)
  const handleCountry = (e) => setCountry()
  const handleOrigin = (e) => setOrigin(e.target.value)
  const handleDestiny = (e) => setDestiny(e.target.value)
  //search handlers
  const [ searchOrigin, setSearchOrigin ] = useState("")
  const handleSearchOrigin = (e) => setSearchOrigin(e.target.value)
  const [searchDestiny, setSearchDestiny] = useState("")
  const handleSearchDestiny = (e) => setSearchDestiny(e.target.value)
  
  //list handlers
  const [allOriginAddresses, setAllOriginAddresses] = useState([])
  const [allDestinyAddresses, setAllDestinyAddresses] = useState([])
  


 useEffect(() => {
  setUser(loggedUser._id)
 }, [])

// Search the Origin address
const handleSearchAdressOrigin = async (e) => {
  e.preventDefault();
  setSearchOrigin(e.target.value)
try {
  const response = await service.patch("/routes/coordinates/searchOrigin",{name: searchOrigin, country} )
  setAllOriginAddresses(response.data)
  isLoading(false)
}catch (err) {
  console.log(err)
}
}
// Search the Destiny address
const handleSearchAdressDestiny = async (e) => {
  e.preventDefault();
  console.log(searchDestiny)
  // setSearchDestiny(e.target.value)
  try {
    const response = await service.patch("/routes/coordinates/searchDestiny",{name: searchDestiny, country} )
    setAllDestinyAddresses(response.data)
    isLoading(false)
  }catch (err) {
    console.log(err)
  }
}




// Send all the data to de BackEnd
 const handleSubmitAll = (e) => {
  e.preventDefault();
    
    const origen = [origin.latitude, origin.longitude]
    const destino = [destiny.latitude, destiny.longitude]
  const routeData = {
    desciption,
    user, 
    origin: origen,
    destiny: destino,
    country
  }
  console.log(routeData)
 }


 if(isLoading){
  return (
    <div>
      <div id="loop" className={"center"}></div>
      <div id="bike-wrapper" className={"center"}>
        <div id="bike" className={"centerBike"}></div>
      </div>
    </div>
  );
 }

  return (
    <div>
        <h3>Create a new route</h3>

        <form onSubmit={handleSubmitAll}>
          <label htmlFor="description">Description : </label>
          <textarea type="text" name="description" onChange={handleDescription} value={desciption}/>
          <button type="submit">Update All</button>
        </form>
        <br />
        <label htmlFor="country">Country : </label>
        <input type="text" name="country" onChange={handleCountry} value={country}/>
        <br />
        {/* search the adress origin */}
        <form onSubmit={handleSearchAdressOrigin}>
          <label htmlFor="origin">City Origin : </label>
          <input type="text" name="origin"  onChange={handleSearchOrigin}/>
          <button type="submit">Search</button>
        </form>
        <form>
          <select name="origin" onChange={handleOrigin}>
            <option>Select Origin Adress : </option>
            {allOriginAddresses.map((eachOrigin, index) => {
              return <option key={index} value={eachOrigin}>{eachOrigin.name} from {eachOrigin.state}</option>
            })}
          </select>
        </form>
         {/* search the adress Destiny */}
         <form onSubmit={handleSearchAdressDestiny}>
          <label htmlFor="origin">City Destiny : </label>
          <input type="text" name="origin"  onChange={handleSearchDestiny}/>
          <button type="submit">Search</button>
        </form>
        <form>
          <select name="origin" onChange={handleDestiny}>
            <option>Select Destiny Adress : </option>
            {allDestinyAddresses.map((eachDestiny, index) => {
              return <option key={index} value={eachDestiny}>{eachDestiny.name} from {eachDestiny.state}</option>
            })}
          </select>
        </form>



    </div>
  )
}

export default RouteCreate