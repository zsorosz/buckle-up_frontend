import { useContext, useState } from "react";
import { City } from "./Map";
import Map from "./Map";
import { Activities } from "./NewTripForm";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";
import { SessionContext } from "../contexts/SessionContext";
import { Popup } from "./Popup";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from "html2pdf.js";

function TripDetails(): JSX.Element {
  const [popupOpen, setPopupOpen] = useState(false);
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
    isEditing,
    setIsEditing,
  } = useContext(TripContext);
  const { isAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  const downloadPDF = (): void => {
    const itinerary = document.querySelector(".trip-ctn") as HTMLElement;

    const opt = {
      margin: 0,
      filename: "myroute.pdf",
      image: { type: "jpeg", quality: 0.98 },
      pagebreak: {
        mode: "css",
        avoid: ".trip-map",
      },
      html2canvas: {
        useCORS: true,
        scale: 4,
        windowWidth: 1024,
        windowHeight: 700,
        ignoreElements: function (element: HTMLElement) {
          if (
            element.classList.contains("leaflet-overlay-pane") ||
            element.classList.contains("trip-ctas")
          ) {
            return true;
          }
        },
      },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
    };
    html2pdf().from(itinerary).set(opt).save();
  };
  return (
    <>
      {tripData ? (
        <section className="trip-ctn">
          <h2 className="trip-title">{tripData.title}</h2>
          <section className="trip-ctas">
            <button
              className="primary-btn"
              onClick={() => {
                !isAuthenticated ? setPopupOpen(true) : downloadPDF();
              }}
            >
              Download
            </button>

            {isTripShowing ? (
              <>
                <button
                  onClick={() => {
                    !isAuthenticated ? setPopupOpen(true) : setIsEditing(true);
                    isEditing && setIsTripShowing(false);
                  }}
                  className="primary-btn"
                >
                  Edit
                </button>
                <button
                  className="primary-btn"
                  onClick={() => {
                    !isAuthenticated ? setPopupOpen(true) : saveTrip(tripData);
                  }}
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
            {popupOpen ? (
              <Popup
                text="To save, edit or download a trip, you need to be logged in."
                closePopup={() => setPopupOpen(false)}
                isPopupOpen={popupOpen}
              />
            ) : null}
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
            <div className="html2pdf__page-break"></div>
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
          {/* <div className="html2pdf__page-break"></div> */}
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
