import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Admin = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Login dulu!');
      return;
    }
    axios.get('https://apps-8wf5.onrender.com/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <div className="text-center py-20">Silakan login</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin - Daftar Order</h1>
        {orders.length === 0 ? (
          <p>Belum ada order</p>
        ) : (
          <div className="grid gap-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow">
                <p><strong>ID:</strong> {order._id}</p>
                <p><strong>Email:</strong> {order.userId?.email || 'N/A'}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Alamat:</strong> {order.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
