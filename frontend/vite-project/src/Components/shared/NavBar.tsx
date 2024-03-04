import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/Context/user';
import '@fortawesome/fontawesome-free/css/all.css';
import SearchSection from '../NavBar/SearchSection';
import ProfileSection from '../NavBar/ProfileSection';

const NavBar = () => {
    const navigate = useNavigate();
    const { state: { userInfo } } = useContext(User);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [image, setImage] = useState('');

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        if (userInfo && userInfo.profilePicture) {
            setImage(userInfo.profilePicture)
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClass = scrollPosition > 0 ? "bg-zinc-900" : "bg-gradient-to-b from-black to-transparent";

    return (
        <div className={`p-2 fixed top-0 left-0 right-0 z-10 text-white transition-all duration-500 ${navbarClass}`}>
            <div className="mx-auto flex justify-between items-center">
                <div className='flex justify-between-left items-center space-x-6'>
                    <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-22 mr-2" onClick={() => navigate("/")}/>
                    <Link className="hover:text-gray-500" to={'/'} >Home</Link>
                    <Link className="hover:text-gray-500" to={'/series'} >TV Shows</Link>
                    <Link className="hover:text-gray-500" to={'/movies'} >Movies</Link>
                    <Link className="hover:text-gray-500" to={'/mylist'} >My List</Link>
                </div>
                <div className='flex justify-between-right items-center mr-10 space-x-6'>
                    <SearchSection />
                    <Link to='#' className='nav-link'>
                        <i className="fa-regular fa-bell"></i>
                    </Link>
                    <ProfileSection image={image} />
                </div>
            </div>
        </div>
    );
}

export default NavBar;