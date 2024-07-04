import React, { useContext, useEffect } from 'react';

import './Reservation.css';
import Header from '../../components/header/Header';
import useFetch from '../../hooks/useFetch';
import ReservationItem from '../../components/reservationItem/ReservationItem';
import GlobalContext from '../../context/GlobalContext';

const Reservation = () => {
  const { loggedInUserData } = useContext(GlobalContext);
  const user = loggedInUserData;
  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/reservations/${user._id}`
  );

  return (
    <div className='reservationsContainer'>
      <Header type='list' />
      <div className='reservationsList'>
        {loading
          ? 'Loading...'
          : data.map((item) => <ReservationItem item={item} />)}
      </div>
    </div>
  );
};

export default Reservation;
