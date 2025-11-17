"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[0] || null,
      quantity: 1,
    });
  };

  const onRemoveItem = () => {
    if (quantity > 0) removeItem(product.id);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 items-center">
      {/* Product Image */}
      {product.images?.[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
          <Image
            alt={product.name}
            src={product.images[0]}
            fill
            className="transition-transform duration-300 hover:scale-105 object-contain"
            priority
          />
        </div>
      )}

      {/* Product Info */}
      <div className="md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700 text-lg">{product.description}</p>
        )}

        {price?.unit_amount && (
          <p className="text-2xl font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold"
            onClick={onRemoveItem}
            disabled={quantity === 0}
          >
            −
          </Button>
          <span className="text-lg font-semibold min-w-[24px] text-center">
            {quantity}
          </span>
          <Button
            className="w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold"
            onClick={onAddItem}
          >
            +
          </Button>
        </div>

        {/* Add to Cart CTA */}
        <Button
          className="mt-4 w-full py-4 bg-black text-white text-lg rounded-full hover:bg-gray-900 transition-all shadow-md"
          onClick={onAddItem}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
