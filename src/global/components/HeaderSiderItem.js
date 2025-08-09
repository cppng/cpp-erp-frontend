import React, {useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/header.css"

const HeaderSiderItem = ({obj}) => {
    
    if(obj.type == "link"){
        return (
            <li className="item">
                <a href={obj.url}>
                    <FontAwesomeIcon icon={obj.icon} className="ico"/>
                    <span>{obj.name}</span>
                </a>
            </li>
        )
    }
    else if(obj.type == "label"){
        return (
            <li className="label">
                <span>{obj.name}</span>
            </li>
        )
    }
    else if(obj.type == "space"){
        return (<li className="space">&nbsp;</li>)
    }
    

};

export default HeaderSiderItem;