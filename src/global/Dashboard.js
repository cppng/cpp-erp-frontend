import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {

    const modules = [
        {Name: "User Management", Icon: "/images/user.png", Url: "/um/dashboard", Description: "Manage users access, contact, and other info"},
        {Name: "HR Management", Icon: "/images/hr.png", Url: "/hr/dashboard", Description: "Manage users employement data and salaries"},
        {Name: "Support Management", Icon: "/images/support.png", Url: "#", Description: "Log and track support tickets seamlessly "},
        {Name: "Asset Management", Icon: "/images/asset.png", Url: "#", Description: "Keep track of your organization valuables"},
    ]

    const styles = {
        page:{
            paddingTop: 40
        },
        item: {
            background: '#fff',
            marginBottom: 30,
            padding: '15px 10px',
            border: '1px solid #ccc',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        itemHead: {
            display: 'flex',
        },
        itemIcon: {
            marginRight: 10
        },
        itemImg: {
            width: 30
        },
        itemTitle: {
            color: '#191919',
            marginBottom: 0,
            lineHeight: 1.5,
            fontSize: 18,
        },
        itemDesc: {
            color: '#191919',
            fontSize: 13
        },
        link:{
            textDecoration: 'none'
        }
    }

    function moduleList(){
        return (
            <div className='row'>
                {modules.map(itm=>(
                    <div className='col-md-4'>
                        {moduleListItem(itm)}
                    </div>
                ))}
            </div>
        )
    }

    function moduleListItem(obj){
        return (
            <Link to={obj.Url} style={styles.link}>
            <div style={styles.item}>
                <div style={styles.itemHead}>
                    <div style={styles.itemIcon}>
                        <img src={obj.Icon} style={styles.itemImg} />
                    </div>
                    <h4 style={styles.itemTitle}>{obj.Name}</h4>
                </div>
                <hr />
                <div style={styles.itemDesc}>{obj.Description}</div>
            </div>
            </Link>
        )
    }
    
    return (
        <div style={styles.page}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>
                        {moduleList()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard