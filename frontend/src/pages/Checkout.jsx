import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulasi: Di real, post ke /api/create-checkout-session
      const res = await axios.post('http://localhost:5000/api/create-checkout-session', { address }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      window.location.href = res.data.url; // Redirect ke Stripe
    } catch (err) {
      alert('Error: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{t('checkout.address')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('checkout.address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            {t('checkout.submit')}
          </button>
        </form>
        <button onClick={() => navigate('/')} className="w-full mt-2 text-gray-500">Cancel</button>
      </div>
    </div>
  );
};

export default Checkout;