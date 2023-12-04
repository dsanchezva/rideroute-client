import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Routing from "./Routing";

function RouteMap(props) {
  const { origin, destiny } = props;

  const [center, setCenter] = useState(origin);
  return (
    <MapContainer center={center} zoom={1} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing origin={origin} destiny={destiny}/>
      {/* invoke Marker Componentes here */}
    </MapContainer>
  );
}

export default RouteMap;
