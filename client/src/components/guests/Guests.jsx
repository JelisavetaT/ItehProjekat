import React, { useEffect, useState } from 'react';

import './Guests.css';

const Guests = ({ guests, guestsList, handleClick, coupon, setCoupon }) => {
  const [guest1, setGuest1] = useState('');
  const [guest2, setGuest2] = useState('');
  const [guest3, setGuest3] = useState('');
  const [guest4, setGuest4] = useState('');
  const [guest5, setGuest5] = useState('');
  const [guest6, setGuest6] = useState('');
  const [guest7, setGuest7] = useState('');
  const [guest8, setGuest8] = useState('');
  const [guest9, setGuest9] = useState('');

  useEffect(() => {
    guestsList[0] = guest1;
    guestsList[1] = guest2;
    guestsList[2] = guest3;
    guestsList[3] = guest4;
    guestsList[4] = guest5;
    guestsList[5] = guest6;
    guestsList[6] = guest7;
    guestsList[7] = guest8;
    guestsList[8] = guest9;
  }, [guest1, guest2, guest3, guest4, guest5, guest6, guest7, guest8, guest9]);

  return (
    <div className='guestsContainer'>
      <input
        type='text'
        placeholder='Guest 1'
        value={guest1}
        onChange={(e) => {
          setGuest1(e.target.value);
        }}
      />
      {guests > 1 && (
        <input
          type='text'
          placeholder='Guest 2'
          value={guest2}
          onChange={(e) => {
            setGuest2(e.target.value);
          }}
        />
      )}
      {guests > 2 && (
        <input
          type='text'
          placeholder='Guest 3'
          value={guest3}
          onChange={(e) => {
            setGuest3(e.target.value);
          }}
        />
      )}
      {guests > 3 && (
        <input
          type='text'
          placeholder='Guest 4'
          value={guest4}
          onChange={(e) => {
            setGuest4(e.target.value);
          }}
        />
      )}
      {guests > 4 && (
        <input
          type='text'
          placeholder='Guest 5'
          value={guest5}
          onChange={(e) => {
            setGuest5(e.target.value);
          }}
        />
      )}
      {guests > 5 && (
        <input
          type='text'
          placeholder='Guest 6'
          value={guest6}
          onChange={(e) => {
            setGuest6(e.target.value);
          }}
        />
      )}
      {guests > 6 && (
        <input
          type='text'
          placeholder='Guest 7'
          value={guest7}
          onChange={(e) => {
            setGuest7(e.target.value);
          }}
        />
      )}
      {guests > 7 && (
        <input
          type='text'
          placeholder='Guest 8'
          value={guest8}
          onChange={(e) => {
            setGuest8(e.target.value);
          }}
        />
      )}
      {guests > 8 && (
        <input
          type='text'
          placeholder='Guest 9'
          value={guest9}
          onChange={(e) => {
            setGuest9(e.target.value);
          }}
        />
      )}

      <input
        className='coupon'
        type='text'
        placeholder='Coupon?'
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
      />

      <button className='rButton' onClick={handleClick}>
        Reserve Now!
      </button>
    </div>
  );
};

export default Guests;
