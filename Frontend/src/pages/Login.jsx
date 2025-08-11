import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../config";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleToggle = () => {
    setLogin(!login);
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!username || !password || (!login && (!email || !firstName || !lastName))) {
        setError('Please fill in all required fields');
        return;
      }

      if (!login && password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (login) {
        const res = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
          username,
          password,
        });

        localStorage.setItem('token', res.data.token);

        if (res.data.user) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              first_name: res.data.user.first_name,
              last_name: res.data.user.last_name,
              email: res.data.user.email,
            })
          );
        }

        navigate('/home');
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/auth/register/`, {
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
          })
        );

        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <>
      <p className="bg-navy text-white font-extrabold text-5xl pt-8 px-11 tracking-widest uppercase" data-aos="fade-down">
        welcome to SpecCheck
      </p>

      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-navy px-6 sm:px-12">
        <div data-aos="fade-right" className="hidden md:block mr-8">
          <img src="/src/assets/images/icon12.png" alt="icon" className="w-[320px] h-auto" />
        </div>

        <div key={login ? 'login' : 'signup'} className="bg-royal bg-opacity-90 p-8 rounded-2xl shadow-lg w-96" data-aos="fade-left">
          <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-widest">
            {login ? 'Login' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {!login && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="mt-8">
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition tracking-widest">
                {login ? 'Login' : 'Sign Up'}
              </button>
            </div>
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
