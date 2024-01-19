import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate('/home'); // or the correct path to your dashboard
  };

  return (
    <div style={{ textAlign: 'center' }} className='mt-5'>
      <h2>PageNotFound</h2>
      <button onClick={redirectToDashboard} className='btn btn-primary'>
        Dashboard
      </button>
    </div>
  );
};

export default PageNotFound;
