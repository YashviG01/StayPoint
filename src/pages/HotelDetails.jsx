import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BASE_URL = "https://demohotelsapi.pythonanywhere.com/api";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Loading...
        </h2>
      </>
    );
  }

  if (!hotel) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Hotel not found.
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          className="details-image"
        />

        <h1>{hotel.name}</h1>

        <p>
          <strong>📍 Location:</strong> {hotel.location}
        </p>

        <p>
          <strong>⭐ Rating:</strong> {hotel.rating}
        </p>

        <p>
          <strong>💰 Price:</strong> ₹{hotel.price}
        </p>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <h2>Gallery</h2>

        <div className="gallery">

          {hotel.photos &&
            hotel.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Hotel ${index + 1}`}
              />
            ))}

        </div>

      </div>
    </>
  );
}

export default HotelDetails;