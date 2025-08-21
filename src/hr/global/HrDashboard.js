import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateEmpForm from '../employee/components/CreateEmpForm';
import EmployeeList from '../employee/components/EmployeeList';

function HrDashboard() {

    const [newUserModal, setNewUserModal] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const isMobile = width <= 768;

    const showNewUserModal = () => {
        setNewUserModal(true);
    }

    const closeNewUserModal = () => {
        setNewUserModal(false);
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
            fontSize: 18
        }
    }

    return (
        <div style={styles.page}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>

                        <div style={styles.pageHeader}>
                            <h4 style={styles.pageTitle}>Employee List</h4>
                            <div style={styles.newBtn}>
                                <CreateEmpForm />
                            </div>
                        </div>
                        
                        <EmployeeList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HrDashboard;