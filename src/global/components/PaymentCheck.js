import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Radium, {StyleRoot} from 'radium';
import axios from 'axios';
import { API_URL } from './Constants';
import PageLoader from "./PageLoader";


const PaymentCheck = ({item}) => {

    const [check, setCheck] = useState(null);
    const [loading, setLoading] = useState(false);
    const session = JSON.parse(localStorage.getItem("session"));

    useEffect(()=>{
        loadCheck();
    }, [])

    function loadCheck(){
        setLoading(true);
        const userId = (session != null)?session.Id:-1;
        axios({
            method: 'get',
            url: API_URL + `payment/check_payment?user=${userId}&item=${item}`
        }).then((respose)=>{
            setCheck(respose.data)
            console.log(respose.data)
            setLoading(false)
        })
    }

    const styles = {
        check: {
            background: '#e59819',
            color: '#fff',
            marginBottom:20,
            padding:10,
            paddingLeft:20,
            borderRadius:5,
            boxShadow: '0px 1px 1px #cccccc'
        },
        label: {
            fontSize: 15,
            fontWeight: 500
        },
        btnWrapper: {
            textAlign: 'right'
        }, 
        btn: {
            background: '#fff',
            width:120,
            borderRadius: 30,
            fontSize:13,
            fontWeight: 600
        }
    }


    if(loading){
        return <PageLoader />
    }else{
        if(check){
            if(check.Upgrade == 0){
                return (
                    <div style={styles.check}>
                        <div className="row">
                            <div className="col-md-8">
                                <div style={styles.label}>Fast tract your learning  with Premium upgrade</div>
                            </div>
                            <div className="col-md-4" style={styles.btnWrapper}>
                                <Link to={`/pricing`} className="btn btn-sm" style = {styles.btn}>UPGRADE</Link>
                                {/*<Link to={`/course-detail/${item}`} className="btn btn-sm" style = {styles.btn}>BUY</Link>*/}
                            </div> 
                        </div>
                    </div>
                )
            }
        }
    }

};

export default PaymentCheck;