import { useContext } from "react";
import { City } from "./Map";
import Map from "./Map";
import { Activities } from "./NewTripForm";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";
import { SessionContext } from "../contexts/SessionContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from "html2pdf.js";

function TripDetails(): JSX.Element {
  const {
    tripData,
    totalDistance,
    setTotalDistance,
    totalTime,
    setTotalTime,
    saveTrip,
    resetTrip,
    deleteTrip,
    isTripShowing,
    setIsTripShowing,
    setIsEditing,
  } = useContext(TripContext);
  const { isAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  const downloadPDF = (): void => {
    const capture = document.querySelector(".trip-ctn") as HTMLElement;

    const opt = {
      margin: 1,
      filename: "myroute.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        useCORS: true,
        ignoreElements: function (element: HTMLElement) {
          if (
            element.classList.contains("leaflet-overlay-pane") ||
            element.classList.contains("trip-ctas")
          ) {
            return true;
          }
        },
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(capture).set(opt).save();
  };
  return (
    <>
      {tripData ? (
        <section className="trip-ctn">
          <h2 className="trip-title">{tripData.title}</h2>
          <section className="trip-ctas">
            {isTripShowing ? (
              <>
                <button className="primary-btn" onClick={downloadPDF}>
                  Download
                </button>
                <button
                  onClick={() => {
                    !isAuthenticated ? navigate("/login") : setIsEditing(true);
                    setIsTripShowing(false);
                  }}
                  className="primary-btn"
                >
                  Edit
                </button>
                <button
                  className="primary-btn"
                  onClick={() => saveTrip(tripData)}
                >
                  Save
                </button>
                <button className="secondary-btn" onClick={resetTrip}>
                  New trip
                </button>
              </>
            ) : (
              <>
                <a href={`${tripData._id}/edit`} className="primary-btn">
                  Edit
                </a>
                <button className="delete-btn" onClick={deleteTrip}>
                  Delete
                </button>
                <button className="secondary-btn" onClick={() => navigate("/")}>
                  New trip
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
                  key={`${place}+${i}`}
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
                          <li key={at}>{at}</li>
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
