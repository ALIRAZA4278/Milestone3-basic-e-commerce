import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";


export default function ProductList({ products }: { products: Product }) {
  return (
    <div className="">

      <Link
        href={`/Shop/${products.slug}`}
        className="flex flex-col group m-4 text-black rounded-full text-lg font-semibold transition-transform transform hover:scale-110 items-center justify-center max-[768px]:items-center max-[768px]:justify-center max-[768px]:text-center max-[768px]:w-full max-[768px]:block max-[768px]:m-0"
      >
        {/* Image Section */}
        <div className="relative w-[290px] h-[320px] rounded-t-2xl overflow-hidden group-hover:brightness-75 transition-all duration-300 max-[768px]:items-center max-[768px]:justify-center max-[768px]:text-center max-[768px]:w-full max-[768px]:block ">
          <Image
            src={urlForImage(products.image).url()}
            alt={products.title}
            fill
            className="absolute rounded-md z-10 transition-opacity ease duration-500 "
          />
        </div>

        {/* Title and Summary */}
        <div className="flex flex-col justify-between p-6 space-y-4">
          <div className="w-full justify-between">
            <div className="font-medium">{products.title}</div>
            <div className="font-semibold text-2xl">Rs.{products.price}</div>
          </div>

          <Link
            href={`/Shop/${products.slug}`}
            className="inline-block px-6 py-2   text-black  text-lg font-semibold transition-transform transform hover:scale-110   "
          >
            <button className="rounded-2xl ring-1 ring-lama text-lama w-full py-2 px-4 text-xs hover:bg-black hover:text-white " >
              Add to Cart
            </button>
          </Link>
        </div>


        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl"></div>
      </Link>
    </div>
  );
}
