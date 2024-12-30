import { client } from "@/sanity/lib/client";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image"; // Import Image from Next.js
import { urlForImage } from "@/sanity/lib/image";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  slug: string;
};

export default async function ShopList() {
  // Sanity query to fetch products
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

  // Fetch products from the Sanity database
  const products: Product[] = await client.fetch(query);
  // console.log(products);

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap w-full">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-center">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/Shop/${product.slug}`} // Use product.slug here
              className="inline-block px-6 py-2 text-black rounded-full text-lg font-semibold transition-transform transform hover:scale-110"
            >
              {/* Image Section */}
              <div className="relative w-full h-[280px] rounded-t-2xl overflow-hidden group-hover:brightness-75 transition-all duration-300">
                <Image
                  src={urlForImage(product.image).url()} // Use product.image here
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
          ))}
        </div>
      </div>
    </div>
  );
}
