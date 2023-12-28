import React, { useState } from 'react';
import './OrderDetail.css';
import moment from 'moment';

function OrderDetail({ship}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modal, setModal] = useState(false);
    const triggerModal = index => {
        setCurrentIndex(index);
        setModal(!modal);
    }
  return (
    <div>
        <div className="order-detail-container">
        <div className="form">
            <div className="form-header">
                <div className="text-header">
                    <h2 className="title">Thông tin vận chuyển của đơn hàng</h2>
                    <hr />
                    <p>
                        Nơi hiển thị thông tin quá trình vận chuyển của đơn hàng sau khi xác nhận thông tin mã đơn hàng trên
                    </p>
                </div>
            </div>
            </div>
            </div>
            <div className="form-content">
                <nav className="form-box">
                    <ul className="form-list">
                        {ship.map((info, index) => {
                            const time_order_date = moment(info.order_date).format('DD/MM/YYYY')
                            const time_expected_date = moment(info.expected_date).format('DD/MM/YYYY')
                            const depotName = info.depot.depot_name;
                            const depotAddress = info.depot.depot_address;
                            const order_status = info.Status;

                            return (
                                <li className='form-item' key={index}>
                                    <h3 className='form-item-headline'>{time_order_date}</h3>
                                    <div className='form-desc'>
                                        Thời gian: 21/12/2023
                                        <br />
                                        Tên kho: Thanh Xuân , Hà Noọi
                                        <br />
                                        Địa điểm: Hà Nội
                                        <br />
                                    </div>
                                    <a
                                        href='#'
                                        className='form-desc nav-link'
                                        onClick={() => triggerModal(index)}
                                    >
                                        <div>
                                        Xem thông tin <span className='nav-text'>&#8594;</span>
                                        </div>
                                        {modal && currentIndex === index && (
                                        <div>
                                            <div className='popup-history'>
                                            <div onClick={() => triggerModal(index)} className='overlay-history'></div>
                                            <div className='modal-content-history'>
                                                <form className='form-history'>
                                                <div className='card'>
                                                    <div className='left-column background1-left-column'>
                                                    <h6>Hệ thống đăng kiểm</h6>
                                                    <h2>Tra cứu</h2>
                                                    <i className='fa fa-github'></i>
                                                    </div>

                                                    <div className='right-column'>
                                                    <div>
                                                        <h4 className='title-history'>Thông tin cơ bản</h4>
                                                    </div>
                                                    <p>
                                                        1. Mã số đơn hàng:{' '}
                                                        <span className='bigger'>
                                                        {/* {ship[currentIndex].order.order_id} */}
                                                        1
                                                        </span>
                                                    </p>
                                                    <p>
                                                        2. Người gửi:{' '}
                                                        <span className='bigger'>Đỗ Như Thắng</span>
                                                    </p>
                                                    <p>
                                                        3. Ngày gửi:{' '}
                                                        {/* <span className='bigger'>{time_order_date}</span> */}
                                                        22/12/2023
                                                    </p>
                                                    
                                                    <p>
                                                        4. Loại: <span className='bigger'>Hàng nhỏ gọn</span>
                                                    </p>
                                                    <p>
                                                        5. Trung tâm:{' '}
                                                        <span className='bigger'>
                                                        {/* {ship[currentIndex].depot.depot_name} */} Thanh Xuân, Hà Nội
                                                        </span>
                                                    </p>
                                                    <p>
                                                        6. Quản lý:{' '}
                                                        <span className='bigger'>
                                                        {/* {ship[currentIndex].depot.depot_manager} */} Hoàng Chí Công
                                                        </span>
                                                    </p>
                                                    <p>
                                                        7. Tỉnh:{' '}
                                                        <span className='bigger'>
                                                        {/* {ship[currentIndex].depot.province} */} Hà Nội
                                                        </span>
                                                    </p>
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                            </div>
                                        </div>
                                        )}
                                    </a>
                                    </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
    </div>
  )
}

export default OrderDetail