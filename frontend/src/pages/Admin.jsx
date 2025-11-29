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
   axios.get('https://apps-8wf5.onrender.com/api/admin/orders ' {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
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
                <th className="px-6 py-3">Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.userId?.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {t(`admin.status.${order.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
