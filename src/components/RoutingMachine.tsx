import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import {City} from "./Map"

/* type RoutingProps= {
  cities: City[]
} */

const createRoutineMachineLayer = ({cities}: any)=> {
  const coordinates: L.Routing.Waypoint[] = []
  cities.forEach((city: any)=> {
    const latlng = L.latLng(city.coord)
    coordinates.push(latlng as any)
  })
  console.log(coordinates)
  const instance = L.Routing.control({
    waypoints: coordinates,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: false,
      missingRouteTolerance: 2,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    // draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
