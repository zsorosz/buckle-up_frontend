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
  const waypoints: L.Routing.Waypoint[] = [];

  cities.forEach((city: City) => {
    const latlng: Coord = L.latLng(city.coord);
    const waypoint: L.Routing.Waypoint = L.Routing.waypoint(
      latlng as L.LatLng,
      city.name
    );
    waypoints.push(waypoint);
    console.log(waypoint);
  });
  console.log(waypoints);
  const instance = L.Routing.control({
    waypoints: waypoints,
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
