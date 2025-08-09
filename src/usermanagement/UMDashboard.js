import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function UMDashboard() {

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
                            <h4 style={styles.pageTitle}>User List</h4>
                            <div style={styles.newBtn}>
                                <Link onClick={showNewUserModal} className='btn btn-primary btn-sm'>
                                    <FontAwesomeIcon icon={faPlus} /> New User
                                </Link>
                            </div>
                        </div>
                        
                        <UserList />
                    </div>
                </div>
            </div>

            <Modal show={newUserModal} onHide={closeNewUserModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title style={{fontSize:15}}>User</Modal.Title>
                    <button type="button" onClick={closeNewUserModal} className="close">&times;</button>
                </Modal.Header>
                <Modal.Body> 
                    <UserForm />
                </Modal.Body> 
            </Modal>
        </div>
    )
}

export default UMDashboard;