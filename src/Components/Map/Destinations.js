import React, { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer,TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import  './map.css'
import L from "leaflet"
import LeafletRoutingMachine from './LeafletRoutingMachine';

function Destinations({field}) {
    const position = [field.lat, field.long];

 

    const DefaultIcon = L.icon({
      iconUrl:
        '/empty.png',
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const [map, setMap] = useState(null);

   useEffect(() => {
      if (map) {
         setInterval(function () {
            map.invalidateSize();
         }, 100);
      }
   }, [map]);
  
    return (
      <MapContainer
        className="w-full h-full md:h-[450px] z-90 col-span-1 md:col-span-2"
        center={position}
        zoom={30}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        <LeafletRoutingMachine field={field}/>
        
      </MapContainer>
    );
}

export default Destinations