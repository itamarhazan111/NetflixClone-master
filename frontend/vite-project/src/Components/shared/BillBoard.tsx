import  { useEffect, useReducer, useState } from 'react';
import { IState } from '@/Models/States/IState';
import { IContent } from '@/Models/IContent';
import billBoardReducer from '@/Reducers/billBoardReducer';
import reducerHook from '@/Hooks/reducerHook';
import BillBoardImage from '../BillBoard/BillBoardImage';
import BillBoardContent from '../BillBoard/BillBoardContent';
import BillBoardVideo from '../BillBoard/BillBoardVideo';

const initialState: IState<IContent[]> ={
    loading:true,
    error:'',
    data:null
  }

const BillBoard= (props:{isSeries:string}) => {
  const [state,dispatch]=useReducer(billBoardReducer,initialState);
  const [showTrailer, setShowTrailer] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
  reducerHook( `/api/v1/content/getContentBillBoard/${props.isSeries}`,dispatch)
  },[])

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
              <BillBoardImage image={state.data.imgThumb.toString()}/>
            )}
            {showTrailer &&  (
              <BillBoardVideo trailer={state.data.trailer.toString()}/>
            )}
            <BillBoardContent title={state.data.title} description={state.data.description} hideDescription={showTrailer} _id={state.data._id} />
        </div>:<div></div>}
        
        </div>
    );
}


export default BillBoard;