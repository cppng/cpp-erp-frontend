import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { API_URL } from '../../../global/components/Constants';
import { qualificationUtil } from '../../../utils/lookupUtils';
import DateControl from '../../../global/components/DateControl';
import { ToastContainer, toast } from 'react-toastify';

function EmpSkillForm({obj}) {

    const [formId, setFormId] = useState("0");
    const [skills, setSkills] = useState([]);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
    }, []);

    const showModal = ()=> {
        setModal(true);
    }

    const closeModal = ()=>{
        setModal(false);
    }

    const handleOngoing = (event) => {
        setOngoing(event.target.checked);
    };

    const saveForm = ()=>{

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
        addBth:{
            width: 120,
            borderRadius: 30
        },
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    const form = (
        <Modal show={modal} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title style={{fontSize:15}}>Form</Modal.Title>
                <button type="button" onClick={closeModal} className="close">&times;</button>
            </Modal.Header>
            <Modal.Body>  
                
                <div className='form-group'>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} style={styles.titleInput} className="form-control" placeholder='Enter skill' />                
                </div>

                {frmMsg != "" && 
                    <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
                }

                <div className="form-group">
                    <button onClick={saveForm} className='btn btn-primary'>Save</button>
                </div>
            </Modal.Body> 
        </Modal>
    )

    return (
        <div> 
            <div className="form-group">
                <button onClick={showModal} style={styles.addBth} className='btn btn-outline-primary'>
                    <FontAwesomeIcon icon={faPlus} /> Add Item
                </button>
            </div>
            {form}
        </div>
    )
}

export default EmpSkillForm;