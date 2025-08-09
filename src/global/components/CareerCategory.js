import React, {useState, useEffect} from 'react'
import { faEnvelope, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './Constants';
import CareerCategoryItem from './CareerCategoryItem';

const CareerCategory = ({params}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const isMobile = width <= 768;

    useEffect(()=>{
        loadCategories();
    }, []);

    function loadCategories(){
        setLoading(true);
        axios({
            method: 'get',
            url: API_URL + `career/categories`,
        }).then((respose)=>{
            const obj = respose.data;
            if(obj.Success){
                setCategories(obj.Data);
            }
            setLoading(false);
        })
    }

    const styles = {
        categories: {
            display: 'flex',
            flexWrap: 'wrap'
        },
    }

    return (
        <div style={styles.categories}>
            {categories.map(itm=>(
                <CareerCategoryItem obj={itm} entry={params.entry} targetUrl={params.targetUrl} />
            ))}
        </div>
    )
}

export default CareerCategory