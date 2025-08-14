import axios from 'axios';
import { API_URL } from '../../../global/components/Constants';

export const empBasicUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-basic-info-update`, payload, {
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

export const empContactUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-contact-update`, payload, {
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

export const empNokUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-next-of-kin-update`, payload, {
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

export const empDetailsUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-details-update`, payload, {
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

export const empSalaryUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-salary-update`, payload, {
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

export const empSavePayElem = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-save-pay-elem`, payload, {
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

export const empStatutoryUpdate = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-statutory-update`, payload, {
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

export const getEmployees = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/employee-list`, payload, {
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

export const getEmployeeBySlug = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}hr/employee/employee-details/${slug}`);
        const obj = response.data;
        if(obj.success){
            return obj.data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const getEmpPayElemList = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}hr/employee/emp-pay-elem-list`, payload, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });

        var obj = response.data;
        if(obj.success){
            return obj.data
        }

        return [];

    } catch (error) {
        return [];
    }
}