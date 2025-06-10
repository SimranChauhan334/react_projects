

// src/pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/search/?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <p>Loading search results...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for: <em>{query}</em></h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(product => (
            <li key={product.id}>
              <h4>{product.product_name}</h4>
              {product.images?.length > 0 && (
                <img src={product.images[0].image} alt={product.product_name} style={{ width: '100px' }} />
              )}
              <p>Price: ₹{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
