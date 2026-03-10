import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Posts from './Posts';
import Stories from './components/Stories';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className='flex flex-col items-center w-full'>
      <Stories />
      <Posts />
    </div>
  );
}

export default Home;
