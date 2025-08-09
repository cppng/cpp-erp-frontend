import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from '../../global/components/Constants';
import '../../global/css/table.css';


function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        LoadUsers();
    }, [])

    function LoadUsers(){

        setLoading(true);

        axios({
            method: "GET",
            url: API_URL + "user/user-list",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            setLoading(false);
            const obj = response.data;
            if(obj.success){
                setUsers(obj.data);
            }else{
                setFrmMsg(obj.message);
                setPosting(false)
            }
        })
        .catch(function (response) {
            setLoading(false);
        });
    }


    const styles = {
    }

    return (
        <div>
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Title</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(itm => (
                        <tr>
                            <td>
                                <Link>{itm.userName}</Link>
                            </td>
                            <td>{itm.title}</td>
                            <td>{itm.firstName}</td>
                            <td>{itm.lastName}</td>
                            <td>{itm.lastName}</td>
                            <td>{itm.email}</td>
                            <td>{itm.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;