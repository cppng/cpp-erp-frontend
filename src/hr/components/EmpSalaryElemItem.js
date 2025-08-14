import React, {useState, useEffect, useRef} from 'react';
import { faEllipsisV  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function EmpSalaryElemItem({obj, params}) {

    const [hover, setHover] = useState(false);

    useEffect(()=>{
    }, []);

    function startEdit(){
        params.showModal();
        params.setFormId(obj.id);
        params.setType(obj.entryType);
        params.setName(obj.name);
        params.setAmount(obj.amount);
    }

    function confirmDelete(){

    }

    function handleHover(state){
        setHover(state);
    };

    const styles = {
        item:{
            marginBottom: 20,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            position: 'relative'
        },
        title: {
            color: '#666',
            fontSize: 14,
            fontWeight: 600
        },
        info: {
            color: '#666',
            fontSize: 14,
        },
        actions: {
            container: {
                position: 'absolute',
                top: 3,
                right: 3
            },
            btn:{
                color: hover?'#00667d':'#888',
                background: hover?'#efefef':'#fff',
                padding: '3px 10px',
                border: 'none',
                borderRadius: 3,
                fontSize: 15,
                outline: 'none',
                boxShadow: 'none',
                transition: 'none',
            },
            option:{
                fontSize: 14,
            },
            optionRed:{
                color: '#ff6d6d',
                fontSize: 14,
            },
        },
    }

    function actions(){
        return(
            <div class="dropdown">
                <button type="button" data-toggle="dropdown" style={styles.actions.btn} onMouseEnter={()=>handleHover(true)} onMouseLeave={()=>handleHover(false)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <Link onClick={()=>{startEdit()}} class="dropdown-item" style={styles.actions.option}>
                        Edit
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link onClick={()=>{confirmDelete()}} class="dropdown-item" style={styles.actions.optionRed}>
                        Delete
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.item}> 
            <div style={styles.actions.container}>{actions()}</div>
            <h4 style={styles.title}>{obj.name}</h4>
            <div style={styles.info}>{obj.entryType} | {obj.amount}</div>
        </div>
    )
}

export default EmpSalaryElemItem;