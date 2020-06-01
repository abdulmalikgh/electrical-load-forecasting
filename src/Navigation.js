import React from "react";
import {Link} from "react-router-dom";
import Clock from "./loadComponent/Clock";

function Navigation(props) {
  const localDate = props.date;
  const date = localDate.toDateString();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Electrical Load Forecasting
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <span class="nav-link mr-5">
                <Clock time={props.time} />{" "}
              </span>
            </li>
            <li class="nav-item dropdown active">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Short Term
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" href="#">
                  Real Time Forecasting
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item" href="#">
                  Manual Forecasting
                </Link>
              </div>
            </li>

            <li class="nav-item dropdown active">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Long Term
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" href="#">
                  Real Time Forecasting
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item" href="#">
                  Manual Forecasting
                </Link>
              </div>
            </li>
            <li class="nav-item">
              <Link class="nav-link">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
