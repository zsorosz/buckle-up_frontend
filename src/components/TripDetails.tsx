import { useContext } from "react";
import { City } from "./Map";
import Map from "./Map";
import { Activities } from "./NewTripForm";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";

function TripDetails(): JSX.Element {
  const {
    tripData,
    totalDistance,
    setTotalDistance,
    totalTime,
    setTotalTime,
    saveTrip,
    resetTrip,
    isTripShowing,
  } = useContext(TripContext);
  const navigate = useNavigate();

  return (
    <>
      {tripData ? (
        <section className="trip-ctn">
          <h2 className="trip-title">{tripData.title}</h2>

          <section className="trip-ctas">
            {isTripShowing ? (
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

              {tripData.attractions.map((place: Activities, i) => (
                <div
                  style={{ margin: "0 1rem", listStyle: "none" }}
                  className="trip-waypoints"
                  key={i}
                >
                  <div>
                    <img src="/placeholder.png" style={{ width: "25px" }} />
                    <div className="trip-line"></div>
                  </div>
                  <h5>{place.city}</h5>
                  <ul>
                    {place.attractions.length ? (
                      <>
                        <b>Places to visit:</b>
                        {place.attractions.map((at) => (
                          <li>{at}</li>
                        ))}
                      </>
                    ) : null}
                  </ul>
                </div>
              ))}
            </div>
            <div className="trip-data">
              <div>
                <h5>Total Distance:</h5>{" "}
                {totalDistance &&
                  Math.round((totalDistance + Number.EPSILON) * 100) / 100}{" "}
                km
              </div>
              <div>
                <h5>Total Driving Time:</h5>
                {totalTime && Math.floor(totalTime / 3600)} h{" "}
                {totalTime && Math.round((totalTime / 60) % 60)} min
              </div>
            </div>
          </section>
          <section className="trip-map">
            <Map
              cities={tripData.waypoints as City[]}
              setTotalDistance={setTotalDistance}
              setTotalTime={setTotalTime}
            />
          </section>
        </section>
      ) : null}
    </>
  );
}

export default TripDetails;
