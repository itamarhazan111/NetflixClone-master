import { useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { USER_SIGNOUT } from '@/Helpers/Actions';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/Context/user';
import '@fortawesome/fontawesome-free/css/all.css';


const NavBar = () => {
    const navigate = useNavigate();
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(User);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [image,setImage]=useState('');

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        if(userInfo&&userInfo.profilePicture){
            setImage(userInfo.profilePicture)
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const clickHandler = () => {
        Cookies.remove("userInfo");
        ctxDispatch({ type: USER_SIGNOUT })
        navigate("/");
    }

    const navbarClass = scrollPosition > 0 ? "bg-black" : "bg-gradient-to-b from-black to-transparent";

    return (
        <div className={`p-2 fixed top-0 left-0 right-0 z-10 text-white transition-all duration-500 ${navbarClass}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex justify-between-left items-center space-x-6'>
                    <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-22 mr-2" />
                    <Link className="hover:text-gray-500" to={'/'} >Home</Link>
                    <Link className="hover:text-gray-500" to={'/series'} >TV Shows</Link>
                    <Link className="hover:text-gray-500" to={'/movies'} >Movies</Link>
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
                        <img src={image} alt="Profile Picture" className="w-8 rounded mr-2 " />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;