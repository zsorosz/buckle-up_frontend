import Card from "./Card";

function PopularDestinations(): JSX.Element {
  const destinations: string[] = ["Berlin", "Paris", "Barcelona", "Rome"];

  return (
    <section className="popular-destinations-ctn">
      <h2>Popular destinations</h2>
      <div className="cards-container">
        {destinations.map((city) => (
          <Card
            city={city}
            key={city}
            title={city}
            link={`/destination/${city}`}
            image={`/${city}.jpg`}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;
