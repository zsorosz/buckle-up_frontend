import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMachine from "./RoutingMachine";

export type City = {
  name: string;
  coord: [number, number];
};

export type MapProps = {
  cities: City[];
};

function Map({ cities }: MapProps): JSX.Element {
  return (
    <MapContainer
      center={cities[0].coord as [number, number]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", marginTop: "50px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine cities={cities as L.ControlOptions} />
    </MapContainer>
  );
}

export default Map;
