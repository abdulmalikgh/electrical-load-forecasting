import React from 'react';
import Navigation from './Navigation';

function Header(props) {
    return (
        <div className='header-inner'>
          <h1>load demand forecasting</h1>
          <Navigation />
        </div>
    )
}
export default Header;