import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_URL } from '../../global/components/Constants';

function UserForm() {

    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
    }, []);

    const saveForm = ()=>{

        setFrmMsg("");

        if(firstName == ""){
            setFrmMsg("Please enter first name");
            return;
        }

        if(lastName == ""){
            setFrmMsg("Please enter last name");
            return;
        }

        if(username == ""){
            setFrmMsg("Please enter username");
            return;
        }

        if(email == ""){
            setFrmMsg("Please enter email");
            return;
        }

        if(password == ""){
            setFrmMsg("Please enter password");
            return;
        }

        setPosting(true);

        const dataToSave = {
            title: title,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            username: username,
            email: email,
            phoneNumber: phone,
            password: password
        }

        axios({
            method: "POST",
            url: API_URL + "user/create-new-user",
            data: dataToSave,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            const obj = response.data;
            console.log(obj)
            if(obj.success){
                location.reload();
            }else{
                setFrmMsg(obj.message);
                setPosting(false)
            }
        })
        .catch(function (response) {
            setPosting(false)
        });
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
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    return (
        <div> 
                        
            <div className="form-group">
                <label style={styles.label}>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" placeholder="Enter title" />
            </div>

            <div className="form-group">
                <label style={styles.label}>First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control" placeholder="Enter first name" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Middle Name</label>
                <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} className="form-control" placeholder="Enter middle name" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="form-control" placeholder="Enter last name" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Enter username" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter email address" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter phone number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary'>Save Form</button>
            </div>
        </div>
    )
}

export default UserForm;