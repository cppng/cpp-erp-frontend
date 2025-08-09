import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../global/components/Constants';
import { empNokUpdate } from '../../utils/api-services/hr/employee';

function EmpNOKForm({obj, slug}) {

    const [formId, setFormId] = useState("0");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [relationship, setRelationship] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
    }, []);

    const saveForm = async ()=>{
        setFrmMsg("");
    
        if(name == ""){
            setFrmMsg("Please enter name");
            return;
        }
    
        if(gender == ""){
            setFrmMsg("Please enter gender");
            return;
        }

        if(phone == ""){
            setFrmMsg("Please enter phone");
            return;
        }

        if(address == ""){
            setFrmMsg("Please enter address");
            return;
        }
    
        setPosting(true);
    
        const dataToSave = {
            Slug: slug,
            Name: name,
            Gender: gender,
            Email: email,
            Phone: phone,
            Address: address,
            Age: age,
            Relationship: relationship
        }
    
        const obj = await empNokUpdate(dataToSave);
    
        setPosting(true);
        
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
                <label style={styles.label}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter full name" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Male"}>Male</option>
                    <option key={2} value={"Female"}>Female</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Email Address</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter email address" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Phone Number</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter phone number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter address"></textarea>
            </div>

            <div className="form-group">
                <label style={styles.label}>Age</label>
                <input type="text" value={age} onChange={e => setAge(e.target.value)} className="form-control" placeholder="Enter next of kin age" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Relationship</label>
                <input type="text" value={relationship} onChange={e => setRelationship(e.target.value)} className="form-control" placeholder="Enter relationship" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <hr />

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary'>Save Form</button>
            </div>
        </div>
    )
}

export default EmpNOKForm;