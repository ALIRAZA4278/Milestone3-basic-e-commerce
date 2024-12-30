"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DeliveryPage from "../Components/DeliveryPage";
import CartModal from "../Components/CartModal";
import Breadcrumb from "../Components/Breadcrumb";
import { urlForImage } from "@/sanity/lib/image";

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);  
  const [isModalOpen, setModalOpen] = useState(false);  

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

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));  
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center h-[calc(40vh-80px)]"
        style={{
          backgroundImage: "url('/ShopBackgroud.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center text-black px-4">
          <Image src="/ShopLogo.png" alt="Logo" width={100} height={100} />
          <p className="text-4xl md:text-5xl font-normal mb-2">Cart</p>
          <Breadcrumb />
        </div>
      </div>
      <div className="min-h-fit p-4 md:p-8 bg-white">
        {!cart.length ? (
          <div className="text-center text-lg font-semibold">Cart is Empty</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section: Cart Items */}
            <div className="col-span-2 overflow-x-auto">
              <table className="w-full bg-white rounded-md shadow-md min-w-full">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Subtotal</th>
                    <th className="p-4 text-center">Action</th>
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
                      <td className="p-4 text-center">
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Section: Cart Totals */}
            <div className="p-4 bg-yellow-50 rounded-md shadow-md">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Cart Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>Rs.{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-sm md:text-2xl mt-4">
                <span>Total</span>
                <span>Rs.{totalPrice.toFixed(2)}</span>
              </div>
              <div className="w-full items-center justify-center mt-6">
                <Link href="/Checkout">
                  <button
                    className="w-full py-4 px-4 bg-transparent text-black border-4 border-black rounded-full hover:bg-black hover:text-white text-lg md:text-xl"
                  >
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <DeliveryPage />
      </div>

      {/* Cart Modal - Toggle visibility */}
      {isModalOpen && <CartModal />}

      {/* Cart Modal Button */}
      <button
        onClick={() => setModalOpen(!isModalOpen)}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg"
      >
        View Cart
      </button>
    </>
  );
};

export default CartPage;
