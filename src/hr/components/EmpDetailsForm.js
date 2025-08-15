import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../global/components/Constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { empDetailsUpdate } from '../../utils/api-services/hr/employee';
import { ToastContainer, toast } from 'react-toastify';

function EmpDetailsForm({obj}) {

    const [code, setCode] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [organization, setOrganization] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [joinedDate, setJoinedDate] = useState();
    const [probationEndDate, setProbationEndDate] = useState("");
    const [contractStartDate, setContractStartDate] = useState("");
    const [contractEndDate, setContractEndDate] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [grade, setGrade] = useState("");
    const [category, setCategory] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        presetForm();
    }, []);

    function presetForm(){
        if(obj != null){

            const jDate = (obj.joinedDate!="")? fdt(obj.joinedDate): "";
            const probDate = (obj.probationEndDate!="")? fdt(obj.probationEndDate): "";
            const contSDate = (obj.contractStartDate!="")? fdt(obj.contractStartDate): "";
            const contEDate = (obj.contractEndDate!="")? fdt(obj.contractEndDate): "";

            setCode(obj.EmploymentId);
            setJobTitle(obj.jobTitle);
            setOrganization(obj.organization);
            setDepartment(obj.department);
            setLocation(obj.location);
            setEmploymentType(obj.employmentType);
            setEmploymentStatus(obj.employmentStatus);
            setJoinedDate(jDate);
            setProbationEndDate(probDate);
            setContractStartDate(contSDate);
            setContractEndDate(contEDate);
            setSupervisor(obj.supervisor);
            setGrade(obj.grade);
            setCategory(obj.category);
        }
    }

    function fdt(inDt){
        const dt = inDt.split("T")[0];
        const dts = dt.split("-");
        const dto = new Date(dts[2], dts[1], dts[0]);
        console.log("dd", dto)
        return dto;
    }

    const saveForm = async ()=>{
        setFrmMsg("");
        
        setPosting(true);
        
        const dataToSave = {
            Slug: obj.slug,
            EmploymentId: code,
            JobTitle: jobTitle,
            Organization: organization,
            Department: department,
            Location: location,
            EmploymentType: employmentType,
            EmploymentStatus: employmentStatus,
            JoinedDate: joinedDate,
            ProbationEndDate: probationEndDate,
            ContractStartDate: contractStartDate,
            ContractEndDate: contractEndDate,
            Supervisor: supervisor,
            Grade: grade,
            Category: category,
        }
        
        const res = await empDetailsUpdate(dataToSave);
        if(res.success){
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

    return (
        <div> 

            <div className="form-group">
                <label style={styles.label}>Employee ID</label>
                <input type="text" value={code} onChange={e => setCode(e.target.value)} className="form-control" placeholder="Enter employee ID / Code" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Job Title</label>
                <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="form-control" placeholder="Enter job title" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Organization Unit</label>
                <select value={organization} onChange={e => setOrganization(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"CPP"}>CPP</option>
                    <option key={2} value={"FC"}>FC</option>
                    <option key={2} value={"DAGOMO"}>DAGOMO</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Department</label>
                <select value={department} onChange={e => setDepartment(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"IT"}>IT</option>
                    <option key={2} value={"Sales"}>Sales</option>
                    <option key={2} value={"Marketing"}>Marketing</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Location</label>
                <select value={location} onChange={e => setLocation(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Lagos"}>Lagos</option>
                    <option key={2} value={"Abuja"}>Abuja</option>
                    <option key={3} value={"Edo"}>Edo</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Employment Type</label>
                <select value={employmentType} onChange={e => setEmploymentType(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Full-time"}>Full-time</option>
                    <option key={2} value={"Part-time"}>Part-time</option>
                    <option key={3} value={"Contract"}>Contract</option>
                    <option key={4} value={"Intern"}>Intern</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Employment Status</label>
                <select value={employmentStatus} onChange={e => setEmploymentStatus(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Active"}>Active</option>
                    <option key={2} value={"On Leave"}>On Leave</option>
                    <option key={3} value={"Terminated"}>Terminated</option>
                </select>
            </div>

            <div className="form-group">
                <label style={styles.label}>Joined Date</label><br />
                <DatePicker selected={joinedDate} onChange={(date) => setJoinedDate(date)} className="form-control" placeholder="Enter joined date" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Probation End Date</label><br />
                <DatePicker selected={probationEndDate} onChange={(date) => setProbationEndDate(date)} className="form-control" placeholder="Enter joined date" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Contract Start Date</label><br />
                <DatePicker selected={contractStartDate} onChange={(date) => setContractStartDate(date)} className="form-control" placeholder="Enter joined date" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Contract End Date</label><br />
                <DatePicker selected={contractEndDate} onChange={(date) => setContractEndDate(date)} className="form-control" placeholder="Enter joined date" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Supervisor / Manager</label>
                <input type="text" value={supervisor} onChange={e => setSupervisor(e.target.value)} className="form-control" placeholder="Enter supervisor" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Grade / Level</label>
                <input type="text" value={grade} onChange={e => setGrade(e.target.value)} className="form-control" placeholder="Enter grade / level" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Employment Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="form-control">
                    <option key={0} value={""}>- Select -</option>
                    <option key={1} value={"Staff"}>Staff</option>
                    <option key={2} value={"Management"}>Management</option>
                    <option key={3} value={"Executive"}>Executive</option>
                </select>
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary' disabled={posting?"disabled":""}>
                    {posting?"Saving...": "Save Form"}
                </button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default EmpDetailsForm;