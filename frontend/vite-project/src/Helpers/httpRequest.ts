import axios from "axios";
import Cookies from "js-cookie";



const baseURL=import.meta.env.VITE_BASE_URL ||'http://localhost:3000';
axios.defaults.baseURL = baseURL;


const createHeaders=()=>{
    const userInfoString: string | undefined = Cookies.get('userInfo');
    const userInfo=userInfoString ? JSON.parse(userInfoString) : null;
    if(userInfo&&userInfo.token){
        return {headers:{authorization: `Bearer ${userInfo.token}`}}
    }

}

export const getData=async(url:string)=>{
        const headers=createHeaders();
        const {data}=await axios.get(`${baseURL}${url}`,headers);
        return data;
}
export const postData=async(url:string,body:any)=>{
        const {data}=await axios.post(`${baseURL}${url}`,body);
        return data;

}