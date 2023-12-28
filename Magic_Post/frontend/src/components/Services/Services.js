import React from 'react';
import './Services.css';
import servicesMoney from '../../assets/images/services-money.png';
import servicesTime from '../../assets/images/services-time.png';
import servicesDelivery from '../../assets/images/services-delivery.png'
import servicesFlash from '../../assets/images/services-flash.png';
import expressDelivery from '../../assets/images/express-delivery.png';


function Services() {
  return (
    <>
        <div className="services-container" id='services'>
            <h1 className="services-heading">Lợi ích khi sử dụng dịch vụ giao hàng </h1>
            <div className="services-options">
                <div className="option">
                    <img src={servicesMoney} alt="sercives-money" />
                    <h2>
                        Tiết kiệm hơn
                    </h2>
                    <p className="options-desc">Giá thành của TLD Express được điều chỉnh hợp lý và tiết kiệm nhất cho khách hàng. Các chủ shop, cá nhân buôn bán, mua sắm online có cơ hội tối đa hóa lợi nhuận trong hoạt động kinh doanh của mình.</p>
                    <span className="see-more">Chi tiết</span>
                </div>
                <div className="option">
                    <img src={servicesTime} alt="sercives-time" />
                    <h2>
                        Tiện lợi hơn
                    </h2>
                    <p className="options-desc">TLD Express có thể vận chuyển được đa dạng, hầu hết các loại hàng hóa khác nhau và hàng dễ vỡ. Đặc biệt, có thể vận chuyển hàng với kích thước lớn, trọng lượng có thể lên đến 70kg, giảm nhẹ gánh nặng hàng to.</p>
                    <span className="see-more">Chi tiết</span>
                </div>
                <div className="option">
                    <img src={servicesDelivery} alt="sercives-delivery" />
                    <h2>
                        Vượt trội hơn
                    </h2>
                    <p className="options-desc">Khi sử dụng dịch vụ chuyển phát của TLD Express, hàng hóa được nhân viên đến tận nơi lấy đi. Quá trình tiếp nhận và vận chuyển sử dụng nhiều loại hình vận tải, đáp ứng tối đa nhu cầu của khách hàng.</p>
                    <span className="see-more">Chi tiết</span>
                </div>
                <div className="option">
                    <img src={servicesFlash} alt="sercives-delivery" />
                    <h2>
                        Nhanh siêu tốc
                    </h2>
                    <p className="options-desc">Khi sử dụng dịch vụ Nhanh Siêu tốc, hàng hóa được thực hiện vận chuyển với dịch vụ Nhanh - TLD Express được xử lý nhanh chóng. Do đó, tốc độ giao hàng cũng tối ưu hơn, rút ngắn thời gian nhận hàng.</p>
                    <span className="see-more">Chi tiết</span>
                </div>
            </div>
            <div className="service-express">
                <img src={expressDelivery} alt="express-delivery" />
            </div>
        </div>
    </>
  )
}

export default Services