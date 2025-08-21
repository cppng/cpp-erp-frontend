import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import { runSalary } from '../../utils/api-services/hr/payroll';

function HrRunSalary() {

    const [month, setMonth] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    const saveForm = async ()=>{

        setFrmMsg("");

        if(month == ""){
            setFrmMsg("Please select month");
            return;
        }

        const dataToSave = {
            month: month
        }

        const res = await runSalary(dataToSave);
        if(res.success){
            toast("Updated successfully", {type: "success"});
        }else{
            toast("Failed to update record", {type: "error",});
        }
        
        setPosting(false);
    }

    const styles = {
        page:{
            minHeight: 300,
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
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    return (
        <div style={styles.page}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>

                        <div style={styles.form}>
                            <h4 style={styles.title}>Run Salary</h4>
                            
                            <div className="form-group">
                                <label style={styles.label}>Month</label>
                                <select value={month} onChange={e => setMonth(e.target.value)} className="form-control">
                                    <option key={0} value={""}>- Select -</option>
                                    <option key={1} value={"1"}>January</option>
                                    <option key={2} value={"2"}>February</option>
                                    <option key={3} value={"3"}>March</option>
                                    <option key={4} value={"4"}>April</option>
                                    <option key={5} value={"5"}>May</option>
                                    <option key={6} value={"6"}>June</option>
                                    <option key={7} value={"7"}>July</option>
                                    <option key={8} value={"8"}>August</option>
                                    <option key={9} value={"9"}>September</option>
                                    <option key={10} value={"10"}>October</option>
                                    <option key={11} value={"11"}>November</option>
                                    <option key={12} value={"12"}>December</option>
                                </select>
                            </div>

                            {frmMsg != "" && 
                                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
                            }

                            <div className="form-group">
                                <button onClick={saveForm} className='btn btn-primary'>RUN SALARY</button>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default HrRunSalary;