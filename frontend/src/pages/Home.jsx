import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Home = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get('https://apps-8wf5.onrender.com/api/products')
      .then(res => setProduct(res.data[0]))
      .catch(err => console.error(err));
  }, []);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img src={product.image} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="text-5xl font-bold text-purple-600 mb-8">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
            <a href="/checkout" className="block text-center bg-purple-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-purple-700 transition">
              {t('buyNow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
