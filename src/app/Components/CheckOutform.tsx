import { useState, useEffect } from "react";
import RightCheckOut from "./RightCheckOut";

type CartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

type Cart = {
  lineItems: CartItem[];
};

const CheckOutform = () => {
  const [cart, setCart] = useState<Cart>({ lineItems: [] });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart({ lineItems: parsedCart as CartItem[] });
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  const handleConfirm = () => {
    setMessage("Please fill out the checkout form and confirm your order.");
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 w-full mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 max-[768px]:mt-0">
        {/* Right Section (Checkout form) */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RightCheckOut cartItems={cart.lineItems} />
        </div>

        {/* Left Section (Cart items display) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <div className="space-y-4">
            {cart.lineItems.length > 0 ? (
              cart.lineItems.map((item: CartItem) => (
                <div key={item.productId} className="flex justify-between border-b pb-2">
                  <span className="text-md font-medium">{item.title} x {item.quantity}</span>
                  <span className="text-md font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            )}

            {/* Payment Methods */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" checked className="text-[#B88E2F]" />
                  <label className="text-sm font-medium">Cash On Delivery</label>
                </div>
                <p className="text-sm text-gray-600">
                  Currently, only Cash on Delivery is available. Bank transfer will be available soon. Please choose the Cash on Delivery option to proceed with your order.
                </p>
              </div>
            </div>

            {/* Total Section */}
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span className="text-[#B88E2F] text-2xl">
                Rs.{" "}
                {cart.lineItems
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full py-3 mt-6 bg-[#B88E2F] text-white rounded-md hover:bg-[#9f7323] transition-colors duration-300"
            >
              Confirm Order
            </button>
               {/* Confirmation Message */}
      {message && (
        <div className="mt-6 text-center text-lg text-blue-600">
          {message}
        </div>
      )}
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default CheckOutform;
