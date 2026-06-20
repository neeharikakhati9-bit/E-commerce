"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setvalue] = useState(0);
  useEffect(() => {
    console.log("useeffect is called" + value + " times");
  }, [value])
  return (
    <div>
      <h1 className="text-4xl text-green-400">E-commerce</h1>
      <div className="flex items-center justify-center gap-10">
        <Button onClick={() => setvalue(value - 1)}>-</Button>
        <h1 className="text-4xl font-black">{value}</h1>
        <Button onClick={() => setvalue(value + 1)}>+</Button>
      </div>
    </div>
  );
};

export default App;
