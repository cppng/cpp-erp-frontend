import React, {useState, useEffect, useRef} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { empStatutoryUpdate } from '../../utils/api-services/hr/employee';

function EmpStatutoryForm({obj}) {

    const [tin, setTin] = useState("");
    const [pfa, setPfa] = useState("");
    const [pensionNo, setPensionNo] = useState("");
    const [nhf, setNhf] = useState("");
    const [nsitf, setNsitf] = useState("");
    const [nhis, setNhis] = useState("");
    const [posting, setPosting] = useState(false);
    const [frmMsg, setFrmMsg] = useState("");

    useEffect(()=>{
        presetForm();
    }, []);

    function presetForm(){
        if(obj != null){
            setTin(obj.tin);
            setPfa(obj.pfa);
            setPensionNo(obj.pensionNo);
            setNhf(obj.nhf);
            setNsitf(obj.nsitf);
            setNhis(obj.nhis);
        }
    }

    const saveForm = async ()=>{
    
        setPosting(true);
    
        const dataToSave = {
            Slug: obj.slug,
            Tin: tin,
            Pfa: pfa,
            PensionNo: pensionNo,
            Nhf: nhf,
            Nsitf: nsitf,
            Nhis: nhis
        }
    
        const res = await empStatutoryUpdate(dataToSave);
    
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

    return (
        <div> 

            <div className="form-group">
                <label style={styles.label}>TIN</label>
                <input type="text" value={tin} onChange={e => setTin(e.target.value)} className="form-control" placeholder="Enter tax identification number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>PFA</label>
                <input type="text" value={pfa} onChange={e => setPfa(e.target.value)} className="form-control" placeholder="Enter pension fund administrator" />
            </div>

            <div className="form-group">
                <label style={styles.label}>Pension Number</label>
                <input type="text" value={pensionNo} onChange={e => setPensionNo(e.target.value)} className="form-control" placeholder="Enter pension number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>NHF</label>
                <input type="text" value={nhf} onChange={e => setNhf(e.target.value)} className="form-control" placeholder="Enter NHF number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>NSITF</label>
                <input type="text" value={nsitf} onChange={e => setNsitf(e.target.value)} className="form-control" placeholder="Enter NSITF number" />
            </div>

            <div className="form-group">
                <label style={styles.label}>NHIS</label>
                <input type="text" value={nhis} onChange={e => setNhis(e.target.value)} className="form-control" placeholder="Enter NHIS number" />
            </div>

            {frmMsg != "" && 
                <div style={styles.errorMsg} className="form-group">{frmMsg}</div>
            }

            <div className="form-group">
                <button onClick={saveForm} className='btn btn-primary'>Save Form</button>
            </div>
        </div>
    )
}

export default EmpStatutoryForm;