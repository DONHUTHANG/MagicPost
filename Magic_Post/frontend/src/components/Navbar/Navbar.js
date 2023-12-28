import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {HashLink as Link} from 'react-router-hash-link';
import "./Navbar.css";
import LoginForm from '../LoginForm/LoginForm'
import logo from "../../assets/icons/logo.png";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
function Navbar() {
  const [Mobile, setMobile] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  }

  const handleForm = () => {
    setIsLoginOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="nav_container">
        <Link to="/" className="nav_logo" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="logo" className="nav_logo-img" />
          <h3 className="nav_logo-name">TLDExpress</h3>
        </Link>
        <ul className={Mobile ? "nav-menu-mobile" : "nav-menu"} onClick={() => setMobile(false)}>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-links"
            >
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-links"
            >
              Giới thiệu
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/search"
              className="nav-links"
            >
              Tra cứu
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/services"
              className="nav-links"
            >
              Dịch vụ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/support"
              className="nav-links"
            >
              Hỗ trợ
            </Link>
          </li>
        </ul>
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <RxCross2 /> : <FiMenu />}
        </button>
        <div className={Mobile ? "nav-button-mobile" : "nav-button"} onClick={() => setMobile(false)}>
          <button className="btn" onClick={handleLoginClick}>Đăng nhập</button>
          {isLoginOpen && <LoginForm closeForm={handleForm}/>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
