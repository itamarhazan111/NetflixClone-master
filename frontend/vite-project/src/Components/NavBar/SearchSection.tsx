import { useState } from 'react';

const SearchSection = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const toggleSearch = () => {
        setIsSearchOpen(prevState => !prevState);
    };

    const searchTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const clearTextHandler = () => {
        setSearchText("");
    }

    const searchInputClass = searchText.length > 0 ? "" : "invisible";

    return (
        <div>
            {!isSearchOpen ?
                <button className='nav-link' onClick={toggleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                :
                <div className='bg-zinc-900 bg-opacity-80 border border-white'>
                    <i className="fa-solid fa-magnifying-glass mr-2 ml-2 mt-2 mb-2" onClick={toggleSearch}></i>
                    <input type='text' className='bg-black bg-opacity-0 focus:outline-none' value={searchText} onChange={searchTextHandler} placeholder='Titles'></input>
                    <button>
                        <i className={`fa-solid fa-xmark mr-2 ${searchInputClass}`} onClick={clearTextHandler} />
                    </button>
                </div>
            }


        </div>
    )
}

export default SearchSection;