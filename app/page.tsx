import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Carousel from "@/components/Carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  const firstProductImage = products.data[0]?.images[0] ?? "/placeholder.png";

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-100 via-white to-neutral-50 py-16 sm:py-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 sm:px-12">
          {/* Text Content */}
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
              Welcome to <span className="text-black">Shoppigo</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover the latest products, top deals, and exclusive offers — all in one place.
            </p>
            <Button
              asChild
              variant="default"
              className="rounded-full bg-black hover:bg-gray-900 text-white px-8 py-4 text-lg transition-all shadow-md hover:shadow-lg"
            >
              <Link href="/Products">Browse All Products</Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="relative w-80 sm:w-96 h-80 sm:h-96">
              <Image
                alt="Featured product"
                src={firstProductImage}
                fill
                className="object-cover rounded-2xl shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
      </section>

      {/* Product Carousel Section */}
      <section className="container mx-auto px-6 sm:px-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
          Featured Products
        </h2>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
