import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

type ImageItem = {
  // Define the structure of each image object
  // Assuming each item has a `url` function
  url: () => string;
};

const ProductImages = ({ items }: { items: ImageItem[] }) => {
  return (
    <div>
      <div className="h-[500px] relative p-0">
        <Image
          src={urlForImage(items).url()}
          alt="Featured image"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
    </div>
  );
};

export default ProductImages;
