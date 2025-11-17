"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import { checkoutAction } from "./checkout-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/Checkout");
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (total === 0 || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty 🛒</h2>
        <p className="text-gray-600 mb-6">
          It looks like you haven’t added anything yet.
        </p>
        <Button asChild variant="default" className="rounded-full px-6 py-3 bg-black text-white">
          <a href="/Products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 py-12">
      <div className="container mx-auto px-6 sm:px-12">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
          Checkout
        </h1>

        <Card className="max-w-md mx-auto shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-6">
              {items.map((item, key) => (
                <li key={key} className="flex flex-col gap-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-800">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold text-gray-900">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full"
                    >
                      −
                    </Button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center text-lg font-semibold text-gray-900 border-t pt-4">
              <span>Total:</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <form
          action={checkoutAction}
          className="max-w-md mx-auto mt-8"
        >
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button
            type="submit"
            variant="default"
            className="w-full text-lg py-4 rounded-full bg-black hover:bg-gray-900 text-white shadow-md hover:shadow-lg transition-all"
          >
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
