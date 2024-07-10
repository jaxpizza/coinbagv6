import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const TOKEN_ID = '31798'; // UCID for JENNER token

export const useTokenData = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${TOKEN_ID}`, {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
      });

      if (response.data.status.error_code !== 0) {
        throw new Error(response.data.status.error_message);
      }

      setTokenInfo(response.data.data[TOKEN_ID]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching token data:', err);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Fetch new data every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { tokenInfo, loading, error };
};
