import React, {useState, useEffect} from 'react';
import './CustomerInfo.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import moment from 'moment';
import { PiMagnifyingGlassBold } from "react-icons/pi";

function CustomerInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('token');
    const [autoNumber, setAutoNumber] = useState(1);
    const [supportData, setSupportData] = useState([]);
    const getSupportData = async () => {
        fetch('http://localhost:5000/customerinfo/support', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(response => response.json())
        .then(data => {
        //   console.log(data.fullname);
          const newData = data.map((row, index) => ({ ...row, index: index + 1 }));
          setSupportData(newData);
          setAutoNumber(data.length + 1)
        })
        .catch(error => {
          console.error(error); 
        });
    }

    useEffect(() => {
        getSupportData();
    }, [])

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  return (
    <div className="customer-info-container">
            <div className="customer-info-header">
                <h1 className="customer-info-header-title">
                    Thông tin của khách hàng cần hỗ trợ
                </h1>
            </div>
           <div className="content-container-actions">
           <div className="search-box-customerinfo">
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
            {/* <div className="customer-info-actions">
                <div className="search-box-orderinfo">
                    <PiMagnifyingGlassBold />
                    <InputText className='search-input'
                                onInput={(e) => 
                                    setFilters({
                                        global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                                    })
                                }   
                            />
                </div>
            </div> */}
            <DataTable value={supportData} className="table" filters={filters} paginator rows={20} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="index" header="Thứ tự" sortable body={(rowData) => rowData.index} />
                        <Column field="fullname" header="Họ và tên" sortable />
                        <Column field="email" header="Email" sortable />
                        <Column field="phonenumber" header="Số điện thoại" sortable/>
                        <Column field='question_date' header="Ngày tạo câu hỏi" sortable body={(rowData) => moment(rowData.send_date).format("DD/MM/YYYY")} />
                        <Column field='mess' header='Nội dung' sortable/>
            </DataTable>
            
        </div>
  )
}

export default CustomerInfo