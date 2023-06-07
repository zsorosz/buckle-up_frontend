import { City } from "./Map";
import Map from "./Map";
import { Activities } from "./NewTripForm";
import { useNavigate } from "react-router-dom";

export type TripProps = {
  cities: City[];
  attractions: Activities[];
  setTotalDistance?: (arg0: number) => void;
  setTotalTime?: (arg0: number) => void;
  totalDistance: number;
  totalTime: number;
  saveTrip?: () => void;
  resetTrip?: () => void;
  duration?: number;
  startingCity?: string;
  destination?: string;
  title?: string;
};

function TripDetails({
  cities,
  attractions,
  setTotalDistance,
  setTotalTime,
  totalDistance,
  totalTime,
  saveTrip,
  resetTrip,
  duration,
  startingCity,
  destination,
  title,
}: TripProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="trip-ctn">
      {duration && startingCity && destination ? (
        <h2 className="trip-title">
          {duration}-day road trip from{" "}
          {startingCity.substring(0, startingCity.indexOf(","))} to{" "}
          {destination.substring(0, destination.indexOf(","))}
        </h2>
      ) : (
        <h2 className="trip-title">{title}</h2>
      )}

      <section className="trip-ctas">
        {saveTrip && resetTrip ? (
          <>
            <button className="primary-btn" onClick={saveTrip}>
              Save trip
            </button>
            <button className="secondary-btn" onClick={resetTrip}>
              Create new trip
            </button>
          </>
        ) : (
          <>
            <button className="primary-btn" onClick={saveTrip}>
              Edit trip
            </button>
            <button className="secondary-btn" onClick={() => navigate("/")}>
              Create new trip
            </button>
          </>
        )}
      </section>

      <section className="trip-summary">
        <div className="trip-itinerary">
          <h4>Itinerary:</h4>

          {attractions.map((place: Activities) => (
            <div
              style={{ margin: "0 1rem", listStyle: "none" }}
              className="trip-waypoints"
            >
              <div>
                <img src="/placeholder.png" style={{ width: "25px" }} />
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
            {Math.round((totalDistance + Number.EPSILON) * 100) / 100} km
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
          setTotalDistance={setTotalDistance}
          setTotalTime={setTotalTime}
        />
      </section>
    </div>
  );
}

export default TripDetails;
