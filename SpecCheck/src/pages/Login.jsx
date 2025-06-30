import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState(true);
  const [role, setRole] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleToggle = () => {
    setLogin(!login);
    setTimeout(() => {
      AOS.refresh(); // Refresh animation on toggle
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Email or Password are required');
      return;
    }

    if (!login && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
  };

  return (
    <>
      <p
        className="bg-navy text-white font-extrabold text-5xl pt-8 px-11 tracking-widest uppercase"
        data-aos="fade-down"
      >
        welcome to SpecCheck
      </p>

      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-navy px-6 sm:px-12">
        {/* Logo */}
        <div data-aos="fade-right" className="hidden md:block mr-8">
          <img
            src="/src/assets/images/icon12.png"
            alt="icon"
            className="w-[320px] h-auto"
          />
        </div>

        {/* Form Card */}
        <div
          key={login ? 'login' : 'signup'} // Force re-animation
          className="bg-royal bg-opacity-90 p-8 rounded-2xl shadow-lg w-96"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-widest">
            {login ? 'Login' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!login && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">I am a:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!login && (
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Link to="/Home">
            <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition tracking-widest"
            >
              {login ? 'Login' : 'Sign Up'}
            </button>
            </div>
            </Link>
          </form>

          <p className="mt-4 text-center text-sm text-gray-300">
            {login ? (
              <>
                Don’t have an account?{' '}
                <button onClick={handleToggle} className="text-blue-300 hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={handleToggle} className="text-blue-300 hover:underline">
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
