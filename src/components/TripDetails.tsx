import { City } from "./Map";

export type TripProps = {
  cities: City[];
};

function TripDetails({ cities }: TripProps): JSX.Element {
  return (
    <div>
      Itinerary:
      <ul>
        {cities.map((city: City) => (
          <li>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TripDetails;
