import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://apps-8wf5.onrender.com/api/products')
      .then(res => setProduct(res.data[0]))
      .catch(err => console.error(err));
  }, []);

  if (!product) return <div className="flex justify-center items-center h-64">Loading...</div>;

  const langKey = i18n.language === 'en' ? 'en' : 'id';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img src={product.image} alt={product.name[langKey]} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{product.name[langKey]}</h1>
          <p className="text-gray-600 mb-4">{product.description[langKey]}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">{t('home.price')}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {t('home.buy')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
