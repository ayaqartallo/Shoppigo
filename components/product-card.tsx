"use client";
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price | undefined;

  if (!product.id) return null; 

  return (
    <Link href={`/Products/${product.id}`} className="block h-full">
      <Card className="group h-full flex flex-col rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] overflow-hidden">
        {/* Product Image */}
        {product.images?.[0] && (
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="rounded-t-2xl transition-opacity duration-300 group-hover:opacity-90 object-contain"
              priority
            />
          </div>
        )}

        {/* Card Header */}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-900">{product.name}</CardTitle>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="p-4 flex flex-col flex-grow justify-between gap-3">
          {product.description && (
            <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
          )}

          {price?.unit_amount && (
            <p className="text-lg font-semibold text-gray-900">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}

          <Button className="mt-2 w-full bg-black hover:bg-gray-900 text-white rounded-full py-3 font-medium transition-all">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
