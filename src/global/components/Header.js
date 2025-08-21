import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "./Constants";
import {useDispatch, useSelector} from 'react-redux';
import {headerData} from '../../slices/headerSlice'
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

import HeaderSider from "./HeaderSider";
import UmHeaderSider from "../../usermanagement/components/UmHeaderSider";
import HrHeaderSider from "../../hr/global/HrHeaderSider";

import Auth from "../../authentication/Auth";

const Header = ({app, mode}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const session = localStorage.getItem("session");
    const [width, setWidth] = useState(window.innerWidth);

    const headData = useSelector(headerData);
    const isMobile = width <= 768;

    useEffect(()=>{
        const sessionObj = session? JSON.parse(session): null;
        setUser(sessionObj);
    }, []);

    function logout(){
        localStorage.clear();
        window.location = "/";
    }

    let userNav = "";
    if(user){
        userNav = (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle link-bold" href="#" id="navbardrop" data-toggle="dropdown">
                    {user.name}
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link onClick = {()=>logout()} className="dropdown-item">Logout</Link>
                </div>
            </li>
        )
    }else{
        const btn = (
            <li className="nav-item">
                <span className="nav-link link-bold">
                    {isMobile? <FontAwesomeIcon icon={faUserCircle} className="link-icon" />: "Login | Sign Up"}
                </span>
            </li>
        )
        const authParams = {
            title: "LOGIN",
            formType:"login", 
            entryPage:"Home", 
            toPage: "/dashboard", 
            btn: btn,
            customBtn: true
        }
        userNav = <Auth params={authParams} />;
    }

    const displaySider = (
        <>
            {(app == "global") && <HeaderSider />}
            {(app == "user") && <UmHeaderSider />}
            {(app == "hr") && <HrHeaderSider />}
        </>
    ) 

    return (
        <>

            {isMobile?
                <HeaderMobile userNav={userNav} mode={mode} />:
                <HeaderDesktop userNav={userNav} mode={mode} />
            }

            {headData.siderVisible && displaySider}

            <div style={{marginBottom:55}}></div>

        </>
    )

};

export default Header;