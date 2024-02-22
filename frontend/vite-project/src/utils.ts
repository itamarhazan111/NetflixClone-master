import axios from "axios";
import Cookies from "js-cookie"


const createHeaders=()=>{
    const userInfoString: string | undefined = Cookies.get('userInfo');
    const userInfo=userInfoString ? JSON.parse(userInfoString) : null;
    if(userInfo&&userInfo.token){
        return {headers:{authorization: `Bearer ${userInfo.token}`}}
    }

}

export const getError = (error: any) => {
    return error.message && error.response.data.message ? error.response.data.message : error.message
}
export const getData=async(url:string)=>{
    const headers=createHeaders();
    const {data}=await axios.get(`http://localhost:3000${url}`,headers);
    return data;
}