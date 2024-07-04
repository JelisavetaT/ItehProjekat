import React from 'react';

import './Featured.css';
import useFetch from '../../hooks/useFetch';

const Featured = () => {
  const { data, loading, error } = useFetch(
    'http://localhost:8000/api/hotels/countByCity?cities=belgrade,barcelona,london'
  );

  return (
    <div className='featured'>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <div className='featuredItem'>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/637152.jpg?k=e0c8290998356aa03d1ab85530d425b75a4958f5b06aca8c1bc55a638a988d7f&o='
              alt='belgrade'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Belgrade</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className='featuredItem'>
            <img
              src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-1467072114-656f160a0a37b.jpg?crop=0.668xw:1.00xh;0.162xw,0&resize=640:*'
              alt='barcelona'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Barcelona</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className='featuredItem'>
            <img
              src='https://www.thesun.co.uk/wp-content/uploads/2023/01/houses-parliament-big-ben-double-780545902.jpg'
              alt='london'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
