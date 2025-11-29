import , { useState, useEffect } from 'react'; // ← TAMBAH IMPORT REACT
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Home = () => {
  const { t, i18n } = useTranslation(); // ← TAMBAH i18n di sini
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get('https://apps-8wf5.onrender.com/api/products')
      .then(res => setProduct(res.data[0]))
      .catch(err => console.error('Error loading product:', err));
  }, []);

  if (!product) return <div className="flex justify-center items-center h-screen text-xl">Loading produk...</div>;

  const langKey = i18n.language === 'en' ? 'en' : 'id'; // ← SEKARANG i18n ADA

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto p-4 max-w-md">
        <div className="text-center">
          <img src={product.image} alt={product.name[langKey]} className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h1 className="text-2xl font-bold mb-2">{product.name[langKey]}</h1>
          <p className="mb-4 text-gray-600">{product.description[langKey]}</p>
          <p className="text-xl font-semibold mb-4">{i18n.language === 'en' ? '$19.99' : 'Rp299.000'}</p>
          <a href="/checkout" className="block bg-blue-500 text-white px-6 py-3 rounded w-full text-center hover:bg-blue-600">
            {t('home.buy')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
