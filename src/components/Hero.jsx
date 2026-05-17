import { useState } from "react";
import heroImg from "../assets/pexels-sliceisop-24827275.jpg";
const filterTags = ["All", "Dealer", "Mechanic", "Coupe", "Hybrid"];
const tabOptions = ["All", "New", "Used"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="relative min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-16 w-full max-w-3xl mx-auto">
        <p className="text-white/80 text-sm mb-2 tracking-wide">
          Find cars for sale and for rent near you
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Find Your Perfect Car
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 mb-5">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold pb-1 transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-white border-blue-500"
                  : "text-white/60 border-transparent hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-xl flex flex-col sm:flex-row items-stretch w-full max-w-2xl overflow-hidden">
          {/* Make */}

          {/* Search Button */}
          <button className="bg-gray-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Search Cars
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <span className="text-white/70 text-xs mr-1 self-center">Or Browse Featured Model:</span>
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                activeFilter === tag
                  ? "bg-gray-600 border-gray-600 text-white"
                  : "border-white/40 text-white/80 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}