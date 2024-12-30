"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import CartModal from "./CartModal";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [counter, setCounter] = useState(0); // Counter to display the number of items in the cart

  // Load cart data and update the counter when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCounter(parsedCart.length); // Update the cart item count
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/Searchicon.png"
        alt="Search Icon"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <Image
        src="/NavHeartShopping.png"
        alt="Heart Icon"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/NavCardShopping.png" alt="Cart Icon" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center bg-black">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />} {/* Show CartModal when cart icon is clicked */}
    </div>
  );
};

export default NavIcons;
