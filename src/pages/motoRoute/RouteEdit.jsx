import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import RouteMap from "../../components/RouteMap";
import ClickMarker from "../../components/ClickMarker";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Routing from "../../components/Routing";




function RouteEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  //data to send to create
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState([]);
  const [destiny, setDestiny] = useState([]);
  
  //state handlers
  const handleDescription = (e) => setDescription(e.target.value);
  const [clickedPositionOrigin, setClickedPositionOrigin] = useState(null);
  const [clickedPositionDestiny, setClickedPositionDestiny] = useState(null);

  const [markerOriginVisible, setMarkerOriginVisible] = useState(true)
  const [markerDestinyVisible, setMarkerDestinyVisible] = useState(true)

  const handleSetNewOrigin = () => {
    setMarkerOriginVisible(false)
    setOrigin(clickedPositionOrigin)
  }

  const handleSetNewDestiny = () => {
    setMarkerDestinyVisible(false)
    setDestiny(clickedPositionDestiny)
  }
  
  const handleUpdateRouter = () => {
    setIsLoading(true)
  }
  useEffect(() => {
    setUser(loggedUser._id);
    if(!clickedPositionOrigin  && !clickedPositionDestiny) {
      getRouteToEdit();
    } else {
      setIsLoading(false);
    }
  }, [handleUpdateRouter]);

  const getRouteToEdit = async () => {
    try {
      const response = await service.get(`/routes/${params.routeId}/info`);
      setOrigin(response.data.origin);
      setDestiny(response.data.destiny);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  
 

  // Send all the data to de BackEnd
  const handleSubmitAll = async (e) => {
    e.preventDefault();

    const routeData = {
      description,
      user,
      origin,
      destiny,
      country,
    };
    try {
      await service.post("/routes/create", routeData);
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isLoading) {
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

     
      <br />
      
      <div>
        <button onClick={handleSetNewOrigin}>Set Origin</button>
        <input type="text" value={clickedPositionOrigin} disabled={true}/>
        <br />
        <button onClick={handleSetNewDestiny}>Set Destiny</button>
        <input type="text" value={clickedPositionDestiny} disabled={true}/>
        <br />
        <button onClick={handleUpdateRouter}>View new route</button>
        <br />
        <MapContainer center={origin} zoom={1} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing origin={origin} destiny={destiny} />

          {markerOriginVisible ? <ClickMarker setClickedPosition={setClickedPositionOrigin} /> : null}
          {/* invoke Marker Componentes here */}
          { clickedPositionOrigin !== null && <Marker position={clickedPositionOrigin} /> }
          {markerDestinyVisible ? <ClickMarker setClickedPosition={setClickedPositionDestiny} /> : null}
          {/* invoke Marker Componentes here */}
          { clickedPositionDestiny !== null && <Marker position={clickedPositionDestiny} /> }
        </MapContainer>
      </div>
      <br />
      <form onSubmit={handleSubmitAll}>
        <label htmlFor="description">Description : </label>
        <textarea
          type="text"
          name="description"
          onChange={handleDescription}
          value={description}
        />
        <br />
        <button type="submit">Update All</button>
      </form>
      <p>{errorMessage}</p>

    </div>
  );
}

export default RouteEdit;
