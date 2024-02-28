import  { useReducer, useState } from 'react';

import ReactPlayer from 'react-player';
import { IState } from '@/Models/States/IState';
import { IContent } from '@/Models/IContent';
import billBoardReducer from '@/Reducers/billBoardReducer';
import reducerHook from '@/Hooks/reducerHook';

const initialState: IState<IContent[]> ={
    loading:true,
    error:'',
    data:null
  }

const BillBoard= (props:{isSeries:string}) => {
  const [state,dispatch]=useReducer(billBoardReducer,initialState);
  const [showTrailer, setShowTrailer] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  reducerHook( `/api/v1/content/getContentBillBoard/${props.isSeries}`,dispatch)
 

  const handleMouseEnter = () => {
    setTimer(
      setTimeout(() => {
        setShowTrailer(true);
      }, 3000)
    );
  };

  const handleMouseLeave = () => {
    setShowTrailer(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };


    return (
        
        <div>
        {state.data?<div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            {!showTrailer && (
            <img style={{ width: '100%', height: 'auto' }} src={state.data.imgThumb.toString()} alt="Thumbnail" />
            )}
            {showTrailer && (
                <ReactPlayer
                className="pointer-events-none"
                muted
                playing
                loop
                controls={false}
                url={state.data.trailer.toString()}
                disablePictureInPicture
                width={'100%'}
                height={'100%'}
                />
            )}
        </div>:<div></div>}
        
        </div>
    );
}


export default BillBoard;