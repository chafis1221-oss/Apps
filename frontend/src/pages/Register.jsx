import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://apps-8wf5.onrender.com/api/register', { email, password, role });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">{t('register.title')}</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded mb-4" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded mb-4" required />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded mb-4">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        <p className="mt-2 text-center">Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
