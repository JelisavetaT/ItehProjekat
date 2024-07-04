import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/Homepage.module.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='container mx-auto' style={{ background: '#003580' }}>
      <div className='flex justify-center items-center h-screen flex-col bgbooking'>
        <h1 className='text-3xl font-bold text-white'>
          Welcome to Booking.com
        </h1>
        <button
          className={`${styles.btn} bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-5`}
          onClick={() => navigate('/username')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
