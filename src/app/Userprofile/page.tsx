import React from 'react'

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

const AdminDashboard = () => {

  // Example mock orders data
  const orders: Order[] = [
    {
      name: "John Doe",
      email: "john@example.com",
      city: "New York",
      country: "USA",
      address: "123 Main St",
      province: "NY",
      zipCode: "10001",
      phone: "123-456-7890",
      status: "Shipped",
      items: [
        { title: "Laptop", quantity: 1, price: 999.99 },
        { title: "Mouse", quantity: 2, price: 25.00 },
      ],
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      city: "Los Angeles",
      country: "USA",
      address: "456 Oak Ave",
      province: "CA",
      zipCode: "90001",
      phone: "987-654-3210",
      status: "Pending",
      items: [
        { title: "Headphones", quantity: 1, price: 79.99 },
      ],
    },
    {
      name: "Sam Wilson",
      email: "sam@example.com",
      city: "Chicago",
      country: "USA",
      address: "789 Birch Rd",
      province: "IL",
      zipCode: "60601",
      phone: "555-123-4567",
      status: "Delivered",
      items: [
        { title: "Monitor", quantity: 1, price: 249.99 },
      ],
    },
  ]

  return (
    <div className='h-screen w-full p-10 bg-gray-100'>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{order.name}</td>
                <td className="py-2 px-4">{order.email}</td>
                <td className="py-2 px-4">{order.address}, {order.city}, {order.province}, {order.zipCode}, {order.country}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <strong>{item.title}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
