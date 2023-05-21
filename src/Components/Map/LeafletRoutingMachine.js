import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useCookies } from 'react-cookie';



const LeafletRoutingMachine = ({field}) => {
  const [longlat,setLongLat] = useState({})

  const [cookies] = useCookies(['name']);



  useEffect(()=>{
    setLongLat({lat:cookies.lat,long:cookies.long})
    console.log('lllll->',longlat)
  },[cookies.lat,cookies.long])


  let userIcon = L.icon({
    iconUrl: "/location.png",
    iconSize: [40, 40],
  });
  let pharmacyIcon = L.icon({
    iconUrl: "/pharmacy.png",
    iconSize: [40, 40],
  });
  const map = useMap();
 const [remove,setRemove] = useState(0)

 function resetMap() {
  // Remove all layers from the map
  map.eachLayer(function (layer) {
      map.removeLayer(layer);
  });

  // Set the map's view to its initial state
  map.setView([51.505, -0.09], 13);
}

 
  useEffect(() => {


    // if(remove !=0)
    // {
    //   resetMap()
    //   setRemove(1)
    // }
    if(longlat.lat !=null)//
    {
      var  marker1= L.marker([longlat.lat, longlat.long], { icon: userIcon }).addTo(
        map
      );


   }
    
   if(field !=null)
   {
      L.marker([field.lat , field.long ],{icon : pharmacyIcon}).addTo(map);
   }


     if(longlat.lat !=null)//
     {

       var routtt=L.Routing.control({
            waypoints: [
              L.latLng(longlat.lat, longlat.long),
              L.latLng(field ? field.lat : longlat.lat  , field ? field.long : -8.021628856658937),
            ],
            line: {
              show: false // Hide the route text
            },
            lineOptions: {
              styles: [
                {
                  color: "#03C988",
                  weight: 3,
                  opacity: 0.7,
                },
              ],
            },
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
          })
            .addTo(map);
     }

      

    

    
  }, [map,field]); // Include map and hasClicked in the dependencies array for proper effect behavior
  return null;
};

export default LeafletRoutingMachine;
