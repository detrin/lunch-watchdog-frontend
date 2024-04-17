"use client"

import React, { useState, useEffect } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RestaurantMenu></RestaurantMenu>
    </main>
  );
}


export function RestaurantMenu() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('https://eu2.contabostorage.com/62824c32198b4d53a08054da7a8b4df1:lunch-watchdog/menus.json')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error("Failed to fetch restaurant data:", error));
  }, []);

  return (
    <div className="grid w-full gap-4 p-4">
      <div className="flex items-center gap-4">
        <ChevronRightIcon className="h-6 w-6" />
        <h1 className="text-lg font-semibold">Lunch Menu</h1>
      </div>
      {restaurants.map((restaurant, index) => (
        <div className="grid w-full gap-4" key={index}>
          <div className={`grid w-full gap-1 ${index > 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''}`}>
            <h2 className="text-base font-medium">{restaurant.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(restaurant.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
            {restaurant.menu_items.map((item, itemIndex) => (
              <div className="grid grid-cols-2 items-center justify-between" key={itemIndex}>
                <div className="col-span-2 text-sm font-medium">
                  <span>{item.description}</span>
                  {item.description_en && (
                    <span className="block text-gray-500 dark:text-gray-400">{item.description_en}</span>
                  )}
                </div>
                <div className="text-sm font-medium">{item.price},-</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
