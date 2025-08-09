import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import { faHome, faUser, faIdCard, faQuestion, faLocationDot, faSuitcase, faHeadset} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderSiderItem from "./HeaderSiderItem";
import "../css/header.css"
import { faMedapps } from "@fortawesome/free-brands-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";

const HeaderSider = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [session, setSession] = useState({});
    const [login, setLogin] = useState(false);

    const isMobile = width <= 768;

    useEffect(()=>{
        window.scrollTo(0, 0);
        const sessionStored = localStorage.getItem("session");
        if(sessionStored){
            setSession(sessionStored);
            setLogin(true);
        }
    }, [])

    const styles = {
        bar: {
            width:220,
            height: height,
        }
    }
    
    const navs = [
        {type:"link", url: "/", icon:faHome, name:"Home"},
        {type:"space"},
        {type:"label", name: "MODULES"},
        {type:"link", url: "#", icon:faUser, name:"User Management"},
        {type:"link", url: "/topic/new", icon:faIdCard, name:"HR Management"},
        {type:"link", url: "/topic/new", icon:faHeadset, name:"Support Management"},
        {type:"link", url: "#", icon:faSuitcase, name:"Asset Managemetn"},

        {type:"space"},
        {type:"label", name: "OTHERS"},
        {type:"link", url: "/payment/plans", icon:faQuestion, name:"Help"},
        {type:"link", url: "/contact?type=lead&item=", icon:faLocationDot, name:"Contact"},
    ]
    
    return (
        <nav style={styles.bar} className="side-bar">
            <ul>
                {navs.map((itm, index)=>(
                    (itm != null) && <HeaderSiderItem key={index} obj={itm} />
                ))}
            </ul>
        </nav>
    )

};

export default HeaderSider;