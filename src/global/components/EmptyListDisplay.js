import React, {useState, useEffect} from 'react'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const EmptyListDisplay = ({params}) => {

    const styles = {
        container: {
            marginTop: 60,
            marginBottom:100,
            textAlign: 'center',
        },
        photo:{
            marginBottom:20
        },
        title: {
            fontSize: 22
        },
        info: {
            fontSize: 15
        },
    }

    return (
        <div style={styles.container}>
            <img src="/box.png" style={styles.photo} />
            <h4 style={styles.title}>{params.title}</h4>
            <p style={styles.info}>{params.info}</p>
            {params.link &&
                <Link to = {params.url} class = "btn btn-sm btn-primary">
                    Continue &nbsp;&nbsp; <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            }
        </div>
    )
}

export default EmptyListDisplay