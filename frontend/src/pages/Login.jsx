import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://apps-8wf5.onrender.com/api/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        alert('Login sukses!');
        window.location.href = '/admin';
      })
      .catch(err => alert('Login gagal'));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Login Admin</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border mb-4 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border mb-6 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold">Login</button>
        <p className="mt-4 text-sm">Default: admin@admin.com / password123</p>
      </form>
    </div>
  );
};

export default Login;
