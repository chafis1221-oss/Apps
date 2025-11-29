import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Header from './components/Header';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<div><h1>Test Home</h1></div>} />
          <Route path="/checkout" element={<div><h1>Test Checkout</h1></div>} />
          <Route path="/admin" element={<div><h1>Test Admin</h1></div>} />
          <Route path="/login" element={<div><h1>Test Login</h1></div>} />
          <Route path="/register" element={<div><h1>Test Register</h1></div>} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
