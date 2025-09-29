import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an axios instance with baseURL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

console.log(import.meta.env.VITE_API_BASE_URL);


export const loginAsAdmin = (formdata) => {
  return API.post("/admin/loginadminsecuredonly", formdata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const logout = async () => {
  try {
    const response = await API.post("/admin/logoutadmin");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getallunapprovedconsultants = async () => {
  try {
    const response = await API.get("/admin/seeunapprovedconsultants");
    console.log(response);
    
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const adminapproveconsultant = async (consultantId) => {
  console.log(consultantId);
  
  try {
    const response = await API.post(
      `/admin/adminapproveconsultant/${consultantId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const adminrejectconsultant = async (consultantId) => {
  try {
    const response = await API.post(
      `/admin/adminrejectconsultant/${consultantId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const adminSeeAllBookings = async () => {
  try {
    const response = await API.get("/admin/getallbookingsAdmin");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const rejectedConsultants = async () =>{
  try {
    const response = await API.post('/admin/rejectedConsultants');
    return response.data.data
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getAllUser = async (role) => {
  try {
    const response = await API.get(`/admin/get-all-user?query=${role}`);
    console.log(response);
    
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching users:', error); 
    throw error; 
  }
};

export const getAllsuccessfulPaymentRecords = async()=>{
  try {
    const response = await API.post('/admin/successfulPaymentRecords')
    return response.data.data
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getDashboardStatsData = async()=>{
  try {
    const response = await API.post('/admin/dashboardStatsData')
    console.log(response , 'response fsdfg');
    return response.data.data
  } catch (error) {
      if(error.status == 401){
      localStorage.clear();
      window.location.href = '/'
    }
    console.log(error);
    
  }
}