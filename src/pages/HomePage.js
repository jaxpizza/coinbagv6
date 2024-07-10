import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import HeroSection from '../components/HeroSection';
import StatisticsSection from '../components/StatisticsSection';
import { useTokenData } from '../hooks/useTokenData';

const HomePage = () => {
  const { tokenInfo, loading, error } = useTokenData();
  const [priceChartData, setPriceChartData] = useState([]);
  const [volumeChartData, setVolumeChartData] = useState([]);
  const [showEMA, setShowEMA] = useState(false);

  useEffect(() => {
    if (tokenInfo) {
      const mockHistoricalData = generateMockHistoricalData(tokenInfo.quote.USD.price, 30);
      setPriceChartData(mockHistoricalData.priceData);
      setVolumeChartData(mockHistoricalData.volumeData);
    }
  }, [tokenInfo]);

  const generateMockHistoricalData = (currentPrice, days) => {
    const priceData = [];
    const volumeData = [];
    const baseVolume = 1000000;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString();
      const price = currentPrice * (1 + (Math.random() - 0.5) * 0.1);
      const volume = baseVolume * (0.5 + Math.random());

      priceData.push({ date, price });
      volumeData.push({ date, volume });
    }

    return { priceData, volumeData };
  };

  const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let ema = data[0].price;
    return data.map((item, i) => {
      if (i === 0) return { ...item, ema };
      ema = (item.price * k) + (ema * (1 - k));
      return { ...item, ema };
    });
  };

  const dataWithEMA = showEMA ? calculateEMA(calculateEMA(priceChartData, 113), 120) : priceChartData;

  if (loading) return <div className="text-center text-teal-400 my-10">Loading data...</div>;
  if (error) return <div className="text-center text-red-400 my-10">{error}</div>;

  return (
    <div>
      <HeroSection />
      
      {/* Current Price and 24h Change */}
      <section className="py-8 px-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-teal-400 glow">JENNER Token</h3>
          <p className="text-2xl font-bold text-teal-300">
            Current Price: ${tokenInfo.quote.USD.price.toFixed(6)}
            <span className={`ml-4 ${tokenInfo.quote.USD.percent_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {tokenInfo.quote.USD.percent_change_24h.toFixed(2)}% (24h)
            </span>
          </p>
        </div>
      </section>

      {/* Price Chart Section */}
      <section className="py-16 px-4 bg-gray-800" id="charts">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
            JENNER Token Price (Last 30 Days)
          </h3>
          <div className="mb-4">
            <button 
              onClick={() => setShowEMA(!showEMA)} 
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-400 transition duration-300"
            >
              {showEMA ? 'Hide EMA' : 'Show EMA (113 & 120)'}
            </button>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-xl p-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dataWithEMA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="date" stroke="#4FD1C5" />
                <YAxis stroke="#4FD1C5" domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
                <Line type="monotone" dataKey="price" stroke="#4FD1C5" strokeWidth={2} dot={false} />
                {showEMA && (
                  <>
                    <Line type="monotone" dataKey="ema" stroke="#FF69B4" strokeWidth={1} dot={false} />
                    <Line type="monotone" dataKey="ema" stroke="#FFA500" strokeWidth={1} dot={false} />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Volume Chart Section */}
      <section className="py-16 px-4 bg-gray-900" id="volume-chart">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
            JENNER Token Daily Volume (Last 30 Days)
          </h3>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="date" stroke="#4FD1C5" />
                <YAxis stroke="#4FD1C5" />
                <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
                <Bar dataKey="volume" fill="#4FD1C5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <StatisticsSection tokenInfo={tokenInfo} />
    </div>
  );
};

export default HomePage;
