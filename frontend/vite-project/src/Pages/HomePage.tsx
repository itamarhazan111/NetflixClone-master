import { useContext, useEffect, useReducer, useState} from 'react';
import Title from '../Components/shared/Title'
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../user';
import Cookies from "js-cookie";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS, USER_SIGNOUT } from '../Actions';

import Contents from '@/Components/HomePage/ContentCarousel';
import axios from 'axios';
import homePageReducer from '@/Reducers/homeReducer';
import { IState } from '@/Models/IState';
import ContentSection from '@/Components/shared/ContentSection';
import { getData } from '@/utils';


const initialState: IState ={
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
     
        const data=await getData("/api/v1/seed/genres");
        dispatch({type:GET_SUCCESS,payload:data});
        
      }catch(error:any){
          dispatch({type:GET_FAIL,payload:error.message});
      }
      };
      getContents();
    },[])
  return (
    <div>
        <Title title='Home - Netflix'/>
        <h1>NetFlix</h1>
        <button onClick={clickHandler}>Logout</button>

        <div className='products'>
          {state.loading ?<p>loading</p>: state.error ?<p>{state.error}</p>:(
            <div>
              {state.data.map((listName:string) => (
                  <ContentSection genre={listName} movieName={undefined} seriesName={undefined} url='' />

              ))}
                <ContentSection genre={undefined} movieName='Top picks for Movie' seriesName={undefined} url='movies/'  />
                <ContentSection genre={undefined} movieName={undefined} seriesName='Top Series' url='series/'/>
            </div>
          )}
          
          </div>



    </div>
  )
}

export default HomePage