import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Navbar.css';
import GlobalContext from '../../context/GlobalContext';

const Navbar = () => {
  const [temp, setTemp] = useState(null);
  const navigate = useNavigate();
  const { loggedInUserData } = useContext(GlobalContext);
  const user = loggedInUserData;

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${user?.city}&units=metric&appid=6c7c6a462f348f58f0cd8bc3b458ce53`
        );
        setTemp(res.data.main.temp);
      } catch (error) {
        console.log(error);
      }
    };

    getWeather();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo' onClick={() => navigate('/home')}>
          Booking.com
        </span>
        <div className='navItems'>
          {user ? (
            <div className='navButtonContainer'>
              {temp && (
                <span>
                  {user.city +
                    ', ' +
                    user.country +
                    ' ' +
                    temp.toFixed(0) +
                    '°C'}
                </span>
              )}
              {!user.isAdmin && (
                <button
                  className='navButton'
                  onClick={() => navigate('/reservations')}
                >
                  My bookings
                </button>
              )}

              <button className='logout' onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className='navButton' onClick={() => navigate('/login')}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
