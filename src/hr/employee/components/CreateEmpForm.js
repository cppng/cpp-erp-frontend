import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from '../../../global/components/Constants';

function CreateEmpForm() {

    const [modal, setModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
    }, []);

    const showModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const saveForm = ()=>{

        setFrmMsg("");

        if(firstName == ""){
            setFrmMsg("Please enter first name");
            return;
        }

        if(middleName == ""){
            setFrmMsg("Please enter middle name");
            return;
        }

        if(lastName == ""){
            setFrmMsg("Please enter last name");
            return;
        }

        setPosting(true);

        const dataToSave = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
        }

        axios({
            method: "POST",
            url: API_URL + "hr/employee/create-new-employee",
            data: dataToSave,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            const obj = response.data;
            if(obj.success){
                window.location = `/hr/employee-form/${obj.data.slug}`;
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
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    return (
        <div> 

            <Link onClick={showModal} className='btn btn-primary btn-sm'>
                <FontAwesomeIcon icon={faPlus} /> New Employee
            </Link>

            <Modal show={modal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title style={{fontSize:15}}>New Employee</Modal.Title>
                    <button type="button" onClick={closeModal} className="close">&times;</button>
                </Modal.Header>
                <Modal.Body> 

                    <div className="form-group">
                        <label style={styles.label}>First Name</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control" placeholder="Enter first name" />
                    </div>

                    <div className="form-group">
                        <label style={styles.label}>Middle Name</label>
                        <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} className="form-control" placeholder="Enter middle name" />
                    </div>

                    <div className="form-group">
                        <label style={styles.label}>Last Name</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="form-control" placeholder="Enter last name" />
                    </div>

                    {frmMsg != "" && 
                        <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
                    }

                    <div className="form-group">
                        <button onClick={saveForm} className='btn btn-primary'>Save Form</button>
                    </div>

                </Modal.Body> 
            </Modal>

        </div>
    )
}

export default CreateEmpForm;