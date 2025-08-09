import { Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../global/components/Constants";

export function pageInitDisplay(params){
    const styles = {
        container:{
            textAlign: 'center'
        },
        icon: {
            width: 60,
            marginBottom: 20
        },
        title: {
            color: '#666',
            marginBottom:5,
            fontSize: 18
        },
        info:{
            marginBottom:20,
            fontSize: 14
        }
    }
    return (
        <div style={styles.container}>
            <img src={params.icon} style = {styles.icon} />
            <h4 style={styles.title}>{params.title}</h4>
            <div style={styles.info}>{params.info}</div>
            {(params.url != "") && 
                <Link to={params.url} className='btn btn-primary'>{params.label}</Link>
            }
        </div>
    )
}

export function deleteItemUtil(obj){

    obj.ItemRef.current.remove();

    const formData = new FormData();
    formData.append('id', obj.Id);
    formData.append('slug', obj.Slug);
    formData.append('type', obj.Type);

    axios({
        method: "post",
        url: API_URL + "delete/item",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        withCredentials: true
    })
    .then(function (response) {
        const obj = response.data;
        if(obj.Success){}
    })
}

export function genNextId(data){
    let maxId = 0;
    if(data.length > 0){
        //sort ascending by id
        const salted = sortById(data, "desc");
        maxId = salted[0].Id;
    }
    return maxId + 1;
}

export function sortById(data, order){
    const cloned = [...data];
    if(order=='desc'){
        return cloned.sort(({Id:a}, {Id:b}) => b-a);
    }else{
        return cloned.sort(({Id:a}, {Id:b}) => a-b);
    }
}

export function getMaxNumber(data){
    let maxValue = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] > maxValue) {
            maxValue = data[i];
        }
    }
    return maxValue;
}


