import Card from "./Card";

function PopularDestinations(): JSX.Element {
  const destinations: string[] = ["Berlin", "Paris", "Barcelona", "Rome"];
  const images = {
    Berlin:
      "https://cdn.pixabay.com/photo/2017/12/31/10/26/berlin-3051937_1280.jpg",
    Paris:
      "https://cdn.pixabay.com/photo/2018/04/06/17/17/paris-3296269_1280.jpg",
    Barcelona:
      "https://images.ctfassets.net/bth3mlrehms2/2T2y3fo3Z60l0XXMwjtstO/01970b699f8c96c39c7ed4b489d9ebab/Sagrada_Familia_Barcelona.jpg?w=3841&h=2160&fl=progressive&q=50&fm=jpg",
    Rome: "https://cdn.pixabay.com/photo/2019/10/06/08/57/tiber-river-4529605_1280.jpg",
  };

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
            image={images[city as keyof typeof images]}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;
