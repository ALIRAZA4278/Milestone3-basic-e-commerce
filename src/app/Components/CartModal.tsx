"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

// Define the CartItem interface for the structure of each cart item
interface CartItem {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

// CartModal to display items in the cart
const CartModal = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // State to store cart items

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart); // Set cart data
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  // If cart is empty, show an empty cart message
  if (cart.length === 0) {
    return (
      <div className="w-max absolute p-6 rounded-lg shadow-lg bg-white top-12 right-0 flex flex-col gap-4 z-20">
        <div className="text-gray-600 text-center font-medium">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className="w-max absolute p-6 rounded-lg shadow-lg bg-white top-12 right-0 flex flex-col gap-6 z-20 max-[551px]:w-screen">
      <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div className="flex gap-4 border-b pb-4" key={item.productId}>
            {item.image && (
              <Image
                src={urlForImage(item.image).url()}
                alt={item.title}
                width={80}
                height={100}
                className="object-cover rounded-md"
              />
            )}
            <div className="flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-700 overflow-auto">{item.title}</h3>
                  <div className="text-sm font-medium text-gray-600">
                    Rs. {item.price}
                  </div>
                </div>
                {/* <p className="text-sm text-gray-500 mt-1">Size: {item.variantId}</p> */}
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Qty: {item.quantity}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>Rs. {totalPrice}</span>
        </div>
        <div className="flex justify-between mt-4">
          <Link href="/Cart">
            <button className="rounded-md py-2 px-4 border border-gray-300 hover:bg-gray-100 transition">
              View Cart
            </button>
          </Link>
          <Link href="/Checkout">
            <button className="rounded-md py-2 px-4 bg-black text-white hover:bg-gray-800 transition">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
