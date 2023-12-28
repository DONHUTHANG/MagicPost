import React from 'react';
import './About.css';
// import AboutImage from '../../assets/images/TLDExpress.png';
import image1 from '../../assets/images/63tinh-thanh.png';
import image2 from '../../assets/images/1000xe.png';
import image3 from '../../assets/images/buu-cuc.png';
import delivery from '../../assets/images/delivery.png';
import about from '../../assets/images/about-us.png';

function About(){
  return (
        <div className="container-about" id='about'>
                <div className='header-about'>
                    <h1 className='title'>Về chúng tôi</h1>
                </div>
                <div className="box-about">
                    <div className="content-1">
                        <p>
                            <span>TLD Express</span> là thương hiệu chuyển phát nhanh dựa trên sự
                                phát triển của công nghệ và Internet. Chúng tôi sở hữu
                                một mạng lưới rộng khắp nhằm hỗ trợ các hoạt động giao
                                nhận hàng hóa nhanh chóng không chỉ ở nội thành mà còn ở
                                ngoại thành và các vùng xa của các tỉnh thành trong cả
                                nước Việt Nam. <br />Đồng thời, hiện tại, TLD Express định hướng mở rộng phạm vi cung cấp các dịch vụ chuyển phát nhanh ra quốc tế.</p>
                    </div>
                    <div className="content-2">
                        <div className="sec">
                            <img src={image1} alt="image1" />
                            <h2>PHƯƠNG TIỆN</h2>
                            <p>ĐA DẠNG</p>
                        </div>
                        <div className="sec">
                            <img src={image2} alt="image2" />
                            <h2>NHÂN SỰ</h2>
                            <p>CHUYÊN NGHIỆP</p>
                        </div>
                        <div className="sec">
                            <img src={image3} alt="image3" />
                            <h2>MẠNG LƯỚI</h2>
                            <p>TOÀN QUỐC</p>
                        </div>
                    </div>
                </div>
                <div className="box-about">
                    <div className="image-delivery">
                        <img src={delivery} alt="delivery" />
                    </div>
                    <div className='info-about'>
                            <div className='img-about'>
                                <img src={about} alt="imageabout" />
                            </div>
                           <div className="info-about-item"> 
                           <h2>TẦM NHÌN</h2>
                            <p><span>TLD Express</span> là thương hiệu chuyển phát nhanh uy tín và bền vững tại Việt Nam.</p>
                            </div>
                            <div className="info-about-item"> <h2>GIÁ TRỊ CỐT LÕI</h2>
                            <p><span>Bổn phận, Chia sẻ, Trách nhiệm</span> là ba giá trị cơ bản của TLD Express nhằm mang đến chất lượng dịch vụ giao hàng tốt nhất cho khách hàng. <br />
                            Chúng tôi cam kết phục vụ một cách trung thực và có trách nhiệm đối với từng đơn hàng của khách hàng.</p>
                            </div>
                    </div>
                </div>
        </div>
  )
}

export default About