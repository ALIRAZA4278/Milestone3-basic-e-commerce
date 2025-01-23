import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';

interface Item {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
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
  items: Item[] | null; // Allow null or undefined
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch data from Sanity
    client
      .fetch(
        `*[_type == "order"] {
          _id,
          name,
          email,
          city,
          country,
          address,
          province,
          zipCode,
          phone,
          message,
          status,
          items[] {
            title,
            quantity,
            price
          }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen w-full p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Admin Dashboard - Orders</h1>

      <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Order Items</th>
              <th className="py-3 px-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-3 px-4 text-gray-400">
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-600">
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">
                    {order.address}, {order.city}, {order.province}, {order.zipCode}, {order.country}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-white px-3 py-1 rounded-md ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {/* Render order items with scroll */}
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {(order.items ?? []).slice(0, 5).map((item, idx) => (
                        <div key={idx}>
                          <strong>{item.title}</strong> - {item.quantity} x ${item.price.toFixed(2)}{' '}
                          <br />
                          <span className="text-sm text-gray-400">
                            Total: ${item.quantity * item.price}
                          </span>
                        </div>
                      ))}
                      {order.items && order.items.length > 5 && (
                        <div className="text-blue-500 text-sm mt-2">See More...</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {/* Calculate total for this order */}
                    ${order.items?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
