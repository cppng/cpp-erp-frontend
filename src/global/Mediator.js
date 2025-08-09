import React, {useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";

function Mediator() {

    let { entry } = useParams();
    const session = localStorage.getItem("session");
    let navigate = useNavigate();

    useEffect(()=>{
        mediate();
    }, [])

    function mediate(){
        if(session){
            if(entry == "get-in" || entry == "get-started"){
                navigate("/dashboard", { replace: true });
            }
            else if(entry.substring(0,16) == "practice-coding-"){
                const code = entry.replace("practice-coding-", "")
                navigate(`/course/detail/${code}`, { replace: true });
            }
            else if(entry == "contact"){
                navigate("/contact?type=lead&item=", { replace: true });
            }
            else if(entry.substring(0,11) == "class-room-"){
                const code = entry.replace("class-room-", "");
                navigate(`/class-room/${code}`, { replace: true });
            }
            else if(entry.substring(0,8) == "payment-"){
                const code = entry.replace("payment-", "")
                navigate(`/payment/pay/${code}?p=upgrade`, { replace: true });
            }
            else if(entry.substring(0,3) == "job"){
                if(entry.trim().length > 4){ //job- .....
                    const jCode = entry.slice(4);
                    navigate(`/job/detail/${jCode}`, { replace: true });
                }
                else{
                    navigate(`/job/list`, { replace: true });
                }
            }
        }
        else{
            if(entry == "get-in"){
                window.location = `/login/${entry}`;
            }else{
                window.location = `/signup/${entry}`;
            }
        }
    }

}

export default Mediator