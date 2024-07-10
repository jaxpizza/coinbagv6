import React from 'react';

const StatisticsSection = ({ tokenInfo }) => {
  return (
    <section className="py-16 px-4 bg-gray-800" id="statistics">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
          Key Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Market Cap', value: tokenInfo ? `$${tokenInfo.quote.USD.market_cap.toLocaleString()}` : 'N/A' },
            { label: 'Daily Volume', value: tokenInfo ? `$${tokenInfo.quote.USD.volume_24h.toLocaleString()}` : 'N/A' },
            { label: 'Circulating Supply', value: tokenInfo ? tokenInfo.circulating_supply.toLocaleString() : 'N/A' },
          ].map((stat, index) => (
            <div key={index} className="bg-gray-700 rounded-lg shadow-xl p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-teal-300">{stat.label}</h4>
              <p className="text-3xl font-bold text-teal-400 glow">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
