import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const node = useRef<HTMLDivElement>(null);  
    const [ query, setQuery ] = useState("");
    const navigate=useNavigate();
    let {pathname}=useLocation();
  
    useEffect(() => {
      if(query.length==0){
        navigate("/")
      }else{
        navigate(`/search/${query}`);
        }
    }, [query]);
  
          
  

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current?.contains(e.target as Node)) {
            // inside click
            return;
        }
        // outside click 
        setIsOpen(false);
    };  
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClickOutside);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative flex items-center transition duration-500 ${isOpen ? 'border-2 border-white' : 'border-0 border-transparent'}`} ref={node}>
            <div className="cursor-pointer text-lg" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-magnifying-glass ml-2 text-white"></i>
            </div>
            <input
                className={`transition-width duration-500 ease-in-out ml-2 bg-transparent text-white placeholder-white outline-none ${isOpen ? 'w-48' : 'w-0'
                    }`}
                type="text"
                placeholder="Search..."
                onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
    );
};


export default SearchSection;