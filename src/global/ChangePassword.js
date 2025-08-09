import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import AuthRefreshToken from './components/AuthRefreshToken';
import { API_URL } from './components/Constants';

const ChangePassword = () => {

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [posting, setPosting] = useState(false);

  const session = localStorage.getItem("session");

  useEffect(()=>{
    window.scrollTo(0, 0); 
  }, [])

  const changePassword = ()=>{

    if(oldPwd == ""){
      setErrorMsg("Please enter your current password");
      return;
    }

    if(newPwd == ""){
      setErrorMsg("Please enter new password");
      return;
    }

    if(confirmPwd == ""){
      setErrorMsg("Please enter confirm new password");
      return;
    }
    
    if(newPwd != confirmPwd){
      setErrorMsg("New password and confirm password did not match");
      return;
    }

    setPosting(true);
    
    const formData = new FormData();
    formData.append('oldPwd', oldPwd);
    formData.append('newPwd', newPwd);

    axios({
      method: "post",
      url: API_URL + "user/change_password",
      data: formData,
      headers: { Authorization: `Bearer ${session}`, "Content-Type": "multipart/form-data" },
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      withCredentials: true
    })
    .then(function (response) {
      const obj = response.data;
      if(obj.Status == "success"){
        clearForm();
        window.location = "/logout";
      }else{
        setErrorMsg(obj.Message);
        setPosting(false);
      }
    })
    .catch(function (response) {
      setErrorMsg("Posting Error!")
      setPosting(false)
    });
  }

  function clearForm(){
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
  }

  const styles = {
    pageTitleWrap: {
      background: '#fff',
      marginTop:30,
      marginBottom:30,
      padding:10,
      paddingLeft:20,
      borderRadius:5,
      boxShadow: '0px 1px 1px #cccccc'
    },
    pageTitle: {
      fontSize: 20
    },
    columns: {
      background: '#fff',
      marginTop:30,
      marginBottom:50,
      padding:10,
      paddingLeft:20,
      borderRadius:5,
      boxShadow: '0px 1px 1px #cccccc'
    },
    errorMsg: {
      color: '#990000',
      fontSize: 16,
    },
  }

  return (
    <div className='container'>

      <AuthRefreshToken />

      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>

          <div style={styles.pageTitleWrap}>
            <h4 style={styles.pageTitle}>Change Password</h4>
          </div>

          <div style={styles.columns}>

            <div className="form-group">
              <label>Current Password</label>
              <input type='password' value={oldPwd} onChange={e => setOldPwd(e.target.value)} className="form-control" placeholder="Enter current password" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type='password' value={newPwd} onChange={e => setNewPwd(e.target.value)} className="form-control" placeholder="Enter new password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type='password' value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} className="form-control" placeholder="Enter confirm password" />
            </div>

            <div style={styles.errorMsg} className='form-group'>{errorMsg}</div>

              <div className="form-group">
                <button onClick = {changePassword} disabled={posting} className="btn btn-primary">
                  {posting?'Posting ...':'Save'}
                </button>
              </div> 

            </div>

        </div>
        <div className='col-md-3'></div>
      </div>

    </div>
  )
}

export default ChangePassword