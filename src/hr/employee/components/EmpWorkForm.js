import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { API_URL } from '../../../global/components/Constants';
import Editor from 'react-simple-wysiwyg';
import { experienceLevelUtil, jobTypesUtil, workModeUtil } from '../../../utils/lookupUtils';
import DateControl from '../../../global/components/DateControl';
import { ToastContainer, toast } from 'react-toastify';

function EmpWorkForm({obj}) {

    const [formId, setFormId] = useState("0");
    const [works, setWorks] = useState([]);
    const [modal, setModal] = useState(false);
    const [employer, setEmployer] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobMode, setJobMode] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState({day:"", month:"", year:""});
    const [end, setEnd] = useState({day:"", month:"", year:""});
    const [ongoing, setOngoing] = useState(false);
    const [description, setDescription] = useState("");
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

    const handleDescription = (e)=>{
        setDescription(e.target.value)
    }

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
                    <label style={styles.form.label}>Employer</label>
                    <input type='text' value={employer} onChange={e => setEmployer(e.target.value)} style={styles.titleInput} className="form-control form-control-sm" placeholder='Enter employer' />                
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Title</label>
                    <input type='text' value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={styles.titleInput} className="form-control form-control-sm" placeholder='Enter job title' />                
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Level</label>
                    <select value={jobLevel} onChange={e => setJobLevel(e.target.value)} style={styles.input} className="form-control form-control-sm">
                        <option key={-1} value=''>- Select -</option>
                        {experienceLevelUtil.map((itm, i) => (
                            <option key={i} value={itm.Code}>{itm.Name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Type</label>
                    <select value={jobType} onChange={e => setJobType(e.target.value)} style={styles.input} className="form-control form-control-sm">
                        <option key={-1} value=''>- Select -</option>
                        {jobTypesUtil.map((itm, i) => (
                            <option key={i} value={itm.Code}>{itm.Name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Mode</label>
                    <select value={jobMode} onChange={e => setJobMode(e.target.value)} style={styles.input} className="form-control form-control-sm">
                        <option key={-1} value=''>- Select -</option>
                        {workModeUtil.map((itm, i) => (
                            <option key={i} value={itm.Code}>{itm.Name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Location</label>
                    <input type='text' value={location} onChange={e => setLocation(e.target.value)} style={styles.titleInput} className="form-control form-control-sm" placeholder='State, Country' />                
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Start Date</label>
                    <DateControl date = {start} setDate = {setStart} show = {{day:false, month:true, year:true}} />               
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>End Date</label>
                    <DateControl date = {end} setDate = {setEnd} show = {{day:false, month:true, year:true}} />              
                </div>

                <div className='col-12 col-md-12 form-group'>
                    <label style={styles.form.label}>
                        <input type="checkbox" checked={ongoing} onChange={handleOngoing} /> I currently work here
                    </label>             
                </div>

                <div className='form-group'>
                    <label style={styles.form.label}>Job Responsibilities</label>
                    <Editor 
                        containerProps={{ style: { minHeight: 300 } }}
                        value={description}
                        onChange={handleDescription}
                    />              
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

export default EmpWorkForm;