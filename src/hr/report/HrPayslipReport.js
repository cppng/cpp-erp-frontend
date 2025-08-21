import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import { getPayslip } from '../../utils/api-services/hr/payroll';
import { stringify } from 'uuid';

function HrPayslipReport() {

    const [payslip, setPayslip] = useState(false);
    const [benefits, setBenefits] = useState([]);
    const [deductions, setDeductions] = useState([]);
    const [computed, setComputed] = useState([]);
    const [loading, setLoading] = useState("init");
    const [frmMsg, setFrmMsg] = useState("");

    const { month } = useParams();

    let username = "";
    const session = localStorage.getItem("session");
    if(session){
        const sessionObj = JSON.parse(session);
        username = sessionObj.username;
    }

    useEffect(()=>{
        loadPayslip();
    }, []);
        
    const loadPayslip = async ()=>{
        setLoading("posting");
        const obj = await getPayslip({username:username, month:month});
        if(obj.success){
            parsePayslip(obj.data);
        }
        setLoading("complete");
    }

    function parsePayslip(obj){
        setPayslip(obj);

        const bene = obj.payElements.filter(x => {return x.entryType == "Benefit"});
        const duct = obj.payElements.filter(x => {return x.entryType == "Deduction"});
        const comp = obj.payElements.filter(x => {return x.entryType == "Computed"});

        setBenefits(bene);
        setDeductions(duct);
        setComputed(comp)
    }

    const styles = {
        page:{
            minHeight: 300,
            paddingTop: 40
        },
        report:{
            background: '#fff',
            padding:'10px 15px',
            borderRadius: 10,
            border: "1px solid #ccc",
            marginBottom: 20
        },
        head:{
            marginBottom: 40
        },
        title: {
            color: '#666',
            fontSize: 24
        },
        info:{
            color: "#666",
            fontSize: 14,
            fontWeight: 500
        },
        employee:{
            wrap:{
                maxWidth: 600,
                marginBottom: 20
            },
            label:{
                color: '#666',
                fontSize: 16,
                fontWeight: 600
            }
        },
        elements:{
            display: 'flex',
            alignItems: 'stretch'
        },
        element:{
            flex: 1
        },
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    function displayElem(title, data, color){
        return (
            <table style={{background: color}} className='table table-bordered'>
                <tr>
                    <th>{title}</th>
                    <th>Amount (NGN)</th>
                </tr>
                {data.map(itm => (
                    <>
                        {(itm.elementName=="Net Salary")?
                            <tr style={{fontWeight:700}}><td>{itm.elementName}</td><td>{itm.psAmount.toLocaleString()}</td></tr>:
                            <tr><td>{itm.elementName}</td><td>{itm.psAmount.toLocaleString()}</td></tr>
                        }
                    </>
                ))}
            </table>
        )
    }

    return (
        <div style={styles.page}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>

                        <div style={styles.report}>

                            <div style={styles.head}>
                                <h1 style={styles.title}>Compliance Professional PLC Payslip</h1>
                                <div style={styles.info}>10 Gambo Sawaba Road, 1st Avenue, Gwarinpa, Abuja, Nigeria.</div>
                            </div>

                            <table style={styles.employee.wrap} className='table table-bordered'>
                                <tr><td style={styles.employee.label}>Name</td><td>{payslip.employeeName}</td></tr>
                                <tr><td style={styles.employee.label}>Organization</td><td>{payslip.organization}</td></tr>
                                <tr><td style={styles.employee.label}>Department</td><td>{payslip.department}</td></tr>
                                <tr><td style={styles.employee.label}>Employee ID</td><td>{payslip.employeeId}</td></tr>
                                <tr><td style={styles.employee.label}>Employee Grade</td><td>{payslip.grade}</td></tr>
                                <tr><td style={styles.employee.label}>Pay Grade</td><td>{payslip.payGrade}</td></tr>
                            </table>

                            <div style={styles.elements}>
                                {displayElem("BENEFITS", benefits, '#e8fbdf')}
                                {displayElem("DEDUCTIONS", deductions, '#fff0f0')}
                            </div>

                            {displayElem("COMPUTED", computed, '#fff')}

                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default HrPayslipReport;