import { useContext, useEffect, useReducer, useState} from 'react';
import Title from '../Components/shared/Title'
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../user';
import Cookies from "js-cookie";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS, USER_SIGNOUT } from '../Actions';

import Contents from '@/Components/HomePage/Contents';
import axios from 'axios';
import homePageReducer from '@/Reducers/homeReducer';
import { IHomeState } from '@/Models/IHomeState';
import { IContent } from '@/Models/IContent';

const initialState: IHomeState ={
  loading:true,
  error:'',
  data:[]
}
const HomePage = () => {
    const [state,dispatch]=useReducer(homePageReducer,initialState);
    const navigate = useNavigate();
    const {search} = useLocation();
    const { state:{userInfo},dispatch: ctxDispatch } = useContext(User);
    const redirectURL=new URLSearchParams(search);
    const redirectValue=redirectURL.get("redirect");
    const redirect = redirectValue ?redirectValue:"/signin";
    const [genres,setGenres]=useState([]);

    const clickHandler =() =>{
      Cookies.remove("userInfo");
      ctxDispatch({ type: USER_SIGNOUT})
      navigate("/");
    }

    useEffect(() => {
        if(!userInfo){
            navigate(redirect)
        }
        }, [navigate,redirect,userInfo]);
      useEffect(()=>{
      const getContents=async()=>{
        dispatch({
          type: GET_REQUEST,
          payload: undefined
        });
      try{
        const {data}=await axios.get("/api/v1/contents",{headers:{authorization: `Bearer ${userInfo.token}`}});        
        setGenres((await axios.get("/api/v1/seed/genres")).data.genres);
        dispatch({type:GET_SUCCESS,payload:data});
        
      }catch(error:any){
          dispatch({type:GET_FAIL,payload:error.message});
      }
      };
      getContents();
      console.log(genres)
    },[])
  return (
    <div>
        <Title title='Home - Netflix'/>
        <h1>NetFlix</h1>
        <button onClick={clickHandler}>Logout</button>
        
        <div className='products'>
          {state.loading ?<p>loading</p>: state.error ?<p>err</p>:(
            <Contents contents={state.data}></Contents>
          )}
          
          </div>
          <ul>
            {genres.map((genre: string) => (
              <div>
                <h1>{genre}</h1>
                <Contents contents={state.data.filter((c:IContent)=>c.genre==genre)}></Contents>
              </div>
        ))}
      </ul>  


    </div>
  )
}

export default HomePage