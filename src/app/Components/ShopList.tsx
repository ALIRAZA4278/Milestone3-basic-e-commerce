 
"use client";  

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";  
import Image from "next/image";  
import { urlForImage } from "@/sanity/lib/image";
import { useSearchParams } from "next/navigation"; 

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  slug: string;
};

export default function ShopList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Get search params (e.g., min, max)
  const searchParams = useSearchParams();
  const minPrice = searchParams.get('min') ? parseFloat(searchParams.get('min')!) : null;
  const maxPrice = searchParams.get('max') ? parseFloat(searchParams.get('max')!) : null;

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        title,
        "slug": slug.current,
        summary,
        discountedPrice,
        price,
        image,
        colors,
        sizeQuantities,
        totalItems,
        featured,
        _id
      }`;

      try {
        const fetchedProducts: Product[] = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on price range
  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price);
    let isWithinPriceRange = true;

    if (minPrice !== null && price < minPrice) {
      isWithinPriceRange = false;
    }

    if (maxPrice !== null && price > maxPrice) {
      isWithinPriceRange = false;
    }

    return isWithinPriceRange;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-44 flex gap-x-8 gap-y-16 justify-between flex-wrap w-full ">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/Shop/${product.slug}`}
                className="inline-block px-6 py-2 text-black rounded-full text-lg font-semibold transition-transform transform hover:scale-110"
              >
                {/* Image Section */}
                <div className="relative w-full h-[280px] rounded-t-2xl overflow-hidden group-hover:brightness-75 transition-all duration-300">
                  <Image
                    src={urlForImage(product.image).url()}
                    alt={product.title}
                    fill
                    sizes="25vw"
                    className="absolute rounded-md z-10 transition-opacity ease duration-500"
                  />
                </div>

                {/* Title and Summary */}
                <div className="flex flex-col justify-between p-6 space-y-4">
                  <div className="w-full justify-between">
                    <div className="font-medium">{product.title}</div>
                    <div className="font-semibold text-2xl">Rs.{product.price}</div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-black hover:text-white">
                    Add to Cart
                  </button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl"></div>
              </Link>
            ))
          ) : (
            <div>No products found within this price range</div>
          )}
        </div>
      </div>
    </div>
  );
}
