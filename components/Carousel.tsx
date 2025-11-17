"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <div className="relative max-w-5xl mx-auto">
      <Card className="relative overflow-hidden rounded-2xl shadow-lg border-none">
        {currentProduct.images?.[0] && (
          <div className="relative h-[420px] sm:h-[500px] w-full transition-all duration-700 ease-in-out">
            <Image
              alt={currentProduct.name}
              src={currentProduct.images[0]}
              fill
              className="object-cover transition-opacity duration-700 ease-in-out"
              priority
            />
          </div>
        )}

        {/* Overlay */}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 backdrop-blur-sm transition-all duration-500">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            {currentProduct.name}
          </CardTitle>
          {price?.unit_amount && (
            <p className="text-2xl font-semibold text-white drop-shadow-md">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? "bg-white scale-110 shadow-md"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
