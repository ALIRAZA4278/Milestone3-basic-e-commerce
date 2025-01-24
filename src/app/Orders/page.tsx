"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DeliveryPage from "../Components/DeliveryPage";
import Breadcrumb from "../Components/Breadcrumb";
import { urlForImage } from "@/sanity/lib/image";

// Define a type for a cart item
interface CartItem {
  productId: string;
  image: string | { asset: { _ref: string; _type: string } }; // Adjusted for possible Sanity image object
  title: string;
  price: number;
  quantity: number;
  status: string;  // Added a status field to indicate the order status
}

const UserOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);  // Updated type here
  // const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);  
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

 

 
  return (
    <>
      <div
        className="relative bg-cover bg-center h-[calc(40vh-80px)] bg-white text-black"
        style={{
          backgroundImage: "url('/ShopBackgroud.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center text-black px-4">
          <Image src="/ShopLogo.png" alt="Logo" width={100} height={100} />
          <p className="text-4xl md:text-5xl font-normal mb-2">Your Orders</p>
          <Breadcrumb />
        </div>
      </div>
      <div className="min-h-fit p-4 md:p-8 bg-white">
        {!cart.length ? (
          <div className="text-center text-lg font-semibold">Cart is Empty</div>
        ) : (
          <div className="w-full gap-8 text-black">
            {/* Left Section: Cart Items */}
            <div className="col-span-3 overflow-x-auto">
              <table className="w-full bg-white rounded-md shadow-md min-w-full">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Subtotal</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId} className="border-t">
                      <td className="p-4 flex items-center gap-2">
                        {item.image && (
                          <Image
                            src={urlForImage(item.image).url()}
                            alt={item.title}
                            width={72}
                            height={72}
                            className="object-cover rounded-md"
                          />
                        )}
                        <span className="truncate max-w-[150px] md:max-w-full">
                          {item.title}
                        </span>
                      </td>
                      <td className="p-4">Rs.{item.price}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-16 border rounded-md text-center"
                          readOnly
                        />
                      </td>
                      <td className="p-4">
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-md font-semibold ${
                            item.status === "Confirmed"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {item.status === "Confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
 
          </div>
        )}
        <DeliveryPage />
      </div>

      
    </>
  );
};

export default UserOrder;
