import React, { useContext } from 'react';

import './Home.css';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import GlobalContext from '../../context/GlobalContext';
import AdminDashboard from '../../components/admin/AdminDashboard';

const Home = () => {
  const { loggedInUserData } = useContext(GlobalContext);

  return (
    <>
      {loggedInUserData?.isAdmin ? (
        <AdminDashboard />
      ) : (
        <div>
          <Header />:
          <div className='homeContainer'>
            <Featured />
            <h1 className='homeTitle'>Browse by property type</h1>
            <PropertyList />
            <h1 className='homeTitle'>Homes guests love</h1>
            <FeaturedProperties />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
