import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { empSavePayElem } from '../../utils/api-services/hr/employee';

function EmpSalaryElemItem({obj, params}) {

    useEffect(()=>{
    }, []);

    const styles = {
        item:{
            marginBottom: 20,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5
        },
        title: {
            color: '#666',
            fontSize: 14,
            fontWeight: 600
        },
        info: {
            color: '#666',
            fontSize: 14,
        }
    }

    return (
        <div style={styles.item}> 
            <h4 style={styles.title}>{obj.name}</h4>
            <div style={styles.info}>{obj.entryType} | {obj.amount}</div>
        </div>
    )
}

export default EmpSalaryElemItem;