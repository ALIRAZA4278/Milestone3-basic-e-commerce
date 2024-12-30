"use client";

import { useState } from "react";

// Function to add product to the cart
const addToCart = (
  productId: string,
  title: string,
  image: string,
  quantity: number,
  price: number
) => {
  try {
    let existingCart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log("Existing Cart before adding product: ", existingCart);

    if (!Array.isArray(existingCart)) {
      console.error("Existing cart is not an array! Initializing with an empty array.");
      existingCart = [];
    }

    const productIndex = existingCart.findIndex((item: any) => item.productId === productId);

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += quantity;
      console.log("Updated Cart after modifying quantity: ", existingCart);
    } else {
      existingCart.push({ productId, title, image, quantity, price });
      console.log("Updated Cart with New Product: ", existingCart);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("Cart saved to localStorage: ", existingCart);

    alert("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("There was an error adding the product to your cart.");
  }
};

const Add = ({
  productId,
  title,
  image,
  stockNumber,
  price,
}: {
  productId: string;
  title: string;
  image: string;
  stockNumber: number;
  price: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stockNumber) {
      addToCart(productId, title, image, quantity, price);
    } else {
      alert("Selected quantity exceeds stock!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span> left
            </div>
          )}
        </div>

        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          disabled={quantity === 0 || quantity > stockNumber}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;