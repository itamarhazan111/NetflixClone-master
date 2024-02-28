
import contentSectionReducer from '@/Reducers/contentSectionReducer';
import ContentsCarousel from '../HomePage/ContentCarousel';
import { IContent } from '@/Models/IContent';
import { IState } from '@/Models/States/IState';
import reducerHook from '@/Hooks/reducerHook';
import { useReducer } from 'react';



const initialState: IState<IContent[]> ={
  loading:true,
  error:'',
  data:null
}

const ContentSection=(props:{genre:string|undefined,movieName:string|undefined,seriesName:string|undefined,url:string})=> {
  const [state,dispatch]=useReducer(contentSectionReducer,initialState);
  reducerHook( `/api/v1/content/${props.url}${props.genre ||props.movieName||props.seriesName }`,dispatch)
  
  return (
    <div>
        {state.data?<div>
          <h1>{props.genre||props.movieName||props.seriesName}</h1>
          <ContentsCarousel contents={state.data}/>
        </div>:<div></div>}

    </div>
  )
}

export default ContentSection