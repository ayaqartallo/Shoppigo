import ProductList from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 py-16">
      <div className="container mx-auto px-6 sm:px-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our full collection — handpicked items crafted for quality and value.
          </p>
        </header>

        <ProductList products={products.data} />
      </div>
    </div>
  );
}
