import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../../styles/Username.module.css';
import avatar from '../../assets/userplaceholder.png';
import { usernameValidate } from '../../utils/validate';
import { useAuthStore } from '../../store/store';

const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate('/password');
    },
  });

  return (
    <div className='container mx-auto bgbooking'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold text-white'>Welcome Back!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-200'>
              Organize your Life Better.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} alt='avatar' className={styles.profile_img} />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='text'
                placeholder='Username'
                {...formik.getFieldProps('username')}
                className={styles.textbox}
              />
              <button type='submit' className={styles.btn}>
                Let's Go!
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-200'>
                Haven't signed up yet?{' '}
                <Link to='/register' className='text-red-500'>
                  Register Now!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
