import { postDataWithAuth } from '@/Helpers/httpRequest';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

const AddContentPage=() =>{
    const [isSeries, setIsSeries] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const imgTitleRef = useRef<HTMLInputElement>(null);
    const imgThumbRef = useRef<HTMLInputElement>(null);
    const imgVerticalRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const trailerRef = useRef<HTMLInputElement>(null);
    const movieRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
    const limitRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const isSeriesRef = useRef<HTMLInputElement>(null);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSeries(event.target.checked);
      };
    
    const loginHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const content ={
                title: titleRef.current?.value|| "",
                description: descriptionRef.current?.value|| "",
                img: imgRef.current?.value|| "",
                imgTitle: imgTitleRef.current?.value|| "",
                imgThumb: imgThumbRef.current?.value|| "",
                imgVertical: imgVerticalRef.current?.value|| "",
                trailer: trailerRef.current?.value|| "",
                movie: movieRef.current?.value|| "",
                duration: durationRef.current?.value|| "",
                year: yearRef.current?.value|| "",
                limit: limitRef.current?.value|| "",
                genre: genreRef.current?.value|| "",
                isSeries:isSeries
            } 
            const data = await postDataWithAuth("/api/v1/content/addcontent", { content })
            if (data) {
                toast.success(`added ${data.title}`)
            }
        } catch (error) {
            
        }
    };
  return (
    <div className='mt-20'>
        <form onSubmit={(e) => loginHandler(e)} className="mb-6">
                    <input
                        type="text"
                        placeholder="title"
                        ref={titleRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="description"
                        ref={descriptionRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="img"
                        ref={imgRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgTitle"
                        ref={imgTitleRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgThumb"
                        ref={imgThumbRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgVertical"
                        ref={imgVerticalRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="trailer"
                        ref={trailerRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="movie"
                        ref={movieRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="duration"
                        ref={durationRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />        
                    <input
                        type="text"
                        placeholder="year"
                        ref={yearRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />     
                    <input
                        type="text"
                        placeholder="limit"
                        ref={limitRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />     
                    <input
                        type="text"
                        placeholder="genre"
                        ref={genreRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />     
                    <input
                        type="checkbox"
                        id="isSeries"
                        ref={isSeriesRef}
                        onChange={handleCheckboxChange}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />                                                                                                 
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-8 ">Login</button>
                </form>
    </div>
  )
}

export default AddContentPage