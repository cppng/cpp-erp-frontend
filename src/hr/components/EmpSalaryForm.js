import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../global/components/Constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { empSalaryUpdate } from '../../utils/api-services/hr/employee';
import { ToastContainer, toast } from 'react-toastify';

function EmpSalaryForm({obj}) {

    const [basicSalary, setBasicSalary] = useState("");
    const [payGrade, setPayGrade] = useState("");
    const [frequency, setFrequency] = useState("");
    const [bank, setBank] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [accountName, setAccountName] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        presetForm();
    }, []);

    function presetForm(){
        if(obj != null){
            setBasicSalary(obj.basicSalary);
            setPayGrade(obj.salaryGrade);
            setFrequency(obj.payFrequncy);
            setBank(obj.bankName);
            setAccountNo(obj.bankAccountNo);
            setAccountName(obj.bankAccountName);
        }
    }

    const saveForm = async ()=>{

        if(basicSalary == ""){
            setFrmMsg("Please enter basic salary");
            return;
        }

        if(frequency == ""){
            setFrmMsg("Please enter frequency");
            return;
        }
    
        setPosting(true);
    
        const dataToSave = {
            Slug: obj.slug,
            BasicSalary: basicSalary,
            SalaryGrade: payGrade,
            Frequncy: frequency,
            BankName: bank,
            BankAccountNo: accountNo,
            BankAccountName: accountName
        }
    
        const res = await empSalaryUpdate(dataToSave);
        if(res.success){
            toast("Updated successfully", {type: "success"});
        }else{
            toast("Failed to update record", {type: "error",});
        }
    
        setPosting(false);
    }

    const styles = {
        page:{
            paddingTop: 40
        },
        form:{
            background: '#fff',
            padding:'10px 15px',
            borderRadius: 10,
            border: "1px solid #ccc",
            marginBottom: 20
        },
        title: {
            color: '#666',
            marginBottom:20,
            fontSize: 18
        },
        label:{
            color: "#aaa",
            fontSize: 14,
            fontWeight: 500
        },
        photo:{
            preview:{
                width: 100,
                marginBottom: 10,
                borderRadius: 5
            },
            img:{
                width: 100,
                borderRadius: 5
            },
            info:{
                color: '#666',
                fontSize: 15
            },
            display:{
                width: 100,
                borderRadius: 5
            },
            input: {
                display: 'none'
            },
        },
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    return (
        <div> 

            <div className="form-group">
                <label style={styles.label}>Basic Salary</label>
                <input type="text" value={basicSalary} onChange={e => setBasicSalary(e.target.value)} className="form-control" placeholder="Enter basic salary" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Pay Grade / Level</label>
                <input type="text" value={payGrade} onChange={e => setPayGrade(e.target.value)} className="form-control" placeholder="Enter Pay Grade / Level" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Pay Frequency</label>
                <select value={frequency} onChange={e => setFrequency(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Monthly"}>Monthly</option>
                    <option key={2} value={"Biweekly"}>Biweekly</option>
                    <option key={3} value={"Weekly"}>Weekly</option>
                    <option key={4} value={"daily"}>Daily Wages</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Bank Name</label>
                <input type="text" value={bank} onChange={e => setBank(e.target.value)} className="form-control" placeholder="Enter bank name" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Bank Account Number</label>
                <input type="text" value={accountNo} onChange={e => setAccountNo(e.target.value)} className="form-control" placeholder="Enter bank account number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Bank Account Name</label>
                <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} className="form-control" placeholder="Enter bank account name" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary' disabled={posting?"disabled":""}>
                    {posting?"Saving...": "Save Form"}
                </button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default EmpSalaryForm;