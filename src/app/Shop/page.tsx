import Image from "next/image";
import ShopList from "../Components/ShopList";
import DeliveryPage from "../Components/DeliveryPage";
import Breadcrumb from "../Components/Breadcrumb";
import Filter from "../Components/Filter";
import { Suspense } from "react";

const Shoppage = () => {
    return (
        <Suspense>


            <div className="bg-white">
                {/* CAMPAIGN */}
                <div
                    className="relative bg-cover bg-center h-[calc(40vh-80px)]"
                    style={{
                        backgroundImage: "url('/ShopBackgroud.png')",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-opacity-50"></div>
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black px-4">
                        <Image src="/ShopLogo.png" alt="Logo" width={100} height={100} />
                        <p className="text-4xl md:text-5xl font-normal mb-2">Shop</p>

                        <Breadcrumb />
                    </div>
                    <Filter />
                </div>


                <ShopList />

                <DeliveryPage />
            </div>
        </Suspense>
    );
};

export default Shoppage;
