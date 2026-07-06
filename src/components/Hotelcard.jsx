import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  return (
    <div className="card">

      <img
        src={hotel.thumbnail}
        alt={hotel.name}
      />

      <div className="card-content">

        <h2>{hotel.name}</h2>

        <p>📍 {hotel.location}</p>

        <p>⭐ {hotel.rating}</p>

        <p className="price">
          ₹ {hotel.price}
        </p>

        <p className="description">
          {hotel.description.slice(0, 90)}...
        </p>

        <Link to={`/hotel/${hotel.id}`}>
          View Details
        </Link>

      </div>

    </div>
  );
}

export default HotelCard;