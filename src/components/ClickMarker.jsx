import { useMapEvents } from "react-leaflet/hooks";

function ClickMarker({ setClickedPosition }) {
  useMapEvents({
    click: (event) => {
      const obj = event.latlng;
      setClickedPosition([obj.lat.toFixed(5), obj.lng.toFixed(5)]);
    },
  });
  return null;
}

export default ClickMarker;
