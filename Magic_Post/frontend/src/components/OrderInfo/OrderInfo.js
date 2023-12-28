import React, {useState , useRef} from 'react';
import './OrderInfo.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/primereact.min.css"; 
import { utils, read } from 'xlsx';
import { FilterMatchMode } from 'primereact/api';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import logo from "../../assets/icons/logo.png";
import QRCode from 'react-qr-code';
import { FaPrint } from "react-icons/fa6";

function OrderInfo(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('token');
    const [excelData, setExcelData] = useState([]);
    const file_type = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    const [autoNumber, setAutoNumber] = useState(1);
    const handleChange = (e) => {
        const selected_file = e.target.files[0];
        if (selected_file) {
            if (selected_file && file_type.includes(selected_file.type)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const workbook = read(e.target.result);
                    const sheet = workbook.SheetNames;
                    if (sheet.length) {
                        const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
                        const newData = data.map((row, index) => ({ ...row, index: index + 1 }));
                        setExcelData(newData);
                        setAutoNumber(data.length + 1);
                    }
                };
                reader.readAsArrayBuffer(selected_file);
            } else {
                setExcelData([]);
                setAutoNumber(1); 
            }
        }
    };

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [modal, setModal] = useState(false);
    const triggerModal = (rowData) => {
        setSelectedRowData(rowData);
        setModal(!modal);
    };

    const handleDeleteRow = (rowData) => {
        const updatedData = excelData.filter((row) => row.index !== rowData.index);
        const newData = updatedData.map((row, index) => ({ ...row, index: index + 1 }));
        setExcelData(newData);
        setAutoNumber(updatedData.length + 1); 
    };

    
    const displayTemplate = (rowData) => {
        const handleClick = () => {
              triggerModal(rowData);
          };
        return (
            <div>
                <IoEyeOutline onClick={handleClick} style={{cursor: 'pointer'}}/>
                <FaRegTrashAlt onClick={() => handleDeleteRow(rowData)} style={{ cursor: 'pointer', marginLeft: '0.5rem' }}/>
            </div>
        );
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const componentRef = useRef();

    const handlePrintFile = () => {
        if (window.confirm('Bạn có muốn in hoặc tải thông tin của đơn hàng?')) {
            handlePrint();
            // updateInspection();
        }
        return;
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
   
    const Message = "Cần nhập dữ liệu thông tin đơn hàng để xử lý";


  return (
    <div className="orderinfo-container">
        <div className="content-container">
            <div className="content-container-header">
                <h1 className="content-contaier-header-title">
                    Thông tin của đơn hàng
                </h1>
                <label htmlFor='import-excel' className='content-header-button'>Nhập dữ liệu</label>
                        <input type='file' id='import-excel' onChange={handleChange} style={{ 'display': 'none' }} />
            </div>
            <div className="content-container-actions">
                <div className="search-box-orderinfo">
                    <PiMagnifyingGlassBold />
                    <InputText className='search-input'
                                placeholder='Tìm kiếm'
                                onInput={(e) => 
                                    setFilters({
                                        global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                                    })
                                }   
                            />
                </div>
            </div>
            <DataTable  value={excelData} className="table"  emptyMessage={Message} filters={filters} paginator rows={20} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="index" header="Thứ tự" sortable body={(rowData) => rowData.index} />
                        <Column field="full_name" header="Họ và tên" sortable />
                        <Column field="send_id" header="Mã đơn hàng" sortable />
                        <Column field="send_date" header="Ngày gửi hàng" sortable body={(rowData) => moment(rowData.send_date).format("DD/MM/YYYY")} />
                        <Column field='place_of_send' header='Nơi gửi hàng' sortable/>
                        <Column body={displayTemplate} header="" style={{ textAlign: 'center', width: '6rem' }} />
            </DataTable>
            
        </div>
        <div className="container">
                    {modal && (
                        <div ref={componentRef} className="popup">
                            <div onClick={triggerModal} className="overlay"></div>
                            <div className="modal-content" id="inspection-report">
                            <form className="form">
                                {selectedRowData && (
                                    <div className='form-row-popup'>
                                        <div className="form-row-popup-header">
                                        <div className="form-logo">
                                                <img src={logo} alt="logo" />
                                                <h1>Dịch chuyển phát nhanh <br /><p>TLDExpress</p></h1>
                                            </div>

                                            <div className="form-qr-code">
                                                <QRCode 
                                                value='https://www.google.com.vn/'
                                                size={256}
                                                style={{ height: "auto", maxWidth: "100%", width: "40%", marginTop: "10px"}}
                                                viewBox={`0 0 256 256`}

                                                />
                                                <p>QRCode Đơn Hàng</p>
                                            </div>
                                        </div>
                                        <div className="form-row-popup-content">
                                        <div className='form-row-popup-item outline'>
                                            {/* <div className="form-logo">
                                                <img src={logo} alt="logo" />
                                                <h1>Dịch chuyển phát nhanh <span>TLDExpress</span></h1>
                                            </div> */}
                                            <h3>1. Họ tên địa chỉ người gửi:</h3>
                                            <div className='row-flex'>
                                            <div className='row-flex-item'>
                                                <p>Số điện thoại: {selectedRowData.registration_id}</p>
                                            </div>
                                            <div className='row-flex-item'>
                                                <p>Mã số đơn: </p>
                                            </div>
                                            </div>
                                            <div className='row-flex'>
                                            <div className='row-flex-item'>
                                            <p>Mã khách hàng:  {selectedRowData.type}</p>
                                            </div>
                                            <div className='row-flex-item'>
                                            <p>Mã Kho:  {selectedRowData.brand}</p>
                                            </div>
                                            </div>
                                            <h3>Loại hàng gửi:</h3>
                                            <div className="row-flex">
                                                <p>Tài liệu </p>
                                                <input type='checkbox'/>
                                                <p> Hàng hóa </p>
                                                <input type='checkbox'/>
                                            </div>
                                            <h3>Ngày gửi: <br />
                                            {selectedRowData.model_code}</h3>
                                            <h3>Cam kết của người gửi</h3>
                                            <div className="row-flex">
                                            <p>Cam kết của người gửi: Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được thì tôi sẽ trả cước chuyển hoàn.</p>
                                            </div>
                                            <div className='spaceAround'>
                                                <h3><span className='small-text'>Ghi chú:</span> {selectedRowData.notes}</h3>
                                            </div>
                                            <div className="space-row">
                                            <p style={{ fontSize: '20px', fontWeight: '500' }}>Bạn có muốn in phiếu đơn hàng không?</p>
                                            <FaPrint onClick={handlePrintFile} style={{ cursor: 'pointer', marginLeft: '0.5rem', fontSize: '20px' }}/> 
                                            </div>
                                            </div>
                                        <div className='form-row-popup-item outline'>
                                        
                                            <h3 className='margintop'>2. Họ tên địa chỉ người nhận:</h3>
                                            <div className='row-flex'>
                                            <div className="row-flex-item">
                                            <p>Số điện thoại:</p>
                                            </div>
                                            <div className='row-flex-item'>
                                                <p>Mã số đơn: {selectedRowData.wheel_formula}<br/>
                                               </p>
                                            </div>
                                            </div>
                                            <div className='row-flex'><p>Mã kho hàng:</p></div>
                                            <div className="row-column">
                                            <div className="row-column-box">
                                            <h3>Cước phí:</h3>
                                            <div className='spaceAround'>
                                                <p>a. Cước chính: </p>
                                                <p>b. Phụ phí: </p>
                                                <p>c. Cước GTGT: </p>
                                                <p>d. Tổng cước (gồm VAT): </p>
                                                <p>e. Thu khác: </p>
                                                <p>f. Tổng thu: </p>

                                            </div>
                                            </div>
                                            <div className="row-column-box">
                                            <h3>Thu của người nhận:</h3>
                                            <div className='spaceAround'>
                                                <p>COD: </p>
                                                <p>Thu khác:</p>
                                                <p>Tổng thu:</p>
                                            </div>
                                            </div>
                                            </div>
                                            <div className='row-flex margintop2'>
                                                <div className='row-flex-two'>
                                                    <p>Ngày giờ nhận<br/>
                                                    </p>
                                                </div>
                                                <div className='row-flex-three'>
                                                    <p>Hà Nội, ngày {moment().format("DD")} tháng {moment().format("MM")} năm {moment().format("YYYY")}<br/><h3>Bưu cục chấp nhận</h3></p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                            </div>
                        </div>
                    )}
                </div>
    </div>
  )
}

export default OrderInfo