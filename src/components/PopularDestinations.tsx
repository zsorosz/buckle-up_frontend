import Card from "./Card";

function PopularDestinations(): JSX.Element {

const destinations: string[] = ['Berlin', 'Paris', 'Barcelona', 'Rome']

  return (
    <section className="PopularDestinations-ctn">
      <h2>Popular destinations</h2>
      <div className="cards-container">
      {destinations.map((city) => (
        <Card city={city}/>
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;
