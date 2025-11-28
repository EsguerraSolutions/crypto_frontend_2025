import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "./App.css";

const originalColumnHeaders = [
  "coin_id",
  "symbol",
  "name",
  "image",
  "current_price",
  "market_cap",
  "market_cap_rank",
  "fully_diluted_valuation",
  "total_volume",
  "high_24h",
  "low_24h",
  "price_change_24h",
  "price_change_percentage_24h",
  "market_cap_change_24h",
  "market_cap_change_percentage_24h",
  "circulating_supply",
  "total_supply",
  "max_supply",
  "ath",
  "ath_change_percentage",
  "ath_date",
  "atl",
  "atl_change_percentage",
  "atl_date",
  "roi_currency",
  "roi_percentage",
  "roi_times",
  "price_to_ath_ratio",
  "market_cap_to_fdv_ratio",
  "circulating_supply_ratio",
  "volatility_24h",
  "is_top_100",
  "ingestion_date",
  "cleaning_date",
  "last_updated",
];

const abbreviationKeywords = ["ID", "ATH", "ATL", "ROI", "24H", "FDV"];

const formatColumnName = (str) => {
  return str
    .split("_")
    .map((word) => {
      if (abbreviationKeywords.includes(word.toUpperCase())) {
        return word.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(" ");
};

const GetCryptoTableHeaders = (list) => {
  const column_headers = Object.keys(list[0]).map(formatColumnName);
  return column_headers;
};

const VisualizeCrypto = () => {
  const [coinMarketData, setCoinMarketData] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);
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
        const data = json.rows;

        setCoinMarketData(data);
        setColumnHeaders(GetCryptoTableHeaders(data));
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
      <h2>Coin List with Market Data</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, index) => (
                <TableCell key={index}>
                  <p>{header}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {coinMarketData.map((row, i) => (
              <TableRow key={i}>
                {/* {columns.map((col) => (
                  <TableCell key={col}>{row[col]}</TableCell>
                ))} */}
                {originalColumnHeaders.map((column, j) => (
                  <TableCell key={j}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VisualizeCrypto;
