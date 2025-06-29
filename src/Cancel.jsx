import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './App.css';
import conf from './conf'

const Cancel = () => {
  const navigate = useNavigate();
  const locacion = useLocation();

  const handleClick = async (e) => {
    e.preventDefault();

    // await fetch('api/cancel-subscription', {
    await fetch(`${conf}/subscriptions/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: locacion.state.subscription
      }),
    })

    navigate('/account', { replace: true });
  };

  return (
    <div>
      <h1>Cancel</h1>
      <button onClick={handleClick}>Cancel</button>
    </div>
  )
}


export default Cancel;
