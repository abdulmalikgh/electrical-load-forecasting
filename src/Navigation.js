import React from "react";
import {Link} from "react-router-dom";
import Clock from "./loadComponent/Clock";

function Navigation(props) {
  const localDate = props.date;
  const date = localDate.toDateString();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href='/'>
          Electrical Load Demand Forecasting
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link mr-5">
                <Clock time={props.time} />{" "}
              </span>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Manual Forecast
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/manual-hourly-forecast">
                  Short Term 
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/manual-dairly-forecast">
                  Medium Term
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown active">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              Past Forecast
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/past_hourly_forecast">
                  Hourly Past Forecast
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/past_dairly_forecast">
                  Dairly Past Forecast
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
