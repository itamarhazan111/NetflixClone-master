
import {  useEffect, useReducer} from 'react';
import pagesReducer from '@/Reducers/pagesReducer';
import { IStateArr } from '@/Models/States/IStateArr';
import ContentSection from '@/Components/shared/ContentSection';
import { getData } from '@/Helpers/httpRequest';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '@/Helpers/Actions';



const initialState: IStateArr<String> ={
  loading:true,
  error:'',
  data:[]
}
const ContentPage=(props:{name:String})=> {
    const [state,dispatch]=useReducer(pagesReducer,initialState);


      useEffect(()=>{
      const getContents=async()=>{
        dispatch({
          type: GET_REQUEST,
          payload: undefined
        });
      try{
     
        const data=await getData(`/api/v1/seed/${props.name}/`);
        dispatch({type:GET_SUCCESS,payload:data});
        
      }catch(error:any){
          dispatch({type:GET_FAIL,payload:error.message});
      }
      };
      getContents();
    },[])
  return (
    <div>
        <div className='products'>
          {state.loading ?<p>loading</p>: state.error ?<p>{state.error}</p>:(
            <div>
              {state.data.map((listName:string,index:number) => (
                props.name==='movies'?
                <ContentSection key={index}  genre={undefined} movieName={listName} seriesName={undefined} url='movies/' />
                :props.name==='series'?
                <ContentSection key={index}  genre={undefined} movieName={undefined} seriesName={listName} url='series/' />
                :<ContentSection key={index}  genre={listName} movieName={undefined} seriesName={undefined} url='' />
              ))}
            </div>
          )}
          
         </div>



    </div>
  )
}


export default ContentPage