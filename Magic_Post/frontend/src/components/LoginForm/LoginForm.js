import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import expressDelivery from "../../assets/images/express-delivery.png";
import map from "../../assets/images/infomap.png";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

function LoginForm({ closeForm }) {
  const refForm = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginUser = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/user/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        const {data} = result;
        if (data.status === "FAILED") {
          const {message} = data;
          if (message.includes('credentials')) {
            console.log(message);
            toast.error('Vui lòng nhập tên đăng nhập và mật khẩu', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
          } else if (message.includes("password")) {
            console.log(message);
            toast.error('Mật khẩu không đúng! Vui lòng nhập lại mật khẩu', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
          }
        } else if (data.status === "SUCCESS"){
          toast.success('Đăng Nhập Thành Công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
          const userData = data.data[0];

          const token = userData._id;

          const currentUser = userData.username;

          localStorage.setItem('token', token);

          localStorage.setItem('currentUser', JSON.stringify(currentUser));

          navigate('/dashboard');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    const handleClickOutForm = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        closeForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutForm);

    return () => {
      document.removeEventListener("mousedown", handleClickOutForm);
    };
  }, [closeForm]);

  const handleClickInForm = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-container" ref={refForm} onClick={closeForm}>
      <div className="login-section" onClick={handleClickInForm}>
        <div className="login-left">
          <div className="login-img">
            <img src={expressDelivery} alt="logo-express" />
          </div>
          <div className="login-infomap">
            <img src={map} alt="map" />
            <div className="login-logo">
              <h2 className="logo-name">TLDExpress</h2>
              <span>We find the way</span>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-heading">
            <h1 className="title-login">ĐĂNG NHẬP HỆ THỐNG</h1>
            <span>Vui lòng nhập thông tin</span>
          </div>
          <div className="login-form">
            <div className="input-box">
              <span>
                Username<span className="text-red">*</span>
              </span>
              <input
                type="text"
                id="username"
                name="username"
                className="input-field"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-box input-flex-box">
              <span>
                Password<span className="text-red">*</span>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="input-field"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="input-box-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="login-options">
              <div className="input-remmember">
                <input type="checkbox" name="" id="" />
                <span>Remember me</span>
              </div>
              <span>Forgot password?</span>
            </div>
            <button className="btn-login" onClick={handleLoginUser} onKeyDown={(e) => handleKeyDown(e)}>
              Đăng Nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
