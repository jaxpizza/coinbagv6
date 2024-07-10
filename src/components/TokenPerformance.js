import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTokenData } from '../hooks/useTokenData';

const TokenPerformance = () => {
  const [chartData, setChartData] = useState([]);
  const { tokenInfo, loading, error } = useTokenData();

  useEffect(() => {
    if (tokenInfo) {
      const newDataPoint = {
        date: new Date().toLocaleTimeString(),
        price: tokenInfo.quote.USD.price
      };
      setChartData(prevData => [...prevData.slice(-29), newDataPoint]);
    }
  }, [tokenInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-16 px-4 bg-gray-800" id="charts">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
          JENNER Token Price (Last 30 Updates)
        </h3>
        <div className="bg-gray-700 rounded-lg shadow-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="date" stroke="#4FD1C5" />
              <YAxis stroke="#4FD1C5" domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
              <Line type="monotone" dataKey="price" stroke="#4FD1C5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default TokenPerformance;
