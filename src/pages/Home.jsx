import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HotelList from "../components/HotelList";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://demohotelsapi.pythonanywhere.com/api/hotels/")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Explore Hotels</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <HotelList hotels={hotels} />
        )}
      </div>
    </>
  );
}

export default Home;