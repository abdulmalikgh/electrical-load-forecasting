import React from "react";
import {Link} from "react-router-dom";
import Clock from "./loadComponent/Clock";

function Navigation(props) {
  const localDate = props.date;
  const date = localDate.toDateString();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">
          Electrical Load Forecasting
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
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Short Term
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/">
                  Real Time Forecasting
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/manual-hourly-forecast">
                  Manual Forecasting
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
                Long Term
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/realtime-dairly-forecast">
                  Real Time Forecasting
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/manual-dairly-forecast">
                  Manual Forecasting
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
