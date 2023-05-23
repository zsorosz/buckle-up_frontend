import { City } from "./Map";
import Map from "./Map";
import { useState } from "react";

export type TripProps = {
  cities: City[];
};

function TripDetails({ cities }: TripProps): JSX.Element {
  const [distance, setDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  return (
    <div>
      <div>
        Total Distance: {Math.round((distance + Number.EPSILON) * 100) / 100} km
      </div>
      <div>
        Total Time: {Math.floor(totalTime / 3600)} h{" "}
        {Math.round((totalTime / 60) % 60)} min
      </div>
      <div>
        Itinerary:
        <ul>
          {cities.map((city: City) => (
            <li>{city.name}</li>
          ))}
        </ul>
      </div>
      <Map
        cities={cities as City[]}
        setDistance={setDistance}
        setTotalTime={setTotalTime}
      />
    </div>
  );
}

export default TripDetails;
