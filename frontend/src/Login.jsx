import React, { useState } from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userDetails.username,
          password: userDetails.password
        }),
      });

      if (!res.ok) throw new Error('Invalid username or password');

      const data = await res.json();
      localStorage.setItem('jwt_token', data.jwt_token);
      navigate('/home');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await res.json();
      localStorage.setItem('jwt_token', data.jwt_token);
      setSuccessMsg('Account created successfully!');

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setErrorMsg('');
    setSuccessMsg('');
    setUserDetails({ username: '', password: '', email: '', fullName: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-[850px] justify-center items-center gap-8">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:block w-[380px]">
          <img
            src="https://launchtoast.com/wp-content/uploads/2021/01/how-to-grow-instagram-organically-1-1024x655.png"
            alt="Instagram Preview"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Forms */}
        <div className="flex flex-col gap-3 w-[350px]">
          {/* Main Box */}
          <div className="bg-white border border-gray-300 rounded-sm p-8 flex flex-col items-center">
            {/* Logo */}
            <h1 className="text-4xl font-semibold italic mb-8 mt-2 my-font-insta" style={{ fontFamily: 'cursive' }}>Insta Share</h1>

            {isRegisterMode && (
              <p className="text-gray-500 font-semibold text-center mb-4 leading-5">
                Sign up to see photos and videos from your friends.
              </p>
            )}

            {/* Form */}
            <form className="w-full flex flex-col gap-2" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 pt-2 pb-2 text-xs focus:outline-none focus:border-gray-400"
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                />
              </div>

              {isRegisterMode && (
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 pt-2 pb-2 text-xs focus:outline-none focus:border-gray-400"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                </div>
              )}

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 pt-2 pb-2 text-xs focus:outline-none focus:border-gray-400"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !userDetails.username || !userDetails.password}
                className={`w-full py-1.5 rounded text-white font-semibold text-sm mt-2 transition-opacity ${!userDetails.username || !userDetails.password ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
              >
                {loading ? '...' : (isRegisterMode ? 'Sign up' : 'Log in')}
              </button>
            </form>

            {errorMsg && <p className="text-red-500 text-xs mt-4 text-center">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-xs mt-4 text-center">{successMsg}</p>}

            {/* Divider */}
            <div className="w-full flex items-center gap-4 my-5">
              <div className="h-[1px] bg-gray-300 flex-1"></div>
              <span className="text-xs text-gray-500 font-semibold">OR</span>
              <div className="h-[1px] bg-gray-300 flex-1"></div>
            </div>

            {/* Forgot Password */}
            {!isRegisterMode && (
              <a href="#" className="text-xs text-blue-900 mt-2">Forgot password?</a>
            )}
          </div>

          {/* Switch Mode Box */}
          <div className="bg-white border border-gray-300 rounded-sm p-5 text-sm text-center">
            <p>
              {isRegisterMode ? "Have an account? " : "Don't have an account? "}
              <button onClick={toggleMode} className="text-blue-500 font-semibold">
                {isRegisterMode ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>

          {/* App Store (Mock) */}
          <div className="text-center mt-2">
            <p className="text-sm my-2">Get the app.</p>
            <div className="flex justify-center gap-2">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="App Store" className="h-10" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google Play" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
