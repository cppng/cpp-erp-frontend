import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { API_URL } from './Constants';

const AuthLogout = () => {

    const [message, setMessage] = useState("");
    const session = localStorage.getItem("session");

    useEffect(() => {
        deleteDevice();
    }, []);

    function deleteDevice(){
        setMessage("Logout in process ....");
        axios({
          method: 'get',
          url: API_URL + `user/delete_user_device`,
          headers: {Authorization: `Bearer ${session}`},
          withCredentials: true
        }).then((respose)=>{
          const obj = respose.data;
          if(obj.Status == "success"){
            localStorage.removeItem("session");
            window.location = "/";
          }else{
            setMessage("Posting error!");
          }
        })
    }

    return (
        <div style={{marginTop:30,marginLeft:30}}>{message}</div>
    )
}

export default AuthLogout;