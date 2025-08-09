import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from '../../global/components/Constants';
import '../../global/css/table.css';
import { getEmployees } from '../../utils/api-services/hr/employee';


function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        LoadEmployees();
    }, [])

    const LoadEmployees = async ()=>{

        setLoading(true);
        const obj = await getEmployees({
            searchQuery: ""
        });
        if(obj.success){
            setEmployees(obj.data);
        }
        
    }


    const styles = {
    }

    return (
        <div>
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(itm => (
                        <tr>
                            <td>
                                <Link to={`/hr/employee-form/${itm.slug}`}>Select</Link>
                            </td>
                            <td>{itm.firstName}</td>
                            <td>{itm.middleName}</td>
                            <td>{itm.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList;