import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import parse from 'html-react-parser';
import { API_URL } from './Constants';

const PhotoControl = ({params}) => {

    const[previewPhoto, setPreviewPhoto] = useState("");
    const[photoState, setPhotoState] = useState("edit"); //edit or preview
    const[uploadMsg, setUploadMsg] = useState("");
    const fileInputElem = useRef();

    const session = localStorage.getItem("session");

    useEffect(()=>{
        if(params.defaultPhoto != null && params.defaultPhoto != ""){
            let photo = getPath(params.entry) + params.defaultPhoto;
            setPreviewPhoto(photo);
            setPhotoState('preview');
        }
    }, [])

    const selectPhoto = ()=>{
        fileInputElem.current.click();
    }

    const handleInputChange = (event) => {

        let files = event.target.files;
        let file = files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
                            
            let image = new Image();
            image.src = createObjectURL(file);
            image.onload =  function(e){
                    
                let cropWidth = params.width;
                let cropHeight = params.height;
                            
                if(e.target.width < cropWidth){
                    if(params.media == "icon"){
                        setUploadMsg(parse('<span style = "color:#990000;padding:10px;font-size:14px">upoad an icon whose width is ' + cropWidth +'px and above</span>'));
                    }else{
                        setUploadMsg(parse('<span style = "color:#990000;padding:10px;font-size:14px">upoad a photo whose width is ' + cropWidth +'px and above</span>'));
                    }
                    return false
                }else{
                    setUploadMsg('');  
                }
                            
                const sizedPhoto = resizeCrop( e.target, cropWidth, cropHeight ).toDataURL('image/jpg', 90);
                displaySelectedPhoto(sizedPhoto);

            }
                    
        }

        reader.readAsDataURL(file);
    }

    function displaySelectedPhoto(photo){
        params.setPhoto(photo);
        setPreviewPhoto(photo);
        setPhotoState('preview');
        setUploadMsg("");
    }

    function removePhoto(){
        setPhotoState('edit');
        params.setPhoto("");
        setPreviewPhoto("");
        setUploadMsg("");
        if(params.defaultPhoto != null && params.defaultPhoto != ""){
            deletePhoto();
        }
    }

    function deletePhoto(){
        const formData = new FormData();
        formData.append('type', params.entry);
        formData.append('id', params.formId);
        formData.append('photo', params.defaultPhoto);
    
        axios({
            method: "post",
            url: API_URL + "upload/delete_photo",
            data: formData,
            headers: { Authorization: `Bearer ${session}`, "Content-Type": "multipart/form-data" },
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            withCredentials: true
        })
        .then(function (response) {})
        .catch(function (response) {});
    }

    function getPath(entry){
        let result = ""
        switch (entry) {
            case "content":
            case "content-topic":
                result = API_URL+'/uploads/content/';
                break;
            case "course":
                result = API_URL+'/uploads/course/';
                break;
            case "user":
                result = API_URL+'/uploads/user/';
                break;
            case "careerpath":
                result = API_URL+'/uploads/careerpath/';
                break;    
            case "event":
            case "event-speaker":
			case "event-testimonial":
                result = API_URL+'/uploads/event/';
                break; 
            case "organization-logo":
                result = API_URL+'/uploads/organization/';
                break;
            default:
                result = "";
        }
        return result;
    }
   
    function resizeCrop( src, width, height ){
                    
        var crop = width == 0 || height == 0;
        // not resize
        if(src.width <= width && height == 0) {
            width  = src.width;
            height = src.height;
        }
                
        // resize
        if( src.width > width && height == 0){
            height = src.height * (width / src.width);
        }
            
        // check scale
        var xscale = width  / src.width;
        var yscale = height / src.height;
        var scale  = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
        // create empty canvas
        var canvas = document.createElement("canvas");                  
        canvas.width  = width ? width   : Math.round(src.width  * scale);
        canvas.height = height ? height : Math.round(src.height * scale);
        canvas.getContext("2d").scale(scale,scale);
        // crop it top center
        canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5 , ((src.height * scale) - canvas.height) * -.5 );
        return canvas;
    }
            
    function createObjectURL(i){ 
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        return URL.createObjectURL(i);
    }

    const styles = { 
        upload: {
            marginBottom:20,
            padding:10,
            border: '2px dashed #ccc', 
            borderRadius:10,
            textAlign: 'center'
        },
        title: {
            marginBottom:2,
            fontSize:16,
            fontWeight:'600'
        },
        info: {
            fontSize:13,
        },
        link: {
            textDecoration: 'none',
        },
        fileInput: {
            display: 'none'
        },
        photoPreview: {
            width: 100,
            position: 'relative'
        },
        photo: {
            width: '100%'
        },
        closeBtn: {
            background: '#333',
            color: '#fff',
            width: 26,
            height: 26,
            padding: 0,
            borderRadius: '100%',
            position: 'absolute',
            top: -10,
            right: -10,
        },
        uploadMsg:{
            color: '#990000',
            fontSize: 13
        }
    }

    function naming(media){
        let title; let info;
        if(media == "icon"){
            title = "Icon"; 
            info = "Select icon to upload ";
        }
        else if(media == "photo"){
            title = "Photo"; 
            info = "Select photo to upload ";
        }
        else if(media == "logo"){
            title = "Logo"; 
            info = "Select logo to upload ";
        }
        return {title, info}
    }

    return (
        <div style={styles.upload}>

            {photoState == 'edit' &&
                <div>
                    <h4 style={styles.title}>
                        {naming(params.media).title}
                    </h4>
                    <div style={styles.info}>
                        {naming(params.media).info} 
                        ({params.width} x {params.height} px)
                    </div>
                    <Link onClick={selectPhoto} style = {styles.link}>{params.media=="icon"?"Select Icon":"Select Photo"}</Link>
                    <input type="file" ref={fileInputElem} onChange={handleInputChange} style = {styles.fileInput} />
                    <div style={styles.uploadMsg}>{uploadMsg}</div>
                </div>
            }

            {photoState == 'preview' &&
                <div style={styles.photoPreview}>
                    <button onClick={()=>removePhoto()} className="btn" style={styles.closeBtn}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <img src={previewPhoto} style = {styles.photo} />
                </div>
            }

        </div>
    )

};

export default PhotoControl;