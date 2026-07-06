import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HotelList from "../components/HotelList";

const BASE_URL = "https://demohotelsapi.pythonanywhere.com/api";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [displayHotels, setDisplayHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const [page, setPage] = useState(1);

  const limit = 12;

  useEffect(() => {
    fetchHotels();
  }, [page, minPrice, maxPrice, minRating, maxRating]);

  useEffect(() => {
    let filtered = [...hotels];

    // Search
    if (search) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(search.toLowerCase()) ||
          hotel.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Location
    if (location) {
      filtered = filtered.filter(
        (hotel) => hotel.location === location
      );
    }

    // Sorting
    switch (sort) {
      case "priceLow":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "priceHigh":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    setDisplayHotels(filtered);
  }, [hotels, search, location, sort]);

  async function fetchHotels() {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.append("limit", limit);
      params.append("skip", (page - 1) * limit);

      if (minPrice) params.append("price__gte", minPrice);
      if (maxPrice) params.append("price__lte", maxPrice);

      if (minRating) params.append("rating__gte", minRating);
      if (maxRating) params.append("rating__lte", maxRating);

      const response = await fetch(
        `${BASE_URL}/hotels/?${params.toString()}`
      );

      const data = await response.json();

      setHotels(data);
      setDisplayHotels(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <h1 className="page-title">StayPoint</h1>

        <div className="filters">

          <input
            type="text"
            placeholder="Search hotels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Cities</option>
            <option>Ahmedabad</option>
            <option>Bengaluru</option>
            <option>Chennai</option>
            <option>Delhi</option>
            <option>Goa</option>
            <option>Gurgaon</option>
            <option>Hyderabad</option>
            <option>Jaipur</option>
            <option>Kolkata</option>
            <option>Mumbai</option>
            <option>Noida</option>
            <option>Pune</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Rating"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Rating"
            min="0"
            max="5"
            step="0.1"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Name A → Z</option>
          </select>

        </div>

        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
        ) : (
          <HotelList hotels={displayHotels} />
        )}

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>Page {page}</span>

          <button
            disabled={hotels.length < limit}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default Home;