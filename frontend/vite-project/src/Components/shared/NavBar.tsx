import  { useContext } from 'react'
import Cookies from "js-cookie";
import { USER_SIGNOUT } from '@/Actions';
import { useNavigate } from 'react-router-dom';
import { User } from '@/user';


const NavBar = () => {
    const navigate = useNavigate();
const {dispatch: ctxDispatch } = useContext(User);

const clickHandler = () => {
    Cookies.remove("userInfo");
    ctxDispatch({ type: USER_SIGNOUT })
    navigate("/");
}

    return (
        <div>

            <button onClick={clickHandler}>Logout</button>
        </div>
    )
}

export default NavBar