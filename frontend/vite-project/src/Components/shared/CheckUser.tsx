import { useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../Context/user';


const CheckUser=()=> {
    const { state:{userInfo} } = useContext(User);
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectURL=new URLSearchParams(search);
    const redirectValue=redirectURL.get("redirect");
    const redirect = redirectValue ?redirectValue:"/signin";
    useEffect(() => {
        if(!userInfo){
            navigate(redirect)
        }
        }, [navigate,redirect,userInfo]);
  return (
    <></>
  )
}

export default CheckUser