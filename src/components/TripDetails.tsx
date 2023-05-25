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
    <div className="trip">
      <section className="trip-summary">
        <div className="trip-itinerary">
          <h4>Itinerary:</h4>

          {attractions.map((place: Activities) => (
            <div
              style={{ margin: "0 1rem", listStyle: "none" }}
              className="trip-waypoints"
            >
              <div>
                <img src="/public/placeholder.png" style={{ width: "25px" }} />
                <div className="trip-line"></div>
              </div>
              <h5>{place.city}:</h5>
              <ul>
                <b>Places to visit:</b>
                {place.attractions.map((at) => (
                  <li>{at}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="trip-data">
          <div>
            <h5>Total Distance:</h5>{" "}
            {Math.round((distance + Number.EPSILON) * 100) / 100} km
          </div>
          <div>
            <h5>Total Driving Time:</h5>
            {Math.floor(totalTime / 3600)} h {Math.round((totalTime / 60) % 60)}{" "}
            min
          </div>
        </div>
      </section>
      <section className="trip-map">
        <Map
          cities={cities as City[]}
          setDistance={setDistance}
          setTotalTime={setTotalTime}
        />
      </section>
    </div>
  );
}

export default TripDetails;
