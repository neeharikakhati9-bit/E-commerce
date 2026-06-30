"use client";
import { Button } from "@/components/ui/button";
import { useItemStore } from "@/store/item.store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const { items, getItems } = useItemStore();

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div>
      <h1 className="text-4xl text-green-400">E-commerce</h1>
      <div className="flex items-center justify-center gap-10">
        <Button onClick={() => setValue(value - 1)}>-</Button>
        <h1 className="text-4xl font-black">{value}</h1>
        <Button onClick={() => setValue(value + 1)}>+</Button>
      </div>

      <div className="min-h-screen bg-green-50 p-5">
        <h1 className="text-center text-4xl font-semibold">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-5 border-2 border-black bg-green-50 flex items-center justify-center md:flex-col"
            >
              <Image
                src={item.image}
                height={500}
                width={500}
                alt={item.name}
                className="size-48 rounded-full"
              />

              {/* content */}
              <div className="flex items-center flex-col text-xl font-bold bg-yellow-200">
                <h1>{item.name}</h1>
                <h1 className="text-sm font-medium ">{item.description}</h1>
                <h1>{item.price}</h1>
                <h1 className="text-base font-medium">{item.seller.name}</h1>
                <h1>{item.seller.email}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
