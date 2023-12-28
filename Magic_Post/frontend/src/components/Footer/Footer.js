import React from 'react';
import './Footer.css';
import logo from '../../assets/icons/logo_removebg.png';
import { FaSquareFacebook, FaSquareTwitter, FaSquareInstagram } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";

function Footer() {
  return (
    <>
        <footer>
            <div className='container'>
                <div className='box logo'>
                    <img src={logo} alt="logo" className='logo-img'/>
                    <h2>CÔNG TY TNHH MỘT THÀNH VIÊN CHUYỂN PHÁT NHANH THẮNG LONG DƯƠNG</h2>
                    <span>TLD EXPRESS</span> <br />
                    <ul className="sci">
                        <li><a href="#123"><FaSquareFacebook className='icon'></FaSquareFacebook></a></li>
                        <li><a href="#456"><FaSquareTwitter className='icon'></FaSquareTwitter></a></li>
                        <li><a href="#789"><FaSquareInstagram className='icon'></FaSquareInstagram></a></li>
                    </ul>
                </div>
                <div className='box link'>
                    <h3>Về TLDExpress</h3>
                    <ul>
                        <li><a href="/about">Giới thiệu</a></li>
                        <li><a href="/services">Dịch vụ</a></li>
                        <li><a href="/hotro">Hỗ trợ</a></li>
                        <li><a href="/tuyendung">Tuyển dụng</a></li>
                        <li><a href="/">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>
                <div className='box link'>
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Chính sách vận chuyển</a></li>
                        <li><a href="#">Thời gian vận chuyển</a></li>
                        <li><a href="#">Vật phẩm cấm gửi</a></li>
                        <li><a href="#">Quy định và khiếu nại</a></li>
                    </ul>
                </div>
                <div className='box contact'>
                    <h3>Địa chỉ và Thông tin liên hệ</h3>
                    <ul className='info'>
                        <li>
                            <span><FaMapMarkerAlt className='icon icon-last'></FaMapMarkerAlt></span>
                            <span>1 Bùi Xương Trạch, P. Khương Đình, Quận Thanh Xuân,<br /> Thành Phố Hà Nội, Việt Nam</span>
                        </li>
                        <li>
                            <span><FaPhoneAlt className='icon icon-last'></FaPhoneAlt></span>
                            <p><a href="/0385257118">038-525-7118</a></p>
                        </li>
                        <li>
                            <span><AiFillMail className='icon icon-last icon-mail'></AiFillMail></span>
                            <p><a href="/mailto">cskh@tldexpress.vn</a></p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
        <div className='legal'>
                <p>
                Copyright ©2023 TLD Express | All rights reserved. <i className='fa fa-heart'></i> by Như Thắng
                </p>
            </div>
         
    </>
  )
}

export default Footer;