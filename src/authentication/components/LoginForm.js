import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from '../../global/components/Constants';
import { isEmailUtil } from '../../utils/validationUtils';


function LoginForm({entry, successAction, updateFormType}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [frmMsg, setFrmMsg] = useState("");
    const [posting, setPosting] = useState(false);

    const postForm = ()=>{

        setFrmMsg("")

        if(email == ""){
            setFrmMsg("Please enter email address");
            return;
        }

        if(!isEmailUtil(email)){
            setFrmMsg("Please enter a valid email address");
            return;
        }

        if(password == ""){
            setFrmMsg("Please enter password");
            return;
        }

        setPosting(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('interest', entry);

        axios({
            method: "post",
            url: API_URL + "user/user_login",
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
                successAction(obj.Data);
            }else{
                setFrmMsg(obj.Message);
                setPosting(false)
            }
        })
        .catch(function (response) {
            setPosting(false)
        });
    }

    const styles = {
        form: {
            background: '#fff',
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
            fontWeight: 500,
            textDecoration: 'none'  
        },
        forgotPwd: {
            textAlign: 'right',
        },
        forgotPwdLink:{
            textDecoration: 'none' 
        },
        frmMsg: {
            color: '#990000',
            fontSize: 16,
        }
    }
    
    return (
        <div style = {styles.form}>
            <div className='form-group input-group'>
                <label style={styles.formLabel}>Email</label>
                    <div className='input-group'>
                        <div class="input-group-prepend">
                            <span class="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                        </div>
                    <input type = "text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' placeholder='Enter email' />
                </div>
            </div>
            <div className='form-group'>
                <label style={styles.formLabel}>Password</label>
                <div className='input-group'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    </div>
                    <input type = "password" value={password}  onChange={e => setPassword(e.target.value)} className='form-control'  placeholder='Enter password' />
                </div>
            </div>
            <div className='form-group'>
                <div style={styles.forgotPwd}>
                    <Link to = "/forgot-password" style={styles.forgotPwdLink}>Forgot password?</Link>
                </div>
            </div>

            <div style={styles.frmMsg} className='form-group'>{frmMsg}</div>

            <div className='form-group'>
                <button onClick={postForm} style={styles.FormBtn} disabled={posting} className='btn btn-primary'>
                    {posting?'Posting ...':'LOGIN'}
                </button>
            </div>

            <div className='form-group'>
                <Link onClick = {()=>{updateFormType("SIGN UP", "signup")}} style={styles.signUpLink}>Don't have an account? Sign up</Link>
            </div>
        </div>
    )
    
}

export default LoginForm