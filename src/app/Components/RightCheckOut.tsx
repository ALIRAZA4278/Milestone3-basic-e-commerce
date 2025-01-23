// RightCheckOut.tsx
import { client } from '@/sanity/lib/client'; 
import React, { useState } from 'react';

type CartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

interface RightCheckOutProps {
  cartItems: CartItem[];
}

const RightCheckOut: React.FC<RightCheckOutProps> = ({ cartItems }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const orderData = {
      ...formValues,
      items: cartItems.map((item) => ({
        _key: item.productId,  
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: new Date().toISOString(),
      status: 'Pending', 
    };

    try {
      const response = await client.create({
        _type: 'order',
        ...orderData,
      });

      setSubmitMessage('Order submitted successfully!');
      console.log('Order submitted:', response);
    } catch (error) {
      setSubmitMessage('There was an error submitting your order.');
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-8">Checkout Form</h2>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">First Name</label>
            <input type="text" id="name" name="name" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-lg font-medium">Last Name</label>
            <input type="text" id="lastName" name="lastName" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
            <input type="email" id="email" name="email" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium">Phone Number</label>
            <input type="text" id="phone" name="phone" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="address" className="block text-lg font-medium">Address</label>
            <textarea id="address" name="address" required className="w-full p-3 border rounded-md shadow-sm" rows={4}></textarea>
          </div>

          <div>
            <label htmlFor="city" className="block text-lg font-medium">City</label>
            <input type="text" id="city" name="city" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="country" className="block text-lg font-medium">Country</label>
            <input type="text" id="country" name="country" required className="w-full p-3 border rounded-md shadow-sm" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="botcheck" name="botcheck" checked={isChecked} onChange={handleCheckboxChange} className="mr-2" />
            <label htmlFor="botcheck" className="text-sm text-gray-500">Im not a robot</label>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors duration-300">
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
        
        {submitMessage && (
          <div className="mt-6 text-center text-lg text-blue-600">
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RightCheckOut;
