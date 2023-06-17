type CardProps = {
  city: string;
  title: string;
  link: string;
};

function Card({ city, title, link }: CardProps): JSX.Element {
  return (
    <a href={link} className="card">
      <img
        src={`https://source.unsplash.com/600x300/?${city}`}
        alt="destination photo"
      />
      <div className="card-details">
        <h2 className="card-title">{title}</h2>
      </div>
    </a>
  );
}

export default Card;
