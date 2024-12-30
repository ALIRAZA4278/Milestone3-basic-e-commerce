import { client } from "@/sanity/lib/client";
import ProductImages from "@/app/Components/ProductImages";
import ProductsDescriptions from "@/app/Components/ProductsDescriptions";
import Add from "@/app/Components/Add";
import CustomizeProducts from "@/app/Components/CustomizeProducts";
import Head from "next/head";

// Next.js expects PageProps to be typed based on route parameters in App Directory
type PageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 10; // seconds

// The function is async so we can wait for params
export default async function Page({ params }: PageProps) {
  // Await the params before using them
  const { slug } = await params;

  try {
    const query = `*[_type=='product' && slug.current==  "${slug}"] {
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
    } [0]`;

    const product = await client.fetch(query);
    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <>
        <Head>
          <title>{product.title} - Your Store Name</title>
          <meta name="description" content={product.summary} />
        </Head>
        <div className="px-0 mx-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 top-20 h-max">
            <ProductImages items={product.image} />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl font-medium">{product.title}</h1>
            {product.price === product.discountedPrice ? (
              <h2 className="font-medium text-2xl">Rs. {product.price}</h2>
            ) : (
              <div className="flex items-center gap-4">
                <h3 className="text-xl text-gray-500 line-through">Rs. {product.price}</h3>
                <h2 className="font-medium text-2xl">Rs. {product.discountedPrice}</h2>
              </div>
            )}
            <div className="flex gap-2">
              <div className="star">⭐️</div>
              <div className="star">⭐️</div>
              <div className="star">⭐️</div>
              <div className="star">⭐️</div>
              <div className="star">⭐️</div>
              |
              <p className="text-gray-500">5 Customer Reviews</p>
            </div>
            <p className="text-gray-500">{product.summary}</p>
            {product.colors && product.sizeQuantities ? (
              <CustomizeProducts
                product={product}
                totalItems={product.totalItems}
                productId={product._id!}
                colors={product.colors}
                sizeQuantities={product.sizeQuantities}
              />
            ) : (
              <Add
                productId={product._id!}
                title={product.title}
                price={product.discountedPrice}
                image={product.image}
                stockNumber={product.totalItems}
              />
            )}
            <div className="h-[2px] bg-gray-100" />
          </div>
        </div>
        <div className="w-full h-auto">
          <ProductsDescriptions />
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch product", error);
    return <div>Failed to load product</div>;
  }
}
