import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../global/components/Constants';
import { parsePhotoUtil } from '../../utils/photoUtils';
import { empBasicUpdate } from '../../utils/api-services/hr/employee';

function EmpBasicForm({obj}) {

    const [photo, setPhoto] = useState({Data:"", Selected:false});
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [religion, setReligion] = useState("");
    const [taxId, setTaxId] = useState("");
    const [passport, setPassport] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        presetForm();
    }, []);

    function presetForm(){
        if(obj != null){
            setPhoto({Data:obj.photo, Selected:false});
            setTitle(obj.title);
            setFirstName(obj.firstName);
            setMiddleName(obj.middleName);
            setLastName(obj.lastName);
            setGender(obj.gender);
            setMaritalStatus(obj.maritalStatus);
            setReligion(obj.religion);
            setTaxId(obj.taxId);
            setPassport(obj.passportNo);
        }
    }

    const photoElem = useRef();
    
    const width = 300;
    const height = 300;

    const selectPhoto = ()=>{
        photoElem.current.click();
    }
            
    const handlePhotoChange = (event) => {
        let files = event.target.files;
        const params = {
            file: files[0],
            width: width, 
            height: height,
            setPhoto: setPhoto, 
            setMessage: setFrmMsg
        }
        parsePhotoUtil(params);
    }

    const saveForm = async ()=>{

        setFrmMsg("");

        if(firstName == ""){
            setFrmMsg("Please enter first name");
            return;
        }

        if(lastName == ""){
            setFrmMsg("Please enter last name");
            return;
        }

        setPosting(true);

        const dataToSave = {
            Slug: obj.slug,
            Title: title,
            FirstName: firstName,
            MiddleName: middleName,
            LastName: lastName,
            Gender: gender,
            MaritalStatus: maritalStatus,
            Religion: religion,
            TaxIdNo: taxId,
            PassportNo: passport,
        }

        const res = await empBasicUpdate(dataToSave);

        setPosting(true);
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
        photo:{
            preview:{
                width: 100,
                marginBottom: 10,
                borderRadius: 5
            },
            img:{
                width: 100,
                borderRadius: 5
            },
            info:{
                color: '#666',
                fontSize: 15
            },
            display:{
                width: 100,
                borderRadius: 5
            },
            input: {
                display: 'none'
            },
        },
        errorMsg: {
            color: '#990000',
            fontSize: 16,
        },
    }

    const photoForm = (
        <div>
            {(photo.Data != "") &&
                <div style={styles.photo.preview}>
                    <img 
                        src = {photo.Selected? photo.Data: `${API_URL}/uploads/profile/photo/${photo.Data}`} 
                        style={styles.photo.img} 
                    />
                </div>
            }
        
            <div style = {styles.selectBtnWrap}>
                <Link onClick={selectPhoto} style = {styles.selectBtn}>Select Photo</Link>
            </div>
            <div style={styles.photo.info}>{`Photo dimension should be ${width} x ${height} pixels or more`}</div>
            <input type="file" ref={photoElem} onChange={handlePhotoChange} style = {styles.photo.input} />
        </div>
    )

    return (
        <div> 

            <div className="form-group">
                {photoForm}
            </div>
                        
            <div className="form-group">
                <label style={styles.label}>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" placeholder="Enter title" />
            </div>

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

            <div className="form-group">
                <label style={styles.label}>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Male"}>Male</option>
                    <option key={2} value={"Female"}>Female</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Marital Status</label>
                <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Male"}>Single</option>
                    <option key={2} value={"Female"}>Married</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Religion</label>
                <input type="text" value={religion} onChange={e => setReligion(e.target.value)} className="form-control" placeholder="Enter Employee Religion" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Tax Identification No.</label>
                <input type="text" value={taxId} onChange={e => setTaxId(e.target.value)} className="form-control" placeholder="Enter tax identification number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Passport No.</label>
                <input type="text" value={passport} onChange={e => setPassport(e.target.value)} className="form-control" placeholder="Enter passport number" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <hr />

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary'>Save Form</button>
            </div>
        </div>
    )
}

export default EmpBasicForm;