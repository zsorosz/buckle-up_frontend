import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Trip } from "../types";

function MyTrips(): JSX.Element {
  const { userData, refreshData } = useContext(SessionContext);
  console.log(userData?.trips);
  const trips: Trip[] | undefined = userData?.trips;


  return (
    <div className="cards-container">
      {trips?.map((trip) => (
        <article className="card">
          <img
            src={`https://source.unsplash.com/600x300/?${trip.destination}`}
            alt="destination photo"
            width="1920"
            height="2193"
          />
          <div className="card-details">
            <h2 className="card-title">{trip.destination}</h2>
            <p className="card-description">
              The trip from {trip.startingCity}
              <br></br>to {trip.destination}
            </p>
            <div className="primary-btn">
            <a href={`/${trip._id}`}>See details</a>
            </div> 
          </div>
        </article>
      ))}
    </div>
  );
}

export default MyTrips;
