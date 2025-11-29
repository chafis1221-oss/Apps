import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'header.title': 'Tech Prompt Store',
      'header.switchLang': 'ID',
      'header.admin': 'Admin',
      'home.buy': 'Buy Now',
      'home.price': '$19.99',
      'home.desc': '50+ prompts for AI tools.',
      'checkout.address': 'Shipping Address',
      'checkout.submit': 'Pay Now',
      'admin.orders': 'Orders List',
      'admin.status.pending': 'Pending',
      'admin.status.approved': 'Approved',
      'admin.status.rejected': 'Rejected',
      'login.title': 'Login',
      'register.title': 'Register'
    }
  },
  id: {
    translation: {
      'header.title': 'Toko Prompt Teknologi',
      'header.switchLang': 'EN',
      'header.admin': 'Admin',
      'home.buy': 'Beli Sekarang',
      'home.price': 'Rp299.000',
      'home.desc': '50+ prompt untuk tools AI.',
      'checkout.address': 'Alamat Pengiriman',
      'checkout.submit': 'Bayar Sekarang',
      'admin.orders': 'Daftar Pesanan',
      'admin.status.pending': 'Menunggu',
      'admin.status.approved': 'Disetujui',
      'admin.status.rejected': 'Ditolak',
      'login.title': 'Masuk',
      'register.title': 'Daftar'
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;