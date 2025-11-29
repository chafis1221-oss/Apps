import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Admin = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      alert('Login dulu!');
      return;
    }
    axios.get('https://apps-8wf5.onrender.com/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error loading orders:', err));
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('admin.orders')}</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Belum ada order</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id}>
                    <td className="px-6 py-4">{order._id.slice(-6)}</td>
                    <td className="px-6 py-4">{order.userId?.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1">View</button>
                      <button className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1">Approve</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
