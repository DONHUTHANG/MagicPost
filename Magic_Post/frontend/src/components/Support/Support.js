import React, {useState} from 'react';
import './Support.css';
import { FaMapMarkerAlt,  FaPhoneAlt } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import mapInfo from '../../assets/images/infomap.png';
import logo from "../../assets/icons/logo.png";
import { FaSquareFacebook, FaSquareTwitter, FaSquareInstagram } from "react-icons/fa6";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Support() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSendForm = (e) => {
        e.preventDefault();
        axios
      .post(
        "http://localhost:5000/customerinfo/support",
        { fullname, email, phonenumber, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(result => {
        const {data} = result;
        if (data.message.includes('Empty')) {
            toast.error('Vui lòng nhập thông tin cần hỗ trợ!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else if (data.message.includes('Invalid')) {
            toast.error('Thông tin email không hợp lệ!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else if (data.message.includes('already exits')) {
            toast.error('Thông tin khách hàng đã tồn tại!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else if (data.message.includes('Send Successful')) {
            toast.success('Thông tin bạn cần hỗ trợ đã gửi thành công!', {
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
      })
      .catch(err => console.log(err))
    }
  return (
    <>
        <div className="support-container" id='support'>
            <div className="support-box support-box-1">
                <h1 className='support-title'>Liên hệ</h1>
                <p className="support-desc">
                TLD Express rất vui vì được tiếp nhận liên hệ của bạn. Có bất cứ điều gì cần phản hồi/giải đáp, gửi ngay cho chúng mình bên dưới nhé!
                </p>
                <div className="support-box-input">
                    <span>Họ và tên<span className='text-red'>*</span></span>
                    <input type="text" id='name' name='name' placeholder='Họ và tên' className='support-input' onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div className="support-box-input">
                    <span>Email<span className='text-red'>*</span></span>
                    <input type="text" id='email' name='email' placeholder='Email' className='support-input' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="support-box-input">
                    <span>Số điện thoại<span className='text-red'>*</span></span>
                    <input type="text" id='phone' name='phone' placeholder='Số điện thoại' className='support-input' onChange={(e) => setPhonenumber(e.target.value)}/>
                </div>
                <div className="support-box-input">
                    <span>Message<span className='text-red'>*</span></span>
                    <textarea type="text" id='message' name='message' placeholder='Message' className='support-input' onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="support-box-btn">
                    <button className='support-button' onClick={handleSendForm}>Gửi</button>
                </div>
            </div>
            <div className="support-box support-box-2">
                    <h1 className='connect-support-title'>Kết nối với TLD Express</h1>
                    <div className="support-sec">
                        <span><FaPhoneAlt className='icon icon-last'></FaPhoneAlt> <span className='support-sec-name'>Hotline</span></span>
                        <p><a href="/0385257118">038-525-7118</a></p>
                        <hr />
                    </div>
                    <div className="support-sec">
                        <span><AiFillMail className='icon icon-last icon-mail'></AiFillMail><span className='support-sec-name'>Email</span></span>
                        <p><a href="/mailto">cskh@tldexpress.vn</a></p>
                        <hr />
                    </div>
                    <div className="support-sec">
                            <span><FaMapMarkerAlt className='icon icon-last'></FaMapMarkerAlt><span className='support-sec-name'>Địa chỉ liên hệ</span></span>
                            <p className='support-sec-desc'>1 Bùi Xương Trạch, P. Khương Đình, Quận Thanh Xuân,<br /> Thành Phố Hà Nội, Việt Nam</p>
                            <hr />
                    </div>
                    <div className='support-img'>
                        <h1>Mạng Xã Hội</h1>
                        <ul className="support-sci">
                            <li><a href="#123"><FaSquareFacebook className='icon'></FaSquareFacebook></a></li>
                            <li><a href="#456"><FaSquareTwitter className='icon'></FaSquareTwitter></a></li>
                            <li><a href="#789"><FaSquareInstagram className='icon'></FaSquareInstagram></a></li>
                        </ul>
                        <img src={mapInfo} alt="mapinfo" />
                    </div>
                    <div className='support-logo'>
                        {/* <img src={logo} alt="logo" /> */}
                        <h3 className="logo-name">TLDExpress</h3>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Support