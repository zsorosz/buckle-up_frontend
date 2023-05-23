import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMachine from "./RoutingMachine";
import { useState } from "react";
import TripDetails from "./TripDetails";

export type City = {
  name: string;
  coord: [number, number];
};

export type MapProps = {
  cities: City[];
};

function Map({ cities }: MapProps): JSX.Element {
  const [distance, setDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  function MyComponent() {
    const map = useMapEvent("click", (e) => {
      console.log(e.latlng);
      map.setView(e.latlng, map.getZoom());
    });
    return null;
  }

  return (
    <>
      <div>
        Total Distance: {Math.round((distance + Number.EPSILON) * 100) / 100} km
      </div>
      <div>
        Total Time: {Math.floor(totalTime / 3600)} h{" "}
        {Math.round((totalTime / 60) % 60)} min
      </div>
      <TripDetails cities={cities as City[]} />
      <MapContainer
        center={cities[0].coord as [number, number]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", marginTop: "50px" }}
      >
        <MyComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine
          cities={cities as L.ControlOptions}
          setDistance={setDistance}
          setTotalTime={setTotalTime}
        />
      </MapContainer>
    </>
  );
}

export default Map;
