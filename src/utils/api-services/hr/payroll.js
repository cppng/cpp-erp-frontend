import axios from 'axios';
import { API_URL } from '../../../global/components/Constants';

export const runSalary = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/payroll/run-salary`, payload, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPayslip = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/payroll/payslip`, payload, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
