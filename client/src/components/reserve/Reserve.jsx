import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './Reserve.css';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import Guests from '../guests/Guests';
import toast, { Toaster } from 'react-hot-toast';

const Reserve = ({ setOpen, hotelId, price }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [guestsList, setGuestsList] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [formError, setFormError] = useState(null);
  const [coupon, setCoupon] = useState('');

  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/room/${hotelId}`
  );
  const { options, dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  const { loggedInUserData } = useContext(GlobalContext);
  const user = loggedInUserData;

  const handleClick = async () => {
    for (let i = 0; i < options.adult + options.children; i++) {
      if (guestsList[i] === '') {
        setFormError('You must insert all guests names!');
        return;
      }
    }
    if (selectedRooms.length === 0) {
      setFormError('You must select your room!');
      return;
    }

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );

      // creating reservation
      const cleanGuestList = guestsList.filter((guest) => guest.length > 0);

      let newPrice = price;
      if (coupon.length !== 0) {
        const resCoupon = await axios.get(
          `http://localhost:8000/api/coupons/${coupon}`
        );

        if (!resCoupon.data.used) {
          newPrice = (price * (100 - resCoupon.data.discount)) / 100;
          await axios.put(`http://localhost:8000/api/coupons/${coupon}`);
        }
      }

      const newCoupon = makeCoupon();
      const discounts = [5, 10, 15, 20];
      const randomDiscount =
        discounts[Math.floor(Math.random() * discounts.length)];
      const newCouponRes = await axios.post(
        `http://localhost:8000/api/coupons`,
        {
          code: newCoupon,
          discount: randomDiscount,
        }
      );

      await axios.post('http://localhost:8000/api/reservations', {
        user: user._id,
        hotel: hotelId,
        rooms: selectedRooms,
        guests: cleanGuestList,
        price: newPrice,
        genCoupon: newCouponRes.data._id,
        startDate: dates[0].startDate,
        endDate: dates[0].endDate,
      });

      setOpen(false);
      toast.success(
        'Reserved successfully! You should receive an email with your information.'
      );

      const hotelRes = await axios.get(
        `http://localhost:8000/api/hotels/find/${hotelId}`
      );
      console.log(hotelRes.data);

      await axios.post('http://localhost:8000/api/auth/reservationMail', {
        username: user.username,
        userEmail: user.email,
        text: `You reserved your stay via the Booking.com! You will be staying at the hotel ${
          hotelRes.data.name
        } in ${
          hotelRes.data.city.charAt(0).toUpperCase() +
          hotelRes.data.city.slice(1)
        } from ${dates[0]?.startDate} to ${
          dates[0]?.endDate
        }.  Enjoy your stay!`,
        subject: 'Booking ORDER',
      });

      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  function makeCoupon() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className='reserve'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {loading ? (
        'Loading...'
      ) : (
        <div className='rContainer'>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className='rClose'
            onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {data
            ?.filter(
              (item) => item?.maxPeople >= options.adult + options.children
            )
            .map((item) => (
              <div className='rItem' key={item._id}>
                <div className='rItemInfo'>
                  <div className='rTitle'>{item.title}</div>
                  <div className='rDesc'>{item.desc}</div>
                  <div className='rMax'>
                    {item?.maxPeople && (
                      <span>
                        Max people: <b>{item?.maxPeople}</b>
                      </span>
                    )}
                  </div>
                  <div className='rPrice'>${item.price}</div>
                </div>
                <div className='rSelectRooms'>
                  {item.roomNumbers.map((roomNumber) => (
                    <div className='room'>
                      <label>{roomNumber.number}</label>
                      <input
                        type='checkbox'
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {formError && <span className='rFormError'>{formError}</span>}
          {data.filter(
            (item) => item?.maxPeople >= options.adult + options.children
          ).length === 0 ? (
            <b> No rooms available!</b>
          ) : (
            <Guests
              guests={options.adult + options.children}
              guestsList={guestsList}
              handleClick={handleClick}
              coupon={coupon}
              setCoupon={setCoupon}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Reserve;
