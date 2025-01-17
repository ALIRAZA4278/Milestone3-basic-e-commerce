// "use client"; // Uncomment if you're using client-side rendering in Next.js 13 with App Directory

import Link from "next/link";
import Slider from "./Components/Slider";
import HomeSection2 from "./Components/HomeSection2";
import HomeSection4 from "./Components/HomeSection4";
import HomeSection5 from "./Components/HomeSection5";
import HomeSection6 from "./Components/HomeSection6";
import ProductList from "./Components/ProductList";
import { client } from "@/sanity/lib/client";

const HomePage = async () => {
    const query = `*[_type == "product" ] {
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

    const products: Product[] = await client.fetch(query);

    return (
        <div className="bg-white text-black">
            {/* part 1 */}
            <Slider />

            {/* part 2 */}
            <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-[#FAF4F4]">
                <HomeSection2 />
            </div>

            <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-white">
                <h1 className="text-4xl w-full text-center">Top Picks For You</h1>
                <p className="w-full text-center mt-2">
                    Find a bright ideal to suit your taste with our great selection of floor and table lights
                </p>
                
                {/* Displaying the first 4 products */}
                {products.slice(0, 4).map((product) => (
                    <ProductList products={product} key={product._id} />
                ))}
                
                <div className="h-12 w-full items-center justify-center text-center">
                    <Link href="/Shop">
                        <button className="text-black underline py-4 px-2 mt-4 xl:mt-8 text-lg lg:text-xl underline-offset-8 decoration-2">
                            View More
                        </button>
                    </Link>
                </div>
            </div>

            {/* part 4 */}
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-0 bg-[#FFF9E5]">
                <HomeSection4 />
            </div>

            {/* part 5 */}
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-0">
                <h1 className="text-4xl w-full text-center">Our Blog</h1>
                <p className="w-full text-center mt-2">
                    Find a bright ideal to suit your taste with our great selection of floor and table lights
                </p>
                <HomeSection5 />
            </div>

            {/* part 6 */}
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-0">
                <HomeSection6 />
            </div>
        </div>
    );
};

export default HomePage;


 