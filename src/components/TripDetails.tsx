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
      <section>
        <div>
          <h4>Itinerary:</h4>
          <ul>
            {cities.map((city: City) => (
              <li style={{ margin: "0 1rem", listStyle: "none" }}>
                {city.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Total Distance:</h4>{" "}
          {Math.round((distance + Number.EPSILON) * 100) / 100} km
        </div>
        <div>
          <h4>Total Time:</h4>Total Time: {Math.floor(totalTime / 3600)} h{" "}
          {Math.round((totalTime / 60) % 60)} min
        </div>
      </section>
      <Map
        cities={cities as City[]}
        setDistance={setDistance}
        setTotalTime={setTotalTime}
      />
    </div>
  );
}

export default TripDetails;
