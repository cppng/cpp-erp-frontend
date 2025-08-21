import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { empContactUpdate } from '../../../utils/api-services/hr/employee';
import { ToastContainer, toast } from 'react-toastify';

function EmpContactForm({obj}) {

    const [phone, setPhone] = useState("");
    const [phone2, setPhone2] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        presetForm();
    }, []);

    function presetForm(){
        if(obj != null){
            setPhone(obj.phone);
            setPhone2(obj.phone2);
            setEmail(obj.email);
            setEmail2(obj.email2);
            setAddress(obj.address);
            setAddress2(obj.address2);
            setState(obj.state);
            setCountry(obj.country);
        }
    }

    const saveForm = async ()=>{
    
        setFrmMsg("");
    
        if(phone == ""){
            setFrmMsg("Please enter first name");
            return;
        }
    
        if(email == ""){
            setFrmMsg("Please enter last name");
            return;
        }

        if(address == ""){
            setFrmMsg("Please enter last name");
            return;
        }
    
        setPosting(true);
    
        const dataToSave = {
            Slug: obj.slug,
            Phone: phone,
            Phone2: phone2,
            Email: email,
            Email2: email2,
            Address: address,
            Address2: address2,
            State: state,
            Country: country
        }
    
        const res = await empContactUpdate(dataToSave);
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
                <label style={styles.label}>Phone Number (Official)</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter official phone number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Phone Number (Personal)</label>
                <input type="text" value={phone2} onChange={e => setPhone2(e.target.value)} className="form-control" placeholder="Enter personal phone number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Email Address (Official)</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter official email address" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Email Address (Personal)</label>
                <input type="text" value={email2} onChange={e => setEmail2(e.target.value)} className="form-control" placeholder="Enter official email address" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Address 1</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter address 1"></textarea>
            </div>

            <div className="form-group">
                <label style={styles.label}>Address 2</label>
                <textarea value={address2} onChange={e => setAddress2(e.target.value)} className="form-control" placeholder="Enter address 2"></textarea>
            </div>
                        
            <div className="form-group">
                <label style={styles.label}>State of Origin</label>
                <input type="text" value={state} onChange={e => setState(e.target.value)} className="form-control" placeholder="Enter state" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Nationality</label>
                <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="form-control" placeholder="Enter nationality" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <hr />

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary' disabled={posting?"disabled":""}>
                    {posting?"Saving...": "Save Form"}
                </button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default EmpContactForm;