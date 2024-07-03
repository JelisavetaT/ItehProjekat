import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';

import './Header.css';
import { SearchContext } from '../../context/SearchContext';
import GlobalContext from '../../context/GlobalContext';

const Header = ({ type }) => {
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { loggedInUserData } = useContext(GlobalContext);
  const user = loggedInUserData;

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (destination === '') {
      toast.error('You must provide the destination!');
      return;
    }
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    navigate('/hotels', { state: { destination, dates, options } });
  };

  return (
    <div className='header'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div
        className={
          type === 'list' ? 'headerContainer listMode' : 'headerContainer'
        }
      >
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className='headerTitle'>
              A lifetime of discounts? It's Genius.
            </h1>
            <p className='headerDesc'>
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Fonsion account
            </p>
            {!user && <button className='headerBtn'>Sign in / Register</button>}
            <div className='headerSearch'>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input
                  type='text'
                  placeholder='Where are you going?'
                  className='headerSearchInput'
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className='headerSearchText'
                >{`${format(dates[0].startDate, 'dd/MM/yy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yy'
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className='date'
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className='headerSearchText'
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className='options'>
                    <div className='optionItem'>
                      <div className='optionName'>
                        <span className='optionText'>Adults</span>
                      </div>
                      <div className='optionNumbers'>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('adult', 'd')}
                          disabled={options.adult === 1}
                        >
                          -
                        </button>
                        <span className='optionCounter'>{options.adult}</span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('adult', 'i')}
                          disabled={options.adult === 9}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className='optionItem'>
                      <div className='optionName'>
                        <span className='optionText'>Children</span>
                      </div>
                      <div className='optionNumbers'>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('children', 'd')}
                          disabled={options.children === 0}
                        >
                          -
                        </button>
                        <span className='optionCounter'>
                          {options.children}
                        </span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('children', 'i')}
                          disabled={options.children === 9}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className='optionItem'>
                      <div className='optionName'>
                        <span className='optionText'>Rooms</span>
                      </div>
                      <div className='optionNumbers'>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('room', 'd')}
                          disabled={options.room === 1}
                        >
                          -
                        </button>
                        <span className='optionCounter'>{options.room}</span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('room', 'i')}
                          disabled={options.room === 9}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='headerSearchItem'>
                <button className='headerBtn' onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
