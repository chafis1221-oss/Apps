import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://apps-8wf5.onrender.com/api/register', {
        name,
        email,
        password
      });
      alert('Register berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      alert('Register gagal: ' + (err.response?.data?.error || 'Coba lagi'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Daftar Akun Baru</h2>
        
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-3"
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-3"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
          Daftar
        </button>
        
        <p className="mt-3 text-center text-sm">
          Sudah punya akun? <a href="/login" className="text-blue-600">Login di sini</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
