"use client";
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white py-2 px-2">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        
        {/* Contact Information */}
        <div className="text-sm">
       <Link href="/Contact">📞 Contact Us: 03212865058</Link>  
        </div>
        
        {/* Order Now Button (Center) */}
        <div className="text-sm font-semibold max-[768px]:hidden">
        <Link href="/Shop">
          <button className="bg-yellow-500 text-gray-800 py-1 px-4 rounded hover:bg-yellow-600 focus:outline-none">
            Order Now
          </button>
          </Link>  
        </div>

        {/* Profile Section */}
        <div className="text-sm">
          
        <Link href="/Userprofile">
          <span>👤 View Your Profile</span>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
