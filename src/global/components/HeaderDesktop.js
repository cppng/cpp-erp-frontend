import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from 'react-redux';
import {headerData, setSiderDisplay, setBtnDisplay} from '../../slices/headerSlice'
import "../css/header.css"
import { color } from "highcharts";

const HeaderDesktop = ({userNav, mode}) => {

    const headData = useSelector(headerData);
    const dispatch = useDispatch();

    const showSider = () => {
        dispatch(setSiderDisplay(true));
    }

    const hideSider = () => {
        dispatch(setSiderDisplay(false));
    }

    const styles = {
        navBar: {
            background:'#fff',
            height: 60
        },
        brandTitle:{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1
        },
        brandDot:{
            color: '#00a823',
            fontSize: 26,
            fontWeight: 600,
            lineHeight: 1
        }
    }

    return (
        <nav className = {`navbar navbar-expand-sm fixed-top ${(mode=="dark")? "nav-custom-dark": "nav-custom"}`} style = {styles.navBar}>  
            <div className="container-fluid">

                {headData.btnVisible &&
                    <div className="bar-icon-wrap">
                        {headData.siderVisible?
                            <Link onClick={hideSider}><FontAwesomeIcon icon={faTimes} className="bar-icon"/></Link>:
                            <Link onClick={showSider}><FontAwesomeIcon icon={faBars} className="bar-icon"/></Link>
                        }
                    </div>
                }

                <div className="brand-wrap">
                    <Link to="/" className="navbar-brand brand">
                        <img src = "/images/logo.png" className="logo" /> 
                        <span style={styles.brandTitle}>CPP ERP</span>
                        <span style={styles.brandDot}>.</span>
                    </Link>
                </div>
                <div className="links" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link link">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle link" data-toggle="dropdown">Apps</Link>
                            <div class="dropdown-menu">
                                <a href="/um/dashboard" className="dropdown-item">User Management</a>
                                <a href="/hr/dashboard" className="dropdown-item">HR Management</a>
                                <a href="#" className="dropdown-item">Support Management</a>
                                <a href="#" className="dropdown-item">Asset Management</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/payment/plans" className="nav-link link">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact?type=lead&item=" className="nav-link link">Contact</Link>
                        </li>
                                    
                        {userNav}
                                    
                    </ul>
                </div>

            </div>
        </nav>
    )

};

export default HeaderDesktop;