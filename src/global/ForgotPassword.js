import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from './components/Constants';


function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [frmMsg, setFrmMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [posting, setPosting] = useState(false);
    let navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])

    const resetMessage = ()=>{

        setFrmMsg(""); setSuccess(false); setSuccessMsg("");

        if(email == ""){
            setFrmMsg("Please enter email address");
            return;
        }

        setPosting(true);

        const formData = new FormData();
        formData.append('email', email);

        axios({
            method: "post",
            url: API_URL + "user/reset_password",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            withCredentials: true
        })
        .then(function (response) {
            const obj = response.data;
            if(obj.Status == "success"){
                setSuccess(true);
                setSuccessMsg(obj.Message);
                setEmail("");
            }else{
                setFrmMsg(obj.Message);
            }
            setPosting(false);
        })
        .catch(function (response) {
            setPosting("Posting error");
            setPosting(false)
        });
    }

    const styles = {
        form: {
            background: '#fff',
            marginBottom:100,
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
        signUpLink: {
            fontSize:16,
            fontWeight: 500 
        },
        forgotPwd: {
            textAlign: 'right'
        },
        info: {
            background: '#fff4ba',
            color: '#222',
            padding: 10,
            fontSize: 14,
        },
        frmMsg: {
            color: '#990000',
            fontSize: 16,
        },
        success: {
            background: '#009900',
            padding: 10,
            borderRadius:5,
        },
        successMsg: {
            color: '#fff',
            marginBottom: 20,
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
                        <h4 style={styles.formTitle}>Reset Your Password</h4>
                        <DashLine  size={2} width={160} bottom = {20}/>
                    </div>

                    <div className='form-group input-group'>
                        <label style={styles.formLabel}>Email</label>
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                            <input type = "text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' placeholder='Enter email' />
                        </div>
                    </div>

                    {!success &&
                        <div style={styles.info} className='form-group'> An email containing your new password will be sent to you. Please enter the email used in opening Owenzone account.</div>
                    }

                    {frmMsg && <div style={styles.frmMsg} className='form-group'>{frmMsg}</div>}
                    {success && 
                        <div style={styles.success} className='form-group'>
                            <div style={styles.successMsg}>{successMsg}</div>
                            <Link to={"/login/get-in"} className='btn btn-warning btn-sm'>Continue</Link>
                        </div>
                    }

                    {!success && 
                        <div className='form-group'>
                            <button onClick={resetMessage} style={styles.FormBtn} disabled={posting} className='btn btn-primary'>
                                {posting?'Posting ...':'SUBMIT'}
                            </button>
                        </div>
                    }

                </div>

                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    )
    
}

export default ForgotPassword