import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HotelDetails() {

  const { id } = useParams();

  const [hotel, setHotel] = useState(null);

  useEffect(() => {

    fetch(`https://demohotelsapi.pythonanywhere.com/api/hotels/${id}`)

      .then((res) => res.json())

      .then((data) => {
        setHotel(data);
      });

  }, [id]);

  if (!hotel) return <h2>Loading...</h2>;

  return (

    <div className="details">

      <img
        src={hotel.thumbnail}
        alt={hotel.name}
      />

      <h1>{hotel.name}</h1>

      <p>📍 {hotel.location}</p>

      <p>⭐ {hotel.rating}</p>

      <h2>₹ {hotel.price}</h2>

      <p>{hotel.description}</p>

      <h3>Gallery</h3>

      <div className="gallery">

        {hotel.photos.map((photo, index) => (

          <img
            key={index}
            src={photo}
            alt={hotel.name}
          />

        ))}

      </div>

    </div>

  );
}

export default HotelDetails;