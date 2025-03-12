// src/app/user/near-you/content.tsx
"use client";

import React from 'react';

const fishingSpots = [
  { id: 1, name: "Blue Lake", distance: "2.3 miles", type: "Freshwater", popularFish: ["Bass", "Trout"] },
  { id: 2, name: "Harbor Point", distance: "4.1 miles", type: "Saltwater", popularFish: ["Cod", "Mackerel"] },
  { id: 3, name: "Green River", distance: "5.5 miles", type: "Freshwater", popularFish: ["Salmon", "Pike"] },
  { id: 4, name: "Sunset Beach", distance: "7.2 miles", type: "Saltwater", popularFish: ["Flounder", "Sea Bass"] },
];

export default function NearYouContent() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Welcome to The Daily Catch</h1>
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Today's Forecast</h2>
        <p className="mb-4">
          Perfect conditions for fishing! Sunny with light winds.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-100">
            <h3 className="font-bold text-lg mb-2">Weather</h3>
            <p>72°F, Wind 5mph SE, Humidity 65%</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded border border-green-100">
            <h3 className="font-bold text-lg mb-2">Water Conditions</h3>
            <p>Water temp: 68°F, Clarity: Good</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Fishing Spots Near You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fishingSpots.map(spot => (
          <div key={spot.id} className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-2">{spot.name}</h2>
            <div className="mb-2 text-sm text-gray-600">Distance: {spot.distance}</div>
            <div className="mb-2">Type: <span className="font-medium">{spot.type}</span></div>
            <div>
              <span className="font-medium">Popular Fish:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {spot.popularFish.map(fish => (
                  <span key={fish} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {fish}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}