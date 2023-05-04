import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  cities: string[];
};

function Map({ cities }: MapProps): JSX.Element {
  console.log(cities);
  const getCoordinates = function (index: number): number[] {
    const arr = cities[index].split(":");
    const newArr = arr[1].split(",");
    const coordinates: number[] = [];
    newArr.map((coord) => coordinates.push(Number(coord.replace(/\s/g, ""))));
    console.log("coordinates", coordinates);
    return coordinates;
  };
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", marginTop: "50px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city: string, index: number) => (
        <Marker position={getCoordinates(index) as [number, number]}>
          <Popup>
            {city} <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
