import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Confirm = ({params}) => {

    function takeAction(){
        params.action();
        closeModal();
    }

    const closeModal = ()=>{
        params.setConfirm(false);
    }

    const styles = {
        confirm: {
            background: '#fff',
            marginBottom:50,
            padding:10,
            paddingLeft:20,
            borderRadius:5,
            boxShadow: '0px 1px 1px #cccccc'
        },
        btns: {
            textAlign: 'right'
        },
        btn: {
            width: 60,
            marginRight: 10,
        }
    }

    return (
        <Modal size='sm' show={params.confirm} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Body>  
                <h4>{params.title}</h4>
                <p>{params.info}</p>
                <div style={styles.btns}>
                    <button onClick={closeModal} style={styles.btn} className='btn btn-sm btn-danger'>NO</button>
                    <button onClick={()=>{takeAction()}} style={styles.btn} className='btn btn-sm btn-success'>YES</button>
                </div>
            </Modal.Body> 
        </Modal>
    )
}

export default Confirm