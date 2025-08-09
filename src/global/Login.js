import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from './components/Constants';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [frmMsg, setFrmMsg] = useState("");
    const [posting, setPosting] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 768;

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])

    const postForm = ()=>{

        setFrmMsg("");

        if(email == ""){
            setFrmMsg("Please enter username");
            return;
        }

        if(password == ""){
            setFrmMsg("Please enter password");
            return;
        }

        setPosting(true);

        const dataToSave = {
            clientId: email,
            clientSecrete: password,
            deviceId: "",
            deviceModel: "",
            deviceOs: "",
            deviceName: "",
            deviceType: ""
        }

        axios({
            method: "POST",
            url: API_URL + "user/login",
            data: dataToSave,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            const obj = response.data;
            console.log(obj)
            if(obj.success){
                localStorage.setItem("session", JSON.stringify(obj.data));
                window.location = "/dashboard"
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
            background: '#fff',
            display: 'flex'
        },
        form: {
            flex: 1,
            paddingTop: isMobile? 60: 100,
            paddingLeft: isMobile? 20: 100,
            paddingRight: isMobile? 20: 100,
            marginBottom:100,
        },
        brand:{
            marginBottom: 30,
            textAlign: 'center',
        },
        brandImage:{
            width: 60
        },
        imageWrap: {
            flex: 1,
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
        img:{
            width: '100%'
        },
        frmMsg: {
            color: '#990000',
            fontSize: 16,
        }
    }
    
    return (
        <section style={styles.page}>
            <div style = {styles.form}>

                        <div style={styles.formHeader}>
                            <div style={styles.brand}>
                                <img src='/images/logo.png' style={styles.brandImage} />
                            </div>
                            <h4 style={styles.formTitle}>User Login</h4>
                        </div>

                        <div className='form-group input-group'>
                            <label style={styles.formLabel}>Username</label>
                            <div className='input-group'>
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                                </div>
                                <input type = "text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' placeholder='Enter username' />
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
                            <Link to = "/forgot-password">Forgot password?</Link>
                            </div>
                        </div>

                        <div style={styles.frmMsg} className='form-group'>{frmMsg}</div>

                        <div className='form-group'>
                            <button onClick={postForm} style={styles.FormBtn} disabled={posting} className='btn btn-primary'>
                                {posting?'Posting ...':'LOGIN'}
                            </button>
                        </div>

                        <div className='form-group'>
                            {/*<Link to = {`/signup/${entry}`} style={styles.signUpLink}>Don't have an account?, Sign up</Link>*/}
                        </div>
            </div>
            {!isMobile &&
                <div style={styles.imageWrap}>
                    <img src = "/images/login-page-image.png" style={styles.img} />
                </div>
            }
        </section>
    )
    
}

export default Login