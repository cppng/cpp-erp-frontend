import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { API_URL } from './Constants';
import WhtTootsItem from './WhtTootsItem';

function WhtToots({display}) {

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(()=>{
        loadTools();
    }, [])

    function loadTools(){
        setLoading(true)
        axios({
            method: 'get',
            url: API_URL + `wht/tools`,
        }).then((respose)=>{
          const obj = respose.data;
          if(obj.Success){
            setTools(obj.Data);
          }
          setLoading(false);
        })
    }

    const styles = {
        list:{},
        grid:{},
        item:{
            background: '#fff',
            padding: '20px 15px',
            marginBottom: 20,
            border: '1px solid #ccc',
            borderRadius: 5
        }
    }

    function listDisplay(data){
        return (
            <div style={styles.list}>
                {data.map(itm=>(
                    <div style={styles.item}>
                        {<WhtTootsItem obj = {itm} />}
                    </div>
                ))}
            </div>
        )
    }

    function gridDisplay(data){
        return (
            <div style={styles.grid}>
                <div className='row'>
                {data.map(itm=>(
                    <div className='col-md-6'>
                        <div style={styles.item}>
                            {<WhtTootsItem obj = {itm} />}
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            {(display=="list")? listDisplay(tools): gridDisplay(tools)}
        </div>
    )
}

export default WhtToots;