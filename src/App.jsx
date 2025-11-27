import { useEffect, useState } from "react";
import "./App.css";

function VisualizeCrypto() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json.rows);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Data from FastAPI:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.coin_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default VisualizeCrypto;
