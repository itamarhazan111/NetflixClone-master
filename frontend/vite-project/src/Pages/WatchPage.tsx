import reducerHook from '@/Hooks/reducerHook';
import { IContent } from '@/Models/IContent';
import { IState } from '@/Models/States/IState';
import billBoardReducer from '@/Reducers/billBoardReducer';
import  {  useEffect, useReducer } from 'react'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const initialState: IState<IContent> ={
    loading:true,
    error:'',
    data:null
  }


const WatchPage=()=> {
    const {id}=useParams();
    const [state,dispatch]=useReducer(billBoardReducer,initialState);
    useEffect(() => {
      reducerHook( `/api/v1/content/getById/${id}`,dispatch)
    },[])

      return (
        <div>
            {state.data?
            <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <ReactPlayer
              className="pointer-events-none"
              muted
              playing
              loop
              controls={false}
              url={state.data.movie.toString()}
              disablePictureInPicture
              width={'100%'}
              height={'100%'}
            />
        </div>:<div></div>}
        </div>
        

      );
};

    


export default WatchPage