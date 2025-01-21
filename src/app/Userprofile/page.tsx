"use client";
import React, { useEffect, useState } from 'react';

interface Item {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  name: string;
  email: string;
  city: string;
  country: string;
  company?: string;
  address: string;
  province: string;
  zipCode: string;
  phone: string;
  message?: string;
  status: string;
  items: Item[];
}

interface Profile {
  username: string;
  email: string;
  city: string;
  country: string;
}

const Page = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error("Error parsing stored order:", error);
      }
    }

    const storedProfile = localStorage.getItem("user");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing stored profile:", error);
      }
    }
  }, []);

  if (!profile) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">Profile Not Found</h2>
        <p className="text-lg text-gray-600 mt-2">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#FBEBB5] rounded-xl shadow-xl mt-10 border border-yellow-300">
      <h2 className="text-4xl font-bold text-yellow-900 mb-8 text-center">User Profile</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold text-yellow-900 mb-4">User Info</h3>
          <p className="text-yellow-800 text-lg">Username: <span className="font-medium">{order?.name || 'N/A'}</span></p>
          <p className="text-yellow-800 text-lg">Email: <span className="font-medium">{order?.email || 'N/A'}</span></p>
          <p className="text-yellow-800 text-lg">City: <span className="font-medium">{order?.city || 'N/A'}</span></p>
          <p className="text-yellow-800 text-lg">Country: <span className="font-medium">{order?.country || 'N/A'}</span></p>
        </div>

        {order ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-semibold text-yellow-900 mb-6">Order History</h3>
            <p className="text-yellow-800 text-lg">Order Status: <span className="font-medium">{order.status}</span></p>
            <p className="text-yellow-800 text-lg">Name: <span className="font-medium">{order.name}</span></p>
            <p className="text-yellow-800 text-lg">Company: <span className="font-medium">{order.company || 'N/A'}</span></p>
            <p className="text-yellow-800 text-lg">Country: <span className="font-medium">{order.country}</span></p>
            <p className="text-yellow-800 text-lg">Address: <span className="font-medium">{order.address}</span></p>
            <p className="text-yellow-800 text-lg">City: <span className="font-medium">{order.city}</span></p>
            <p className="text-yellow-800 text-lg">Province: <span className="font-medium">{order.province}</span></p>
            <p className="text-yellow-800 text-lg">Zip Code: <span className="font-medium">{order.zipCode}</span></p>
            <p className="text-yellow-800 text-lg">Phone: <span className="font-medium">{order.phone}</span></p>
            <p className="text-yellow-800 text-lg">Email: <span className="font-medium">{order.email}</span></p>
            <p className="text-yellow-800 text-lg">Message: <span className="font-medium">{order.message || 'N/A'}</span></p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">Items:</h3>
              {order.items && order.items.length > 0 ? (
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-2 px-4 bg-yellow-100 rounded-lg shadow-sm">
                      <span className="text-yellow-900 font-medium">{item.title} x {item.quantity}</span>
                      <span className="text-yellow-900 font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-yellow-800">No items found.</p>
              )}
            </div>

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-yellow-900">Total: Rs. {order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</h3>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-yellow-800">No order history found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
