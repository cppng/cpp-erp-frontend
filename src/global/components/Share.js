import React, {useState, useEffect, useRef} from 'react'
import Modal from 'react-bootstrap/Modal';
import { faClone, faCode, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { WEB_URL } from './Constants';

const Share = ({params}) => {

    const [content, setContent] = useState("");
    const [copyBtnHover, setCopyBtnHover] = useState(false);
    const [embedBtnHover, setEmdedBtnHover] = useState(false);
    const [msg, setMsg] = useState("");

    const contentRef = useRef();

    function handleCopyBtnHover(state){
        setCopyBtnHover(state);
    };

    function handleEmbedBtnHover(state){
        setEmdedBtnHover(state);
    };

    async function copyLink(){
        setMsg(""); setContent("");
        const url = `${WEB_URL}form/${params.code}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Modern API
            await navigator.clipboard.writeText(url);
            setMsg("Link copied to clipboard!");
        } else {
            // Fallback for older browsers
            document.execCommand("copy");
            setMsg("Link copied to clipboard!");
        }
    }

    function embedForm(){
        setMsg("");
        const url = `${WEB_URL}form/${params.code}`;
        const str = `<iframe src="${url}" style="width:500px;height:300px;border:none"></iframe>`;
        setContent(str);
        setMsg("Embed script generated!");
    }

    const closeModal = ()=>{
        params.setShare(false);
    }

    const styles = {
        share: {
            background: '#fff',
            minHeight: 120
        },
        btns: {
            marginBottom: 20
        },
        copyLinkBtn: {
            background: copyBtnHover? '#666': '#fff',
            color: copyBtnHover? '#fff': '#333',
            width: 160,
            marginRight: 10,
            border: '1px solid #bbbbbb',
            outline: 'none',
            boxShadow: 'none',
            transition: 'none',
        },
        embedBtn: {
            background: embedBtnHover? '#666': '#fff',
            color: embedBtnHover? '#fff': '#333',
            width: 160,
            marginRight: 10,
            border: '1px solid #bbbbbb',
            outline: 'none',
            boxShadow: 'none',
            transition: 'none',
        },
        icon:{
            color: '#ccc'
        },
        msg: {
            background: '#b7eeb7',
            color: '#000',
            marginBottom: 20,
            padding: '5px 15px',
            border: '1px solid #30bd30',
            borderRadius: 3
        },
        msgIcon:{
            color: '#009900',
        },
        contentIn:{
            height: 100
        }
    }

    return (
        <Modal show={params.share} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title style={{fontSize:15}}>{params.title}</Modal.Title>
                <button type="button" onClick={closeModal} className="close">&times;</button>
            </Modal.Header>
            <Modal.Body style={styles.share}>  

                <div style={styles.btns}>
                    <button 
                        onClick={()=>copyLink()} 
                        style={styles.copyLinkBtn} 
                        className='btn'
                        onMouseEnter={()=>handleCopyBtnHover(true)} 
                        onMouseLeave={()=>handleCopyBtnHover(false)}
                    >
                        <FontAwesomeIcon icon={faClone} style={styles.icon} /> &nbsp;&nbsp; Copy Link
                    </button>
                    <button 
                        onClick={()=>{embedForm()}} 
                        style={styles.embedBtn} 
                        className='btn'
                        onMouseEnter={()=>handleEmbedBtnHover(true)} 
                        onMouseLeave={()=>handleEmbedBtnHover(false)}
                    >
                        <FontAwesomeIcon icon={faCode} style={styles.icon} /> &nbsp;&nbsp; Embed Form
                    </button>
                </div>

                {(msg != "") && 
                    <div style={styles.msg}>
                        <FontAwesomeIcon icon={faCheckCircle} style={styles.msgIcon} /> &nbsp;&nbsp; {msg}
                    </div>
                }

                {(content != "") && 
                    <div>
                        <textarea ref={contentRef} value={content} style={styles.contentIn} className='form-control' />
                    </div>
                }

            </Modal.Body> 
        </Modal>
    )
}

export default Share