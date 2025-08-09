import React, {useState} from 'react';
import parse from 'html-react-parser';
import { faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function WhtTootsItem({obj}) {

    const [btnHover, setBtnHover] = useState(false);

    const btnEnter = () => {
        setBtnHover(true);
    };
    const btnLeave = () => {
        setBtnHover(false);
    };

    const styles = {
        item:{
            display: 'flex'
        },
        itemWrap:{
            
        },
        image:{

        },
        iconWrap:{
            background: '#c2c2d8',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            width: 50,
            height: 50,
            marginRight: 20,
            borderRadius: '100%'
        },
        icon:{
            color: '#fff',
            width: '50',
        },
        content:{
            
        },
        title: {
            color: btnHover? '#159aa8': '#333',
            marginBottom: 3,
            fontSize: 20,
            fontWeight: 500
        },
        info: {
            color: '#333',
            fontSize: 16,
            fontWeight: 400
        },
        link:{
            textDecoration: 'none'
        }
        
    }

    return (
        <Link to={obj.Url} style={styles.link} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>
        <div style={styles.item}>
            <div style={styles.content}>
                <div style={styles.iconWrap}>
                    <img src={`/images/oyasell-products/${obj.Icon}`}  style={styles.icon} />
                </div>
            </div>
            <div style={styles.content}>
                <h4 style={styles.title}>{obj.Title}</h4>
                <p style={styles.info}>{parse(obj.Info)}</p>
            </div>
        </div>
        </Link>
    )
}

export default WhtTootsItem;