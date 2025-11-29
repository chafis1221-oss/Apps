import { useState } from 'react'; // ← TAMBAH IMPORT REACT
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Checkout = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://apps-8wf5.onrender.com/api/orders', { address }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Order berhasil! Download akan dikirim ke email.');
      window.location.href = '/';
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Coba lagi'));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('checkout.address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50">
            {loading ? 'Memproses...' : t('checkout.submit')}
          </button>
        </form>
        <button onClick={() => window.history.back()} className="w-full mt-2 text-gray-500">Kembali</button>
      </div>
    </div>
  );
};

export default Checkout;
