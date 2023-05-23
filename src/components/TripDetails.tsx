import { City } from "./Map";

export type TripProps = {
  cities: City[];
};

function TripDetails({ cities }: TripProps): JSX.Element {
  return (
    <div>
      My trip
      <ul>
        {cities.map((city: City) => (
          <li>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TripDetails;
