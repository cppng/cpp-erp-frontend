import React, {useState} from 'react'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';


function InstructorActor({photo, name, desc, device}) {

    const styles = {
        instructorActor:{
            background: '#fff',
            marginBottom: 10,
            padding: 10,
            boxShadow: '0px 1px 5px #cccccc',
            borderRadius: 10,
            textAlign: 'left'
        },
        instructorActorImage:{
            width:80,
            paddingRight: 10
        },
        instructorActorInfo:{
            paddingTop:0
        },
        instructorActorName:{
            fontSize: 16,
            fontWeight: '600'
        },
        instructorActorDesc:{
            fontSize: (device == 'desktop')?14:12,
        }
    }

    return (
        <div style={styles.instructorActor}>
            <div className='row'>
                <div className='col-3 col-md-2'>
                    <img src={`/${photo}`} style={styles.instructorActorImage} alt = "instructor" />
                </div>
                <div className='col-9 col-md-10'>
                    <div style={styles.instructorActorInfo}>
                    <div style={styles.instructorActorName}>{name}</div>
                    <div style={styles.instructorActorDesc}>{desc}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorActor