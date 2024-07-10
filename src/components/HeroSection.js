import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-teal-400 glow">
          Revolutionize Your Investments with Jenner Token
        </h2>
        <p className="text-xl text-teal-200 mb-2 max-w-2xl mx-auto">
          Unlock the power of blockchain technology and experience unparalleled financial freedom with Jenner Token.
        </p>
        <p className="text-sm text-teal-300 mb-8">
          CA: 0x482702745260ffd69fc19943f70cffe2cacd70e9
        </p>
        <button className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-400 transition duration-300 transform hover:scale-105 glow">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
