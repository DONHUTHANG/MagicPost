import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './Dashboard.css';
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import logoVietNam from '../../assets/images/logo-vietnam.jpg';
import logo from "../../assets/icons/logo.png";
import { FaBell } from "react-icons/fa";
import userImg from '../../assets/images/user-img.png';
import DashboardComponent from '../../components/Dashboard/DashboardComponent';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import SearchContent from '../../components/SearchContent/SearchContent';
import Profile from '../../components/Profile/Profile';
import CustomerInfo from '../../components/CustomerInfo/CustomerInfo';
import { TiHome } from "react-icons/ti";


function Dashboard() {
    const [isClose, setIsClose] = useState(false);

    const handleToggle = () => {
        setIsClose(!isClose);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [isLoggedIn, setIsLoggedIn] = useState(
        currentUser !== null
    )

    const [tabs, setTabs] = useState([
        {
            id: Date.now(),
            title: 'Dashboard',
            content: <DashboardComponent />
        }
    ])

    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const [contentTab, setContentTab] = useState(
        [
            {
                id: tabs[0].id,
                content: <DashboardComponent />,
            }
        ]
    )


    const ChangeTab = (title, content) => {
        const newTab = {
            id: Date.now(),
            title: title,
            content: content,
        };

        setTabs([tabs, newTab]);
        setActiveTab(newTab.id);

        const newContentTab = {
            id: newTab.id,
            content: content,
        };
        setContentTab([contentTab, newContentTab]);

    };

    const navigate = useNavigate();

    const handleLogOut = async () => {
        await localStorage.removeItem('token');
        navigate('/');

    }
    
  return (
    <div className="dashboard-container">
        <div className={`sidebar ${isClose ? 'close' : ''}`}>
            <div className="logo-name">
                <img src={logo} alt="logo" />
                <h1>Hệ thống chuyển phát nhanh <span>TLDExpress</span></h1>
            </div>
            <ul className="sidebar-list">
                <li><a href="#" onClick={() => ChangeTab('Dashboard', <DashboardComponent />)}>
                    <MdSpaceDashboard className='icon'/>
                    <span className="sidebar-list-link">Dashboard</span>
                </a>
                <span className="tooltip">Dashboard</span>
                </li>
                <li><a href="#" onClick={() => ChangeTab('Thông tin đơn hàng', <OrderInfo />)}>
                    <BsFillBoxSeamFill className='icon'/>
                    <span className="sidebar-list-link">Thông tin đơn hàng</span>
                </a>
                <span className="tooltip">Thông tin đơn hàng</span>
                </li>
                <li><a href="#" onClick={() => ChangeTab('Tra Cứu', <SearchContent />)}>
                    <PiMagnifyingGlassBold className='icon'/>
                    <span className="sidebar-list-link">Tra cứu</span>
                </a>
                <span className="tooltip">Tra cứu</span>
                </li>
                <li><a href="#" onClick={() => ChangeTab('Thông tin khách hàng cần hỗ trợ', <CustomerInfo />)}>
                <MdOutlineSupportAgent className='icon'/>
                    <span className="sidebar-list-link">Thông tin khách hàng cần hỗ trợ</span>
                </a>
                <span className="tooltip">Thông tin khách hàng cần hỗ trợ</span>
                </li>
                <li><a href="#" onClick={() => ChangeTab('Thông tin cá nhân', <Profile />)}>
                    <FaRegUserCircle className='icon'/>
                    <span className="sidebar-list-link">Thông tin cá nhân</span>
                </a>
                <span className="tooltip">Thông tin cá nhân</span>
                </li>
                <li className='logout'>
                        <a href="" onClick={handleLogOut}>
                            <TbLogout2 className='icon'/>
                            <span className="sidebar-links">Đăng xuất</span>
                        </a>
                        <span className="tooltip">Đăng xuất</span>
                    </li>
            </ul>
        </div>
        <section className="main-container">
            <div className="main-container-header">
                <div className="header-left">
                    <IoMdMenu className='icon-menu'onClick={handleToggle}/>
                    <div className="search-box">
                        <PiMagnifyingGlassBold className='icon-glass'/>
                        <input type="text" 
                        placeholder='Search'
                        />
                    </div>
                </div>
                <div className="header-right">
                    <div className="logo-country">
                        <img src={logoVietNam} alt="VietNam" />
                    </div>
                    <div className="notification">
                        <a href="#"><FaBell className='icon-notify'/></a>
                    </div>
                    <div className="user-info">
                        <h2 className='user-name-title'>Hi, Như Thắng {isLoggedIn ? (currentUser.name) : ''}</h2>
                        <img src={userImg} alt="userimage" />
                    </div>
                </div>
            </div>
            <div className="tab-container">
                <div className="tab-header">
                <h1 className='tab-header-title'><TiHome className='icon-home'/> Home <MdOutlineDoubleArrow /></h1>
                {tabs.map((tab) => (
                            <div
                                className={`tab-item ${tab.id === activeTab ? 'active' : ''}`}
                                key={tab.id}>
                                <p className='tab-title' onClick={() => setActiveTab(tab.id)}>{tab.title}</p>
                            </div>
                        ))}
                </div>
                <div className="tab-content">
                    {contentTab.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Dashboard