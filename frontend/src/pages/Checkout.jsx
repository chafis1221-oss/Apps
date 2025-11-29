import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Checkout = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    axios.post('https://apps-8wf5.onrender.com/api/create-checkout-session')
      .then(res => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch(err => {
        alert('Checkout sementara gagal, coba lagi');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout Sekarang</h1>
        <p className="text-xl mb-8">Harga: <strong>Rp 299.000</strong></p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
