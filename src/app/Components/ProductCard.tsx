import Image from "next/image";

type ProductCardProps = {
    image: string;
    name: string;
    price: string;
};

const ProductCard = ({ image, name, price }: ProductCardProps) => {
    return (
        <div className="relative w-full flex flex-col gap-4  ">
            {/* Image Container */}
            <div className="relative w-full h-80">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes='25vw'
                    className='absolute object-cover rounded-md z-10  transition-opacity duration-500 ease'
                />
            </div>

            <div className="flex flex-col gap-2 p-4">
                <div className="font-medium text-lg text-gray-900">{name}</div>
                <div className="font-semibold text-2xl text-gray-800">Rs. {price}</div>



            </div>


        </div>
    );
};

export default ProductCard;
