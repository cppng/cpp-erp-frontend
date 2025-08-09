import React, {useState, useEffect} from 'react'
import { faEnvelope, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const ContactCard = () => {

    const styles = {
        contact: {
            background: '#fff',
            marginBottom:50,
            padding:10,
            paddingLeft:20,
            borderRadius:5,
            boxShadow: '0px 1px 1px #cccccc'
        },
        contactIcon: {
            color: '#00A924',
            fontSize: 36,
        },
        contactInfo: {
            paddingRight: 10,
            fontSize: 16,
            fontWeight: 400
        },
    }

    return (
        <div style={styles.contact}>
            <div className='row'>
                <div className='col-2 col-md-1'>
                    <FontAwesomeIcon icon={faEnvelope} style = {styles.contactIcon} /> 
                </div>
                <div className='col-9 col-md-10'>
                    <span style={styles.contactInfo}>Any issues? Please contact support for help.</span>
                    <Link to = "/contact?type=lead&item=">Contact</Link> 
                </div>
            </div>
        </div>
    )
}

export default ContactCard