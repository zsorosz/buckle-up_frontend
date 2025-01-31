type CardProps = {
  city: string;
  title: string;
  link: string;
  image?: string
};

function Card({ title, link, image }: CardProps): JSX.Element {
  return (
    <a href={link} className="card">
      {image &&
        <img
          src={image}
          alt="destination photo"
        />
      }
      <div className="card-details">
        <h2 className="card-title">{title}</h2>
      </div>
    </a>
  );
}

export default Card;
