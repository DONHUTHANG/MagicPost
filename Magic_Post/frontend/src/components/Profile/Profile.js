import React, {useState, useEffect, useRef} from 'react';
import './Profile.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment, { months } from 'moment';
import userImg from '../../assets/images/user-img.png';
import { IoMdReverseCamera } from "react-icons/io";

function Profile({ isLoggedIn }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const token = localStorage.getItem('token');

    const [fullName, setFullName] = useState('');
    const [tempFullName, setTempFullName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [tempDateOfBirth, setTempDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tempPhoneNumber, setTempPhoneNumber] = useState('');
    const [citizenId, setCitizenId] = useState('');
    const [tempCitizenId, setTempCitizenId] = useState('');
    const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [description, setDescription] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [companyInfo, setCompanyInfo] = useState({
      depotName: "",
      depotCode: "",
      depotManager: "",
      depotHotline: "",
    });  
    const fullNameInputRef = useRef(null);
    const dateOfBirthInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const citizenIdInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    function checkFormatEmail(e) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test(e)) {
        return false;
      }
      return true;
    }

    function checkFormatDob(dob) {
      const dateFormat = "DD/MM/YYYY";
      return moment(dob, dateFormat, true).isValid();
    }

    function checkValidDob(dob) {
      const [day, month, year] = dob.split("/").map(Number);
  
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
      }
      if (month > 12 || month < 1) {
        return false;
      }
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        if (day > 31) return false;
      } else if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          if (day > 29) return false;
        } else if (day > 28) return false;
      } else if (day > 30) return false;
  
      if (day < 1) return false;
  
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      if (
        year > currentYear ||
        (month > currentMonth && year >= currentYear)
      )
        return false;
  
      return true;
    }

    const getUser = async () => {
      fetch(`http://localhost:5000/user/all/${currentUser.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`
      }).then(response => response.json())
        .then(data => {
            setFullName(data.last_name + ' ' + data.first_name);
            setGender(data.gender);
            setDateOfBirth(moment(data.date_of_birth).format("DD/MM/YYYY"));
            setPhoneNumber(data.phone_number);
            setCitizenId(data.identity_no);
            setEmail(data.email);
            setDescription(data.about === "none" ? "" : data.about);
            setTempFullName(data.last_name + ' ' + data.first_name);
            setTempDateOfBirth(moment(data.date_of_birth).format("DD/MM/YYYY"));
            setTempPhoneNumber(data.phone_number);
            setTempCitizenId(data.identity_no);
            setTempEmail(data.email);
            setTempDescription(data.about === "none" ? "" : data.about);
            // setCompanyInfo({
            //     depotName: data.depot_name,
            //     depotCode: data.depot_code,
            //     depotManager: data.depot_manager,
            //     depotHotline: data.depot_hotline,
            //   });
          })
          .catch(error => {
            console.error(error); 
          });
    };

    const [data, setData] = useState([]);


    const getAllDepot = async () => {
      fetch(`http://localhost:5000/depot/getall/${currentUser.depot_code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
        
      })
          .then(response => response.json())
          .then(data => {
            setData(data);
          })
          .catch(error => {
            console.error(error); 
          });
    };

    const formRef = useRef();

    // const updateUser = async (id) => {
    //   const dob = moment(dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD") + "T07:00:00+07:00";
    //   const lastSpaceIndex = fullName.lastIndexOf(" ");
    //   const firstName1 = fullName.substring(lastSpaceIndex + 1);
    //   const lastName1 = fullName.substring(0, lastSpaceIndex);
    //   const payload = {
    //     first_name: firstName1,
    //     last_name: lastName1,
    //     date_of_birth: dob,
    //     phone_number: phoneNumber,
    //     identity_no: citizenId,
    //     email: email,
    //     about: description
    //   };
    //   fetch(`http://localhost:5000/api/v1/auth/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(payload)
    //   })
    //       .then(response => response.json())
    //       .then(data => {
    //         if (!toast.isActive('updateInformation')) {
    //           toast.success('Cập nhật thông tin thành công', {
    //             toastId: 'updateInformation',
    //             autoClose: 1500
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         if (!toast.isActive('updateInformation-error')) {
    //           toast.error('Cập nhật thông tin thất bại', {
    //             toastId: 'updateInformation-error',
    //             autoClose: 1500
    //           });
    //         }
    //       });
    // };

    // const handleUpdate = () => {
    //   if (!fullName) {
    //     if (!toast.isActive('fullName')) {
    //       toast.error('Họ và tên không được để trống', {
    //         toastId: 'fullName',
    //         autoClose: 1500
    //       });
    //     }
    //   }
    //   if (!phoneNumber) {
    //     if (!toast.isActive('phoneNumber')) {
    //       toast.error('Số điện thoại không được để trống', {
    //         toastId: 'phoneNumber',
    //         autoClose: 1500
    //       });
    //     }
    //   }
    //   if (!citizenId) {
    //     if (!toast.isActive('citizenId')) {
    //       toast.error('Số CCCD không được để trống', {
    //         toastId: 'citizenId',
    //         autoClose: 1500
    //       });
    //     }
    //   }
    //   if (!email) {
    //     if (!toast.isActive('email')) {
    //       toast.error('Email không được để trống', {
    //         toastId: 'email',
    //         autoClose: 1500
    //       });
    //     }
    //   } else if (!checkFormatEmail(email)) {
    //     if (!toast.isActive('checkEmail')) {
    //       toast.error('Email không đúng định dạng', {
    //         toastId: 'checkEmail',
    //         autoClose: 1500
    //       });
    //     }
    //   }
    //   if (!dateOfBirth) {
    //     if (!toast.isActive('dateOfbirth')) {
    //       toast.error('Ngày sinh không được để trống', {
    //         toastId: 'dateOfbirth',
    //         autoClose: 1500
    //       });
    //     }
    //   } else if (!checkFormatDob(dateOfBirth)) {
    //     if (!toast.isActive('checkFormat')) {
    //       toast.error('Ngày sinh không đúng định dạng', {
    //         toastId: 'checkFormat',
    //         autoClose: 1500
    //       });
    //     }
    //   } else if (!checkValidDob(dateOfBirth)) {
    //     if (!toast.isActive('checkValidDob')) {
    //       toast.error('Ngày sinh không hợp lệ', {
    //         toastId: 'checkValidDob',
    //         autoClose: 1500
    //       });
    //     }
    //   }
  
    //   if (fullName && phoneNumber && citizenId && email && dateOfBirth && checkValidDob(dateOfBirth) && checkFormatDob(dateOfBirth) && checkFormatEmail(email)) {
    //     updateUser(currentUser.user_id);
    //     setTempDateOfBirth(dateOfBirth);
    //     setTempEmail(email);
    //     setTempFullName(fullName);
    //     setTempPhoneNumber(phoneNumber);
    //     setTempDescription(description);
    //     setTempCitizenId(citizenId);
    //   }
    // };

    useEffect(() => {
      getUser();
      getAllDepot();
    }, []);
  
    const handleCancel = () => {
      setFullName(tempFullName);
      setDateOfBirth(tempDateOfBirth);
      setPhoneNumber(tempPhoneNumber);
      setCitizenId(tempCitizenId);
      setEmail(tempEmail);
      setDescription(tempDescription);
    };
  
    const handleKeyDown = (event, nextInputRef) => {
      if (event.key === "Enter") {
        event.preventDefault();
        nextInputRef.current.focus();
      }
    };

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-user">
                    <div className="profile-userpic">
                        <img src={userImg} alt="" />
                        <div className="round">
                        <input type="file" />
                        <IoMdReverseCamera />
                        </div>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {tempFullName}
                        </div>
                        <div className="profile-usertitle-role">
                            {currentUser.role} God
                        </div>
                    </div>
                </div>

                <div className='profile-userinfo'>
                <div className='profile-userinfo-item'>
                        <div>
                            <i className='bx bx-calendar-alt' ></i> Ngày sinh:
                        </div>
                        <div>
                            {tempDateOfBirth} 
                        </div>
                    </div>
                    
                    <div className='profile-userinfo-item'>
                        <div>
                            <i className='bx bx-user'></i> Giới tính:
                        </div>
                        <div>
                            {gender}Nam
                        </div>
                    </div>
                    
                    <div className='profile-userinfo-item'>
                        <div>
                            <i className='bx bx-phone' ></i> Số điện thoại:
                        </div>
                        <div>
                            {tempPhoneNumber} 0385257118
                        </div>
                    </div>
                    
                    <div className='profile-userinfo-item'>
                        <div>
                            <i className='bx bx-envelope' ></i> Email:
                        </div>
                        <div>
                            {tempEmail} donhuthang06082002@gmail.com
                        </div>
                    </div>
                </div>
                <div className="profile-usermenu">
                      <ul className="profile-usermenu-nav">
                          <li className={currentIndex === 0 ? "active" : ""}>
                              <a href="#">
                              Cập nhật thông tin </a>
                          </li>
                          <li className={currentIndex === 1 ? "active" : ""}>
                              <a href="#" >
                              Thay đổi mật khẩu </a>
                          </li>
                      </ul>
                  </div>  
                </div>
                <div className="profile-content">
                      <div className="personinfo-container">
                        <ToastContainer/>
                        <form>
                          <h1 className='personinfo-headerText'>Thông tin cá nhân</h1>
                          <div className="personinfo-container-form">
                          <div className="personinfo-container-left">
                          <div className="form-left">
                            <div className="input-container">
                              <label htmlFor="fullName">Họ và tên</label>
                              <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() + word.slice(1)
                                  )
                                  .join(" "))}
                                onKeyDown={(e) => handleKeyDown(e, dateOfBirthInputRef)}
                                ref={fullNameInputRef}
                              />
                            </div>

                            <div className='input-container-flex'>
                              <div className="input-container">
                                <label htmlFor="dateOfBirth">Ngày sinh</label>
                                <input
                                  type="text"
                                  id="dateOfBirth"
                                  value={dateOfBirth}
                                  onChange={(e) => setDateOfBirth(e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, phoneNumberInputRef)}
                                  ref={dateOfBirthInputRef}
                                />
                              </div>
                              <div className="input-container gender">
                                <label className='gender-title' htmlFor="gender">Giới tính</label>
                                <div className='checkbox-gender'>
                                  <label>
                                      <input
                                          type="checkbox"
                                          id="gender"
                                          value={gender}
                                          onChange={() => {
                                          }}
                                          title='Không thể sửa đổi'
                                          className='input-disabled'
                                          disabled
                                          checked={currentUser.gender === "Nam"}
                                      />
                                      <p style={{"color": "#000"}}>Nam</p>
                                  </label>
                                  <label>
                                      <input
                                          type="checkbox"
                                          id="gender"
                                          value={gender}
                                          onChange={() => {
                                          }}
                                          title='Không thể sửa đổi'
                                          className='input-disabled'
                                          disabled
                                          checked={currentUser.gender === "Nữ"}
                                      />
                                      <p style={{"color": "#000"}}>Nữ</p>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="input-container">
                              <label htmlFor="phoneNumber">Số điện thoại</label>
                              <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, citizenIdInputRef)}
                                ref={phoneNumberInputRef}
                              />
                            </div>
                            <div className="input-container distance">
                              <label htmlFor="citizenId">Số căn cước công dân</label>
                              <input
                                type="text"
                                id="citizenId"
                                value={citizenId}
                                onChange={(e) => setCitizenId(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, emailInputRef)}
                                ref={citizenIdInputRef}
                              />
                            </div>
                            <div className="input-container distance">
                              <label htmlFor="email">Email</label>
                              <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, descriptionInputRef)}
                                ref={emailInputRef}
                              />
                            </div>
                            
                          </div>
                          </div>
                          <hr />
                          <div className="personinfo-container-right">
                          <div className="input-container distance">
                              <label htmlFor="inspectionStation">Kho Hàng</label>
                              <input
                                type="text"
                                id="inspectionStation"
                                value={data.depot_name}
                                title='Không thể sửa đổi'
                                className='input-disabled'
                                disabled
                              />
                            </div>
                            <div className="input-container distance">
                              <label htmlFor="stationCode">Mã Số Kho</label>
                              <input
                                type="text"
                                id="stationCode"
                                // value={data.depot_code}
                                title='Không thể sửa đổi'
                                className='input-disabled'
                                disabled
                              />
                            </div>
                            <div className="input-container distance">
                              <label htmlFor="stationManager">Quản lý Kho</label>
                              <input
                                type="text"
                                id="stationManager"
                                // value={data.depot_manager}
                                title='Không thể sửa đổi'
                                className='input-disabled'
                                disabled
                              />
                            </div>
                            <div className="input-container distance">
                              <label htmlFor="hotline">Hotline</label>
                              <input
                                type="text"
                                id="hotline"
                                // value={data.depot_hotline}
                                title='Không thể sửa đổi'
                                className='input-disabled'
                                disabled
                              />
                            </div>
                          </div>
                          </div>

                          <div className="form-row end-distance">
                            <div className="input-container">
                              <label htmlFor="description">Mô tả</label>
                              <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ref={descriptionInputRef}
                              ></textarea>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="button-container">
                              <label htmlFor='button-u' className='app-content-headerButton-u'>Cập nhật</label>
                              <button id='button-u' className='button-update' type="button" style={{ 'display': 'none' }} />
                              <label htmlFor='button-c' className='app-content-headerButton-c'>Hủy</label>
                              <button id='button-c' className='button-cancel' type="button" style={{ 'display': 'none' }} />
                            </div>
                          </div>
                
                        </form>
                      </div>
                </div>
        </div>
    );
}

export default Profile;