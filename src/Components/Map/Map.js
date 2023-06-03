import "leaflet/dist/leaflet.css"
import { MapContainer,TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import  './map.css'
import L from "leaflet"
import LeafletGeocoder from "./LeafletGeocoder"

const Map = ({ onValueChange,height,width }) => {
  const position = [31.6258257, -7.9891608];

  const handleChange = (value) => {
    onValueChange(value);
  };

  const DefaultIcon = L.icon({
    iconUrl:
      'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer
    className={`w-full h-full ${height ? 'md:h-[300px] col-span-2' : 'md:h-[400px]'} ${width ? 'md:h-[200px]' : ''}`}
      center={position}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletGeocoder onLocationSelect={handleChange} />
      
    </MapContainer>
  );
};

export default Map;