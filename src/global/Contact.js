import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from './components/Constants';

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [posting, setPosting] = useState(false);

  const session = localStorage.getItem("session");
  const params = new URLSearchParams(window.location.search);
  const typeUrlQuery = params.get("type");
  const itemUrlQuery = params.get("item");

  useEffect(()=>{
    window.scrollTo(0, 0); 
    if(session){
      loadUser();
    }
  }, [])

  function loadUser(){

    setLoading(true)

    axios({
        method: 'get',
        url: API_URL + `user/user`,
        headers: { Authorization: `Bearer ${session}` },
        withCredentials: true
    }).then((respose)=>{
      const obj = respose.data;
      if(obj.Status == "success"){
        setName(obj.Data.Name);
        setEmail(obj.Data.Email);
        setPhone(obj.Data.Phone);
      }
      setLoading(false);
    })

  }

  const saveContact = ()=>{

    setErrorMsg(""); setSuccessMsg("");

    if(name == ""){
      setErrorMsg("Please enter name");
      return;
    }

    if(email == ""){
      setErrorMsg("Please enter email address");
      return;
    }

    if(phone == ""){
      setErrorMsg("Please enter phone number");
      return;
    }

    if(message == ""){
      setErrorMsg("Please enter message");
      return;
    }

    setPosting(true);

    const formData = new FormData();
    formData.append('type', typeUrlQuery);
    formData.append('item', itemUrlQuery);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    axios({
        method: "post",
        url: API_URL + "user/save_user_contact",
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
          setMessage("");
          setSuccessMsg(obj.Message);
        }else{
          setErrorMsg(obj.Message);
        }
        setPosting(false);
    })
    .catch(function (response) {
      setErrorMsg("Posting Error!");
      setPosting(false)
    });
  }

  const styles = {
    contact: {
      background: '#fff',
      marginTop:30,
      marginBottom:30,
      padding:10,
      paddingLeft:20,
      borderRadius:5,
      boxShadow: '0px 1px 1px #cccccc'
    },
    contactTitle: {
      fontSize: 30
    },
    contactPhone: {
      fontSize: 16
    },
    contactEmail: {
      fontSize: 16
    },
    message: {
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
    successMsg: {
      color: '#009900',
      fontSize: 16,
    }
  }

  const authParams = {
    title: "LOGIN",
    formType:"login", 
    entryPage:"Contact", 
    toPage: `/contact?type=${typeUrlQuery}&item=${itemUrlQuery}`, 
    customBtn: null,
    btn:{
        label:"Send Us a Message", 
        type: "btn-primary",
        size:"btn-md", 
        style: {
            width: 200,
            borderRadius:30,
            boxShadow: '0px 0px 5px #999'
        } 
    }
  }

  let messageHTML = "";
  if(session){
    messageHTML = (
      <div>

        <div className='row'>
          <div className='col-md-4 form-group'>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className='form-control' placeholder='Enter name' />
          </div>

          <div className='col-md-4 form-group'>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className='form-control' placeholder='Enter email'/>
          </div>

          <div className='col-md-4 form-group'>
            <label>Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className='form-control' placeholder='Enter phone number' />
          </div>
        </div>

        <div className='form-group'>
          <label>Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} className='form-control' placeholder='Enter message' style={{height:200}}></textarea>
        </div>

        <div style={styles.errorMsg} className='form-group'>{errorMsg}</div>
        <div style={styles.successMsg} className='form-group'>{successMsg}</div>

        <div className='form-group'>
          <button onClick = {saveContact} disabled={posting} className='btn btn-primary'>
            {posting?'Posting ...':'Submit'}
          </button>
        </div>

      </div>
    )
  }else{
    messageHTML = (
      <div><Auth params={authParams} /></div>
    )
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>

          <div style={styles.contact}>
            <h2 style={styles.contactTitle}>Contact Us</h2>
            <div style={styles.contactPhone}>+234 7032813326</div>
            <div style={styles.contactEmail}>support@owenzone.com</div>
          </div>

          <div style={styles.message}>
            {messageHTML}
          </div>

        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  )
}

export default Contact