import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { API_URL } from "./Constants";

let params;

export function deleter(data){
    params = data;
    confirmAlert(options);
}

const options = {
    title: 'Delete',
    message: 'Do you want to continue with delete?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {doDeleteItem()}
      },
      {
        label: 'No',
        onClick: null
      }
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    overlayClassName: "overlay-custom-class-name"
};

function doDeleteItem(){

    const session = localStorage.getItem("session");
    const formData = new FormData();
    formData.append('type', params.type);
    formData.append('code', params.code);

    axios({
        method: "post",
        url: API_URL + "delete/delete_item",
        data: formData,
        headers: { Authorization: `Bearer ${session}`, "Content-Type": "multipart/form-data" },
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        withCredentials: true
    })
    .then(function (response) {
        const obj = response.data;
        if(obj.Status == "success"){
            removeElement();
        }else{
            alert(obj.Message);
        }
    })
    .catch(function (response) {
        alert("posting error!");
    });
}

function removeElement(){
    if(params.elem != null){
        params.elem.current.remove();
    }else{
        window.location.reload(false);
    } 
}

