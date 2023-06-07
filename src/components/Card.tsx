type CardProps = {
    city: string;
}

function Card({city}:CardProps): JSX.Element {
  return (
    <a href="/" className="card">
      <img src={`https://source.unsplash.com/600x300/?${city}`} alt="destination photo" />
      <div className="card-details">
        <h2 className="card-title">{city}</h2>
      </div>
    </a>
  );
}

export default Card;
