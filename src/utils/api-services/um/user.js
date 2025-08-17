import axios from 'axios';
import { API_URL } from '../../../global/components/Constants';

export const getUsers = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}user/user-list`);
        const obj = response.data;
        if(obj.success){
            return obj.data;
        }
        return [];
    } catch (error) {
        return [];
    }
}