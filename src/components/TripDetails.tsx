import { City } from "./Map";
import Map from "./Map";
import { Activities } from "./NewTripForm";
import { useState } from "react";

export type TripProps = {
  cities: City[];
  attractions: Activities[];
};

function TripDetails({ cities, attractions }: TripProps): JSX.Element {
  const [distance, setDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  return (
    <div>
      <section>
        <div>
          <h4>Itinerary:</h4>
          <ul>
            {attractions.map((place: Activities) => (
              <div style={{ margin: "0 1rem", listStyle: "none" }}>
                <h5>{place.city}:</h5>
                {place.attractions.map((at)=>(<li>{at}</li>))}
              </div>
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
