import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

import './ReservationItem.css';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';

const ReservationItem = ({ item }) => {
  const [showGuestList, setShowGuestList] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const { data, loading } = useFetch(
    `http://localhost:8000/api/hotels/find/${item.hotel}`
  );

  const navigate = useNavigate();

  const completedRes = new Date() - new Date(item.endDate) > 0;
  const miliseconds = new Date(item.startDate) - new Date();
  const total_seconds = parseInt(Math.floor(miliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/api/reservations/${item._id}`);
    navigate('/');
  };

  useEffect(() => {
    const fetchCoupon = async () => {
      const couponRes = await axios.get(
        `http://localhost:8000/api/coupons/find/${item.genCoupon}`
      );
      setCoupon(couponRes.data);
    };

    fetchCoupon();
  }, [data]);

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div
          className={`${
            completedRes ? 'completedRes' : ''
          }  reservationItemList`}
        >
          <div className='reservationNumber'>
            <h3>Reservation #{item._id}</h3>
          </div>
          <div>
            <p>
              Staying at <b>{data.name}</b>
            </p>
            <p>
              {data.address},{' '}
              {data?.city?.charAt(0).toUpperCase() + data?.city?.slice(1)}
            </p>
          </div>
          <div>
            <p>Check in: {format(new Date(item.startDate), 'dd.MM.yy')}</p>
            <p>Check out: {format(new Date(item.endDate), 'dd.MM.yy')}</p>
          </div>
          <div>
            <p> Total guests: {item.guests.length}</p>
            <p className='guestsBtn' onClick={() => setShowGuestList(true)}>
              Show the guest list
            </p>
          </div>
          <div>
            <p>
              Coupon: <b>{coupon?.code}</b>
            </p>
            <p>
              Discount: <b>{coupon?.discount}%</b>
            </p>
          </div>
          {!completedRes && (
            <button className='deleteBtn' disabled={days < 5}>
              <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
            </button>
          )}
        </div>
      )}
      {showGuestList && (
        <div className='reserve'>
          <div className='rContainer'>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='rClose'
              onClick={() => setShowGuestList(false)}
            />
            <div className='guestsListContainer'>
              <h2>Guests:</h2>
              {item.guests.map((guest, i) => (
                <p key={i}>
                  {i + 1}. {guest}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
