
import contentSectionReducer from '@/Reducers/contentSectionReducer';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS} from '../../Helpers/Actions';

import {  useEffect, useReducer } from 'react';
import { IStateArr } from '@/Models/States/IStateArr';
import ContentsCarousel from '../HomePage/ContentCarousel';
import { getData } from '@/Helpers/httpRequest';
import { IContent } from '@/Models/IContent';



const initialState: IStateArr<IContent> ={
  loading:true,
  error:'',
  data:[]
}

const ContentSection=(props:{genre:string|undefined,movieName:string|undefined,seriesName:string|undefined,url:string})=> {
  const [state,dispatch]=useReducer(contentSectionReducer,initialState);
  useEffect(()=>{
    const getContents=async()=>{
      dispatch({
        type: GET_REQUEST,
        payload: undefined
      });
    try{
        const data=await getData(`/api/v1/content/${props.url}${props.genre ||props.movieName||props.seriesName }`);   
        dispatch({type:GET_SUCCESS,payload:data});
      
    }catch(error:any){
        dispatch({type:GET_FAIL,payload:error.message});
    }
    };
    getContents();
  },[])
  return (
    <div>
        <h1>{props.genre||props.movieName||props.seriesName}</h1>
        <ContentsCarousel contents={state.data}/>
    </div>
  )
}

export default ContentSection