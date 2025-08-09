import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

/**
 * params: {authType:"login", entryPage:"Home", toPage: "dashboard", btn:{label:"Get Started", size:"md", style: {...} }}
 */

function Auth({params}) {
    const [title, setTitle] = useState(params.title);
    const [formType, setFormType] = useState(params.formType);
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }

    function successAction(data){
        localStorage.setItem("session", data);
        window.location = params.toPage;
    }

    function updateFormType(title, type){
        setTitle(title);
        setFormType(type);
    }

    return (
        <>
            {(params.customBtn)?
                <Link onClick={showModal} style={{textDecoration: 'none'}}>{params.btn}</Link>:
                <Link onClick={showModal} className={`btn ${params.btn.type} ${params.btn.size}`} style={params.btn.style}>{params.btn.label}</Link>
            }

            <Modal size="md" show={show} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title style={{fontSize:18}}>{title}</Modal.Title>
                    <button type="button" onClick={closeModal} className="close">&times;</button>
                </Modal.Header>
                <Modal.Body>
                    {(formType == "login") && <LoginForm entry={params.entryPage} successAction={successAction} updateFormType={updateFormType} />}
                    {(formType == "signup") && <SignUpForm entry={params.entryPage} successAction={successAction} updateFormType={updateFormType} />}
                </Modal.Body>
            </Modal>
        </>
        
    )
}

export default Auth;