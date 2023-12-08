import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import RouteMap from "../../components/RouteMap";
import ClickMarker from "../../components/ClickMarker";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Routing from "../../components/Routing";
import { Button, Divider, Form, Input } from "antd";
import { ThemeContext } from "../../context/theme.context";
const { TextArea } = Input;

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
  const [firstDataIsLoaded, setFirstDataIsLoaded] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  //state handlers
  const handleDescription = (e) => setDescription(e.target.value);
  const [clickedPositionOrigin, setClickedPositionOrigin] = useState(null);
  const [clickedPositionDestiny, setClickedPositionDestiny] = useState(null);

  const [markerOriginVisible, setMarkerOriginVisible] = useState(true);
  const [markerDestinyVisible, setMarkerDestinyVisible] = useState(true);

  const handleSetNewOrigin = () => {
    setMarkerOriginVisible(false);
    setOrigin(clickedPositionOrigin);
  };

  const handleSetNewDestiny = () => {
    setMarkerDestinyVisible(false);
    setDestiny(clickedPositionDestiny);
  };

  const handleUpdateRouter = () => {
    setIsLoading(true);
  };
  useEffect(() => {
    setUser(loggedUser._id);
    if (!firstDataIsLoaded) {
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
      setFirstDataIsLoaded(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate(`/routeDetails/${params.routeId}`);
      }
    }
  };

  // Send all the data to de BackEnd
  const handleSubmitAll = async (e) => {
    e.preventDefault();

    const routeData = {
      description,
      origin,
      destiny,
    };
    try {
      await service.patch(`/routes/${params.routeId}/editRoute`, routeData);
      navigate(`/routeDetails/${params.routeId}`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate(`/routeDetails/${params.routeId}`);
      }
    }
  };

  const styleHandler = {
    color: darkTheme ? "white" : "black",
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
    <div className="detail-page-container">
      <Form
        style={{
          width: 800,
        }}
      >
        <h3 style={styleHandler}>Edit the route</h3>
        {markerOriginVisible ? (
          <p style={styleHandler}>
            Click on the map and set a new route origin
          </p>
        ) : (
          <p style={styleHandler}>
            Click on the map and set a new route Destiny
          </p>
        )}
        <Button type="primary" onClick={handleSetNewOrigin}>
          Set Origin
        </Button>
        <Input
          type="text"
          value={clickedPositionOrigin}
          disabled={true}
          style={styleHandler}
        />
        <Divider />
        <Button
          type="primary"
          onClick={handleSetNewDestiny}
          style={styleHandler}
        >
          Set Destiny
        </Button>
        <Input type="text" value={clickedPositionDestiny} disabled={true} />
        <Divider />
        <Button type="primary" onClick={handleUpdateRouter}>
          Route view
        </Button>
        <Divider />
        <Form.Item>
          <MapContainer center={origin} zoom={1} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing origin={origin} destiny={destiny} />

            {markerOriginVisible ? (
              <ClickMarker setClickedPosition={setClickedPositionOrigin} />
            ) : null}
            {clickedPositionOrigin !== null && (
              <Marker position={clickedPositionOrigin} />
            )}
            {markerDestinyVisible ? (
              <ClickMarker setClickedPosition={setClickedPositionDestiny} />
            ) : null}
            {clickedPositionDestiny !== null && (
              <Marker position={clickedPositionDestiny} />
            )}
          </MapContainer>
        </Form.Item>
        <Form.Item
          label={<label style={styleHandler}>Description </label>}
          name="description"
        >
          <TextArea
            rows={4}
            type="text"
            name="description"
            onChange={handleDescription}
            value={description}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmitAll}>
          Update all
        </Button>
        <p>{errorMessage}</p>
      </Form>
    </div>
  );
}

export default RouteEdit;
