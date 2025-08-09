import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faPhone, faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from './components/Constants';

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [frmMsg, setFrmMsg] = useState("");
    const [posting, setPosting] = useState(false);
    let navigate = useNavigate();

    let { entry } = useParams();

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])
 
    const postForm = ()=>{

        setFrmMsg("")

        if(name == ""){
            setFrmMsg("Please enter name")
            return;
        }

        if(email == ""){
            setFrmMsg("Please enter email address")
            return;
        }

        if(phone == ""){
            setFrmMsg("Please enter phone number")
            return;
        }

        if(password == ""){
            setFrmMsg("Please enter password")
            return;
        }

        if(confirm == ""){
            setFrmMsg("Please enter confirm password")
            return;
        }

        if(password != confirm){
            setFrmMsg("Password and confirm password did not match")
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('interest', entry);

        setPosting(true)

        axios({
            method: "post",
            url: API_URL + "user/save_user",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            withCredentials: true
        })
        .then(function (response) {
            const obj = response.data;
            if(obj.Success){
                localStorage.setItem("session", obj.Data);
                navigate(`/mediator/${entry}`);
            }else if(obj.Status == "duplicate"){
                setFrmMsg(obj.Message);
                setPosting(false);
            }else{
                setFrmMsg(obj.Message);
                setPosting(false);
            }
        })
        .catch(function (response) {
              setPosting(false)
        });
    }

    const styles = {
        form: {
            background: '#fff',
            marginBottom: 100,
            marginTop:50,
            padding: 20,
            boxShadow: '0px 1px 1px #cccccc',
            borderRadius: 5,
        },
        formHeader: {
            marginBottom:30
        },
        formTitle:{
            fontSize:20
        },
        formLabel: {
            fontSize:14,
            fontWeight: '600'
        },
        FormBtn: {
            width: '100%',
            marginTop:20,
            marginBottom:20,
            fontWeight: 500 
        },
        loginLink: {
            fontSize:16,
            fontWeight: 500 
        },
        forgotPwd: {
            textAlign: 'right'
        },
        frmMsg: {
            color: '#990000',
            fontSize: 16,
        }
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>

                <div style = {styles.form}>

                    <div style={styles.formHeader}>
                        <h4 style={styles.formTitle}>Sign Up</h4>
                        <DashLine  size={2} width={160} bottom = {20}/>
                    </div>

                    <div className='form-group'>
                        <label style={styles.formLabel}>Name</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <input type = "text" value={name} onChange={e => setName(e.target.value)} className='form-control' placeholder='Enter name' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label style={styles.formLabel}>Email</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                            <input type = "text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' placeholder='Enter email address' />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label style={styles.formLabel}>Phone</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
                            </div>
                            <input type = "text" value={phone} onChange={e => setPhone(e.target.value)} className='form-control'  placeholder='Enter phone number'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label style={styles.formLabel}>Password</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            </div>
                            <input type = "password" value={password} onChange={e => setPassword(e.target.value)} className='form-control'  placeholder='Enter password' />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label style={styles.formLabel}>Confirm Password</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            </div>
                            <input type = "password" value={confirm} onChange={e => setConfirm(e.target.value)} className='form-control'  placeholder='Confirm password' />
                        </div>
                    </div>

                    <div style={styles.frmMsg} className='form-group'>{frmMsg}</div>

                    <div className='form-group'>
                        <button onClick={postForm} style={styles.FormBtn} disabled={posting} className='btn btn-primary'>
                            {posting?'Posting ...':'SIGN UP'}
                        </button>
                    </div>

                    <div className='form-group'>
                        <Link to = {`/login/${entry}`} style={styles.loginLink}>Already have an account?, Login</Link>
                    </div>
                </div>

                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    )
    
}

export default SignUp