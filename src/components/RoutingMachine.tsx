import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { City } from "./Map";

type Coord = {
  lat: number;
  lng: number;
};

const createRoutineMachineLayer = ({
  cities,
  setDistance,
  setTotalTime,
}: any): L.Routing.Control => {
  const coordinates: L.LatLng[] = [];

  cities.forEach((city: City) => {
    const latlng: Coord = L.latLng(city.coord);
    coordinates.push(latlng as L.LatLng);
  });
  console.log(coordinates);
  const instance = L.Routing.control({
    waypoints: coordinates,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: false,
      missingRouteTolerance: 2,
    },
    show: true,
    addWaypoints: true,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    collapsible: true,
  }).on("routesfound", function (e) {
    setDistance(e.routes[0].summary.totalDistance / 1000);
    setTotalTime(e.routes[0].summary.totalTime);
  });
  // console.log(instance);
  // const plan = instance.getPlan();
  // const router = instance.getRouter();
  // console.log(router);
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
