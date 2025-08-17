import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import '../../global/css/table.css';
import { getUsers } from '../../utils/api-services/um/user';

function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        LoadUsers();
    }, [])

    const LoadUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        setUsers(res);
        setLoading(false);
    }

    const styles = {
    }

    return (
        <div className = "table-responsive">
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Display Name</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(itm => (
                        <tr>
                            <td>
                                <Link>{itm.userName}</Link>
                            </td>
                            <td>{itm.name}</td>
                            <td>******</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;