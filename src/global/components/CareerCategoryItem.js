import React, {useState, useEffect} from 'react'
import { faEnvelope, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const CareerCategoryItem = ({obj, entry, targetUrl}) => {

    const [hover, setHover] = useState(false);

    function handleHover(state){
        setHover(state);
    };

    const styles = {
        item: {
            background: hover?'#efefef':'#fff',
            minWidth: 100,
            margin: '10px 5px',
            padding:'10px 20px',
            border:'1px solid #404040',
            borderRadius:30,
            alignItems: 'center',
            outline: 'none',
            boxShadow: 'none',
            transition: 'none',
        },
        name:{
            color: '#404040',
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 0
        }
    }

    return (
        <Link to={`${targetUrl}/${obj.Slug}`} style={styles.item} className='btn' onMouseEnter={()=>handleHover(true)} onMouseLeave={()=>handleHover(false)}>
            <div style={styles.name}>{obj.Name}</div>
        </Link>
    )
}

export default CareerCategoryItem