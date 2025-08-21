import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getEmpPayElemList, empSavePayElem } from '../../../utils/api-services/hr/employee';
import EmpSalaryElemItem from './EmpSalaryElemItem';
import { ToastContainer, toast } from 'react-toastify';

function EmpSalaryElemForm({slug}) {

    const [formId, setFormId] = useState("0");
    const [elements, setElements] = useState([]);
    const [modal, setModal] = useState(false);
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        loadElements();
    }, []);

    const loadElements = async ()=>{
        setLoading(true);
        const data = await getEmpPayElemList({Slug: slug});
        setElements(data);
        setLoading(false);
    }

    const showModal = ()=> {
        setModal(true);
    }

    const closeModal = ()=>{
        setModal(false);
    }

    const saveForm = async ()=>{
        setFrmMsg("");
    
        if(type == ""){
            setFrmMsg("Please select type");
            return;
        }
    
        if(name == ""){
            setFrmMsg("Please enter name");
            return;
        }

        if(amount == ""){
            setFrmMsg("Please enter amount");
            return;
        }
    
        setPosting(true);
    
        const dataToSave = {
            Id: formId,
            EmployeeSlug: slug,
            EntryType: type,
            ElementCode: "",
            Name: name,
            Amount: amount
        }
    
        const obj = await empSavePayElem(dataToSave);
        if(obj.success){
            loadElements();
            closeModal();
            toast("Updated successfully", {type: "success"});
        }else{
            toast("Failed to update record", {type: "error",});
        }
    
        setPosting(false);
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

    const itemParams = {
        showModal: showModal,
        setFormId: setFormId,
        setType: setType,
        setName: setName,
        setAmount: setAmount
    }

    const form = (
        <Modal show={modal} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title style={{fontSize:15}}>Form</Modal.Title>
                <button type="button" onClick={closeModal} className="close">&times;</button>
            </Modal.Header>
            <Modal.Body>  

                <div className="form-group">
                    <label style={styles.label}>Type</label>
                    <select value={type} onChange={e => setType(e.target.value)} className="form-control">
                        <option key={0} value={""}>- Select -</option>
                        <option key={1} value={"Benefit"}>Benefit</option>
                        <option key={2} value={"Deduction"}>Deduction</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={styles.label}>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label style={styles.label}>Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="form-control" placeholder="Enter amount" />
                </div>

                {frmMsg != "" && 
                    <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
                }

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary' disabled={posting?"disabled":""}>
                    {posting? "Saving...": "Save Form"}
                </button>
            </div>

            </Modal.Body> 
        </Modal>
    )

    return (
        <div> 

            <div>
                {elements.map((itm, index) => (
                    <EmpSalaryElemItem key={index} obj={itm} params={itemParams} />
                ))}
            </div>

            <div className="form-group">
                <button onClick={showModal} style={styles.addBth} className='btn btn-outline-primary'>
                    <FontAwesomeIcon icon={faPlus} /> Add Item
                </button>
            </div>

            {form}

            <ToastContainer />
        </div>
    )
}

export default EmpSalaryElemForm;