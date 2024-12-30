"use client";

import { useState } from "react";
import Add from "./Add";

const CustomizeProducts = ({
  product,
  productId,
  colors,
  sizeQuantities,
  totalItems,
}: {
  product: any;
  productId: string;
  colors: string[];
  sizeQuantities: { [key: string]: number };
  totalItems: number;
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity <= 0) return 1;
      if (selectedSize && sizeQuantities[selectedSize] < newQuantity) {
        return sizeQuantities[selectedSize];
      }
      return newQuantity;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Total Items */}
      <div className="text-lg font-semibold">
        Total Items Available: {totalItems}
      </div>

      {/* Choose a Color */}
      <div className="flex flex-col gap-4">
        <h4 className="font-medium">Choose a Color</h4>
        <ul className="flex items-center gap-3">
          {colors.map((color) => (
            <li
              key={color}
              className={`w-8 h-8 rounded-full ring-1 ring-gray-300 relative ${
                selectedColor === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                backgroundColor: color,
                cursor: "pointer",
              }}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColor === color && (
                <div className="absolute w-10 h-10 rounded-full ring-2 ring-blue-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Choose a Size */}
      <div className="flex flex-col gap-4">
        <h4 className="font-medium">Choose a Size</h4>
        <ul className="flex items-center gap-3">
          {Object.entries(sizeQuantities).map(([size, quantity]) => (
            <li
              key={size}
              className={`ring-1 ring-gray-300 text-sm rounded-md py-1 px-4 ${
                selectedSize === size
                  ? "bg-blue-500 text-white"
                  : quantity > 0
                  ? "text-black"
                  : "text-gray-400 bg-gray-100"
              }`}
              style={{
                cursor: quantity > 0 ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                if (quantity > 0) handleSizeSelect(size);
              }}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}{" "}
              {quantity > 0 ? "" : "Out of Stock"}
            </li>
          ))}
        </ul>
      </div>

      {/* Add to Cart */}
      <Add
        productId={productId}
        stockNumber={sizeQuantities[selectedSize]}
        title={product.title}
        image={product.image}
        price={product.price}
      />
    </div>
  );
};

export default CustomizeProducts;
