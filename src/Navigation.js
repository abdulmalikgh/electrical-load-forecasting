import React from 'react';
import { Link } from 'react-router-dom';

function Navigation( ) {
    return (
        <nav className='App-nav'>
            <ul>
                <li><Link to='/'>real-time</Link></li>
                <li><Link to='/short-term'>short term</Link></li>
                <li><Link to='/medium-term'>Medium term</Link></li>
                <li><Link to='/long-term'>Long term</Link></li>
            </ul>
        </nav>
    )
}
export default Navigation;