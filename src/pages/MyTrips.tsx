import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Trip, UserData } from "../types";
import axios from "axios";

function MyTrips(): JSX.Element {
  const { userData, refreshData } = useContext(SessionContext);
  // console.log(userData);
  // const trips: Trip[] | undefined = userData?.trips;

  const [user, setUser] = useState({} as UserData);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const fetchUserData = async () => {
    if (userData) {
      const response = await axios.get(`${BASE_URL}/auth/${userData?._id}`);
      setUser(response.data.user);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <div className="cards-container">
      {isLoading && user ? (
        <p>Loading...</p>
      ) : (
        <div>
          {user.trips?.map((trip) => (
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
      )}
    </div>
  );
}

export default MyTrips;
