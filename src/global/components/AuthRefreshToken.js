import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { API_URL } from './Constants';

const AuthRefreshToken = () => {

    const [show, setShow] = useState(false);
    const session = localStorage.getItem("session");

    useEffect(() => {
        loadToken();
        
        const timeInterval = 1 * 60 * 1000;// Run every 5 min
        const intervalId = setInterval(() => {
            loadToken();
        }, timeInterval); 

        return () => clearInterval(intervalId);
    }, [session]);

    const showModal = () => {
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }

    const loadToken = async () => {
        try {
            closeModal();
            const response = await axios({
                method: "get",
                url: API_URL + 'user/new_token', 
                headers: {Authorization: `Bearer ${session}`},
                withCredentials: true
            });
            const obj = response.data;
            if(obj.Status == 'success'){
                localStorage.setItem("session", obj.Data);
                closeModal();
            }else if(obj.Status == 'expired'){
                //showModal();
            }
            setStatus("Refreshed");
        } catch (error) {}
    };

    const logout = ()=>{
        window.location = "/logout";
    }

    const styles = {
        container:{
            padding: 10
        },
        title:{
            marginBottom: 5,
            fontSize:20,
        },
        info:{
            marginBottom: 10,
            fontSize:15,
        }
    }

    return (
        <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Body>
                <div style={styles.container}>
                    <h4 style={styles.title}>Your Session Has Expired</h4>
                    <div style={styles.info}>Please click on conitue button to logout and login again.</div>
                    <button onClick={logout} className='btn btn-primary btn-sm'>Continue</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AuthRefreshToken;