import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-bootstrap/Modal';
import { getEmployeeBySlug } from '../../utils/api-services/hr/employee';
import "../../global/components/scroll-bar.css";
import EmpBasicForm from './components/EmpBasicForm';
import EmpContactForm from './components/EmpContactForm';
import EmpNOKForm from './components/EmpNOKForm';
import EmpDetailsForm from './components/EmpDetailsForm';
import EmpSalaryForm from './components/EmpSalaryForm';
import EmpSalaryElemForm from './components/EmpSalaryElemForm';
import EmpStatutoryForm from './components/EmpStatutoryForm';
import EmpEduForm from './components/EmpEduForm';
import EmpWorkForm from './components/EmpWorkForm';
import EmpSkillForm from './components/EmpSkillForm';
import EmpLoginAccessForm from './components/EmpLoginAccessForm';

const tabs = [
    {Code: "Basic", Name: "PERSONAL INFO", Title: "Personal Information"},
    {Code: "Contact", Name: "CONTACT", Title: "Contact Information"},
    {Code: "NOK", Name: "NEXT OF KIN", Title: "Next of Kin Information"},
    {Code: "Employment", Name: "EMPLOYMENT", Title: "Employment Details"},
    {Code: "Salary", Name: "SALARY", Title: "Employee Salary"},
    {Code: "SalaryElements", Name: "BENEFITS / DEDUCTIONS", Title: "Benefits and Deductions"},
    {Code: "Statutory", Name: "STATUTORY", Title: "Tax & Statutory Information"},
    {Code: "Login", Name: "LOGIN ACCESS", Title: "User Login Access"},
    {Code: "Education", Name: "EDUCATION", Title: "Education and Qualifications"},
    {Code: "Work", Name: "WORK EXPERIENCE", Title: "Past Work Experiencies"},
    {Code: "Skill", Name: "SKILLS", Title: "Skills and Competencies"},
    {Code: "Document", Name: "DOCUMENTS", Title: "Employee Documents"}
]

function HrEmployeeForm() {

    const [empObj, setEmpObj] = useState(null);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [loading, setLoading] = useState(false);
    const isMobile = width <= 768;

    const { code } = useParams();

    useEffect(()=>{
        loadEmployee();
    }, []);
    
    const loadEmployee = async ()=>{
        setLoading(true);
        const obj = await getEmployeeBySlug(code);
        setEmpObj(obj);
        setLoading(false);
    }

    const updateTab = (itm) => {
        setSelectedTab(itm);
    }

    const styles = {
        page:{
            background: '#fff',
            minHeight: height,
            paddingTop: 40
        },
        pageHeader:{
            display: 'flex',
            marginBottom: 15,
        },
        newBtn:{
            marginLeft: 'auto',
            marginRight: 0,
        },
        pageTitle:{
            color: '#999',
            fontSize: 18
        },
        tabs:{
            wrap:{
                marginBottom: 40,
            },
            tabWrap:{
                display: 'flex',
                padding: '10px 0px',
                overflowY: 'scroll'
            },
            tab:{
                marginRight: 10,
                textDecoration: 'none',
                borderRadius: 30,
                whiteSpace: 'nowrap'
            },
            active:{
                background: '#3395ff',
                color: '#fff',
                marginRight: 10,
                textDecoration: 'none',
                borderRadius: 30,
                whiteSpace: 'nowrap'
            }
        },
        body:{
            wrap:{

            },
            title:{
                marginBottom: 20,
                fontSize: 26
            },
            form:{
    
            }
        }
        
    }

    return (
        <div style={styles.page}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>

                        <div style={styles.pageHeader}>
                            <h4 style={styles.pageTitle}>Employee Form</h4>
                        </div>

                        <div style={styles.tabs.wrap}>
                            <div style={styles.tabs.tabWrap} className='hide-scroll-bar'>
                                {tabs.map(itm => (
                                    <Link onClick = {()=>updateTab(itm)} style={selectedTab.Code == itm.Code? styles.tabs.active: styles.tabs.tab} className='btn btn-outline-primary'>
                                        {itm.Name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <hr />

                        <div style={styles.body.wrap}>

                            <h2 style={styles.body.title}>{selectedTab.Title}</h2>
                            {empObj &&
                                <div style={styles.body.form}>
                                    {(selectedTab.Code == "Basic") && <EmpBasicForm obj={empObj}/>}
                                    {(selectedTab.Code == "Contact") && <EmpContactForm obj={empObj} />}
                                    {(selectedTab.Code == "NOK") && <EmpNOKForm obj={empObj} />}
                                    {(selectedTab.Code == "Employment") && <EmpDetailsForm obj={empObj} />}
                                    {(selectedTab.Code == "Salary") && <EmpSalaryForm obj={empObj} />}
                                    {(selectedTab.Code == "SalaryElements") && <EmpSalaryElemForm slug={code} />}
                                    {(selectedTab.Code == "Statutory") && <EmpStatutoryForm obj={empObj} />}
                                    {(selectedTab.Code == "Login") && <EmpLoginAccessForm obj={empObj} />}
                                    {(selectedTab.Code == "Education") && <EmpEduForm obj={null} />}
                                    {(selectedTab.Code == "Work") && <EmpWorkForm obj={null} />}
                                    {(selectedTab.Code == "Skill") && <EmpSkillForm obj={null} />}
                                </div>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default HrEmployeeForm;