import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HotelList from "../components/HotelList";

const BASE_URL = "https://demohotelsapi.pythonanywhere.com/api";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const limit = 12;
  const totalHotels = 194;
  const totalPages = Math.ceil(totalHotels / limit);

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.append("limit", limit);
        params.append("skip", (page - 1) * limit);

        if (search) params.append("search", search);
        if (location) params.append("location", location);
        if (rating) params.append("rating", rating);
        if (sort) params.append("sort", sort);

        const response = await fetch(
          `${BASE_URL}/hotels/?${params.toString()}`
        );

        const data = await response.json();

        setHotels(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    fetchHotels();
  }, [page, search, location, rating, sort]);

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>Explore Hotels</h1>

        <div className="filters">

          <input
            type="text"
            placeholder="Search hotel or location..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            value={location}
            onChange={(e) => {
              setPage(1);
              setLocation(e.target.value);
            }}
          >
            <option value="">All Cities</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Noida">Noida</option>
            <option value="Pune">Pune</option>
          </select>

          <select
            value={rating}
            onChange={(e) => {
              setPage(1);
              setRating(e.target.value);
            }}
          >
            <option value="">All Ratings</option>
            <option value="4">4★ & Above</option>
            <option value="4.5">4.5★ & Above</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
          >
            <option value="">Sort By</option>
            <option value="price">Price Low → High</option>
            <option value="-price">Price High → Low</option>
            <option value="rating">Rating Low → High</option>
            <option value="-rating">Rating High → Low</option>
            <option value="name">Name A → Z</option>
            <option value="-name">Name Z → A</option>
          </select>

        </div>

        {loading ? (
          <h2>Loading Hotels...</h2>
        ) : (
          <HotelList hotels={hotels} />
        )}

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default Home;