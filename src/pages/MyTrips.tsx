import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Activities } from "../components/NewTripForm";
import { City } from "../components/Map";

function MyTrips(): JSX.Element {

  const { userData, refreshData } = useContext(SessionContext);
  console.log(userData?.trips);
  const trips: Trips = userData?.trips

  type Trips = {
    _id: string,
    title: string,
    startingCity: string,
    destination: string,
    createdAt: string,
    updatedAt: string,
    totalDistance: number,
    totalTime: number,
    attractions: Activities[],
    waypoints: City[]
  }

  return (
    <>
    {trips?.map(trip=>(
    <article className="card">
      <img
        className="card__background"
        src={`https://source.unsplash.com/600x300/?${trip.destination}`}
        alt="destination photo"
        width="1920"
        height="2193"
      />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
          <h2 className="card__title">{trip.destination}</h2>
          <p className="card__description">The trip from {trip.startingCity}<br></br>to {trip.destination}</p>
        </div>
        <button className="card__button">See details</button>
      </div>
    </article>
    ))}
    </>
  );
}

export default MyTrips;
