import { useContext } from 'react';
import Cookies from "js-cookie";
import { USER_SIGNOUT } from '@/Actions';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/user';
import '@fortawesome/fontawesome-free/css/all.css';


const NavBar = () => {
    const navigate = useNavigate();
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(User);

    const clickHandler = () => {
        Cookies.remove("userInfo");
        ctxDispatch({ type: USER_SIGNOUT })
        navigate("/");
    }


    return (
        <div className="p-2 bg-gradient-to-b from-black to-transparent fixed top-0 left-0 right-0 z-10 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex justify-between-left items-center space-x-6'>
                    <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-22 mr-2" />
                    <a href="#" className="hover:text-gray-500">Home</a>
                    <a href="#" className="hover:text-gray-500">TV Shows</a>
                    <a href="#" className="hover:text-gray-500">Movies</a>
                    <a href="#" className="hover:text-gray-500">My List</a>
                </div>
                <div className='flex justify-between-right items-center space-x-6'>
                    <Link to='#' className='nav-link'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <Link to='#' className='nav-link'>
                        <i className="fa-regular fa-bell"></i>
                    </Link>
                    <Link onClick={clickHandler} className="dropdown-item hover:text-gray-500" to={''}>
                        {/* Sign out */}
                        <img src={userInfo.profilePicture} alt="Profile Picture" className="w-8 rounded mr-2 " />
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default NavBar;