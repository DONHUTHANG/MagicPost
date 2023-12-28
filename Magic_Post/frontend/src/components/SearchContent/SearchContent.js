import React, {useState, useRef, useEffect} from 'react';
import './SearchContent.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import moment from 'moment';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

function SearchContent() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');
 
  const [autoNumber, setAutoNumber] = useState(1);
  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const componentRef = useRef();

  const [selectedRowData, setSelectedRowData] = useState(null);

    const [data, setData] = useState([]);
    const getData = async () => {
        fetch('http://localhost:5000/order/getall', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(response => response.json())
        .then(data => {
        //   console.log(data.fullname);
          const newData = data.map((row, index) => ({ ...row, index: index + 1 }));
          setData(newData);
          setAutoNumber(data.length + 1)
        })
        .catch(error => {
          console.error(error); 
        });
    }

    useEffect(() => {
        getData();
    }, [])


  const handleDeleteRow = (rowData) => {
    const updatedData = data.filter((row) => row.index !== rowData.index);
    const newData = updatedData.map((row, index) => ({ ...row, index: index + 1 }));
    setData(newData);
    setAutoNumber(updatedData.length + 1); 
};
    const [modal, setModal] = useState(false);
    const triggerModal = (rowData) => {
        setSelectedRowData(rowData);
        setModal(!modal);
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
  return (
    <div className="search-content-container">
        <div className="content-container">
            <div className="content-container-header">
                <h1 className="content-contaier-header-title">
                    Tra cứu thông tin của đơn hàng
                </h1> 
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
            <ToastContainer/>
                    <DataTable value={data} className="table" filters={filters}  paginator rows={10} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="Số thứ tự" sortable body={(rowData) => rowData.index} />
                        <Column field="order_id" header="Mã vận đơn" sortable />
                        <Column field="send_id" header="Mã đơn hàng" sortable />
                        <Column field="order_date" header="Ngày gửi hàng" sortable body={(rowData) => moment(rowData.order_date).format("DD/MM/YYYY")}/>
                        <Column field='expected_date' header='Ngày dự kiến' sortable body={(rowData) => moment(rowData.expected_date).format("DD/MM/YYYY")}/>
                        <Column header="Trạng thái" sortable body={(rowData) => moment(rowData.expected_date).isBefore(moment()) ? <label className='undelivery'>Chưa giao</label> : <label className='delivering'>Đã giao</label>}/>
                        <Column body={displayTemplate} header="" style={{ textAlign: 'center', width: '6rem' }} />
                    </DataTable>
        </div>
    </div>
  )
}

export default SearchContent