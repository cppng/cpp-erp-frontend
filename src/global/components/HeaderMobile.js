import React, {useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from 'react-redux';
import {headerData, setSiderDisplay} from '../../slices/headerSlice'
import "../css/header.css"

const HeaderMobile = ({userNav, mode}) => {

    const headData = useSelector(headerData);
    const dispatch = useDispatch();

    const showSider = () => {
        dispatch(setSiderDisplay(true));
    }

    const hideSider = () => {
        dispatch(setSiderDisplay(false));
    }
    
    return (
        <nav className={`navbar navbar-expand-sm fixed-top ${(mode=="dark")? "nav-custom-dark": "nav-custom"}`}>  
            <div className="container-fluid">

                {headData.btnVisible &&
                    <div className="bar-icon-wrap">
                        {headData.siderVisible?
                            <Link onClick={hideSider}><FontAwesomeIcon icon={faTimes} className="bar-icon"/></Link>:
                            <Link onClick={showSider}><FontAwesomeIcon icon={faBars} className="bar-icon"/></Link>
                        }
                    </div>
                }

                <div className="brand-wrap-m">
                    <Link to="/" className="navbar-brand brand">
                        <img src = "/images/logo.png" className="logo-m" />
                    </Link>
                </div>
                <div className="links-m" id="navbar1">
                    <ul className="navbar-nav">
                        
                        <li className="nav-item dropdown">
                            <Link to="#" className="nav-link link-m" data-toggle="dropdown">Modules</Link>
                            <div class="dropdown-menu">
                                <Link to="/course/list" className="dropdown-item">User Management</Link>
                                <Link to="/contents" className="dropdown-item">HR Management</Link>
                                <Link to="/contents" className="dropdown-item">Support Management</Link>
                                <Link to="/events" className="dropdown-item">Asset Management</Link>
                            </div>
                        </li>
                                    
                    </ul>
                </div>
                <div className="links-m" id="navbar1">
                    <ul className="navbar-nav">       
                        {userNav}     
                    </ul>
                </div>

            </div>
        </nav>
    )

};

export default HeaderMobile;