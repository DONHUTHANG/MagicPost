import React, {useState} from 'react';
import './AWrapper.css';
import { FaUsers, FaTruckMoving, FaUserAstronaut } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

function AWrapper() {
    const [counterOn, setCounterOn] = useState(false);
  return (
    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
        <section className="awrapper">
            <div className="container">
                <div className="box">
                    <FaUsers className='icon'/>
                    <h1>
                    {counterOn && <CountUp start={0} end={990} duration={3} delay={0} />}.
                    {counterOn && <CountUp start={0} end={865} duration={5} delay={0} />}
                    +
                    </h1>
                    <p>KHÁCH HÀNG TIN DÙNG</p>
                </div>
                <div className="box">
                    <BsBox className='icon'/>
                    <h1>
                        {counterOn && <CountUp start={0} end={400} duration={3} delay={0} />}.
                        {counterOn && <CountUp start={0} end={768} duration={5} delay={0} />}
                        +
                    </h1>
                    <p>ĐƠN HÀNG ĐANG VẬN CHUYỂN</p>
                </div>
                <div className="box">
                    <FaTruckMoving className='icon'/>
                    <h1>
                        {counterOn && <CountUp start={0} end={180} duration={3} delay={0} />} 
                    +</h1>
                    <p>BƯU CỤC 63 TỈNH THÀNH</p>
                </div>
                <div className="box">
                    <FaUserAstronaut className='icon'/>
                    <h1>
                    {counterOn && <CountUp start={0} end={308} duration={3} delay={0} />}.
                    {counterOn && <CountUp start={0} end={790} duration={5} delay={0} />} 
                    +                  
                    </h1>
                    <p>NHÂN VIÊN TRÊN KHẮP CẢ NƯỚC</p>
                </div>
            </div>
        </section>
    </ScrollTrigger>
  )
}

export default AWrapper