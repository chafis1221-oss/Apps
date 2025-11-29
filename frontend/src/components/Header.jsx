import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const switchLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">{t('header.title')}</Link>
      <div className="flex items-center space-x-4">
        <Link to="/admin" className="hover:underline">{t('header.admin')}</Link>
        <button onClick={switchLang} className="hover:underline">{t('header.switchLang')}</button>
      </div>
    </nav>
  );
};

export default Header;