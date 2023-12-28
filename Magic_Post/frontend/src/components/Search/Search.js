import React, { useState } from 'react';
import './Search.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetail from '../OrderDetails/OrderDetail';

function Search(props) {
    const [sendID, setSendID] = useState("");
    const [ship, setShip] = useState([]);
    const getInfoOrders = async(value) => {
        try {
          const payload = {
            send_id: value
          };
          const result = await fetch("http://localhost:5000/ship/getBySendId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          });
      
          if (result.status === 200) {
            const data = await result.json();
            if (data.status === "FAILED") {
              const { message } = data;
              if (message.includes("Empty")) {
                toast.error('Vui lòng nhập mã đơn hàng', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              } else if (message.includes("Error")) {
                toast.error('Mã đơn hàng không đúng! Vui lòng nhập lại.', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            } else if (data.status === "SUCCESS") {
              toast.success('Mã đơn hàng của quý khách!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setShip(data.ship);
            }
          } else {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại sau.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } catch (err) {
          console.log(err);
          toast.error('Có lỗi xảy ra! Vui lòng thử lại sau.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      };


    const handleChange = () => {
        getInfoOrders(sendID);
        scrollToTimeline();
    }

    const scrollToTimeline = () => {
        const timeline = document.getElementById('search-timeline');
        if (timeline) {
            timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
  return (
    <>
        <div className="container" id='search'>
            <div className="header">
                <div className="header-text">
                    <h1 className="title">
                        Tra cứu mã đơn
                    </h1>
                    <p className='sub-title'>Nhập mã vận đơn để theo dõi đơn hàng qua TLDExpress để nắm rõ tình trạng đơn của khách hàng.</p>
                </div>
                <div className="bill-code">
                    <label htmlFor="code">
                        Mã vận đơn
                    </label>
                    <input type="text" placeholder='Nhập mã vận đơn' 
                    onChange={(e) => setSendID(e.target.value)}
                    />
                    <p className="bill-code-title">
                    Mã vận đơn/ mã đơn hàng là mã vạch theo dõi trên đơn hàng, chứng từ gửi qua TLDExpress. Bạn có thể tra cứu một hoặc nhiều mã vận đơn theo ví dụ sau: 123456.
                    </p>
                    <button className="btn-search" onClick={handleChange}>Tra cứu</button>
                </div>
            </div>
        </div>
        <div id='search-timeline'>
            <OrderDetail ship={ship}/>
        </div>
    </>
  )
}

export default Search