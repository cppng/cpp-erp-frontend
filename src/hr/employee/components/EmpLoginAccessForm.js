import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../global/components/Constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { empDetailsUpdate } from '../../../utils/api-services/hr/employee';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers } from '../../../utils/api-services/um/user';
import { empLoginAccessUpdate } from '../../../utils/api-services/hr/employee';

function EmpLoginAccessForm({obj}) {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        loadUsers();
        presetForm();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        console.log(res)
        setUsers(res);
        setLoading(false);
    }

    function presetForm(){
        if(obj != null){
            setUsername(obj.employeeUsername);
        }
    }

    const saveForm = async () => {
        setFrmMsg("");
        
        setPosting(true);
        
        const dataToSave = {
            Slug: obj.slug,
            EmployeeUsername: username
        }
        
        const res = await empLoginAccessUpdate(dataToSave);
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
                <label style={styles.label}>Users</label>
                <select value={username} onChange={e => setUsername(e.target.value)} className="form-control">
                    <option key={-1} value={""}>- Select -</option>
                    {users.map((itm, index) => (
                        <option key={index} value={itm.userName}>{itm.name} - {itm.userName}</option>
                    ))}
                </select>
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

export default EmpLoginAccessForm;