
import React from 'react';

import { Link } from 'react-router-dom';    

import './Login.css';
import './Responsive.css';
import Shop from './Shop'; // Assuming you have a Shop component
function Login() {

  return (
    <div className="Login d-lg-flex align-items-center justify-content-center">
        <div className="login-left w-xs-100vw h-xs-50vh w-lg-50vw h-lg-100vh align-items-center justify-content-center text-center d-flex flex-column">
            <h2>UP TO 70% OFF</h2>
            <div><button className="btn btn-danger">
                <Link to="/Shop" className="text-white text-decoration-none">Shop Now</Link>
                </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="fs-5">Follow us on Social Media</div>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-2 fs-3">
                <i className="text-primary bi bi-facebook"></i>
                <i className="bi bi-instagram" style={{background: "linear-gradient(to right,rgb(228, 178, 131),rgb(223, 38, 69))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",display: "inline-block"}}></i>
                <i className="text-primary bi bi-twitter"></i>
                <i className="text-danger bi bi-pinterest"></i>
                <i className="text-danger bi bi-youtube"></i>
                <i className="text-success bi bi-whatsapp"></i>
            </div>
        </div>
        <div className="login-right w-xs-100vw h-xs-50vh w-lg-50vw h-lg-100vh"></div>
    </div>
  );
}

export default Login;