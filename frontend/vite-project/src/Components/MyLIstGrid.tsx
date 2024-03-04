import ContentCard from "@/Components/HomePage/ContentCard";
import { User } from "@/Context/user";
import reducerHook from "@/Hooks/reducerHook";
import { IContent } from "@/Models/IContent";
import { IState } from "@/Models/States/IState";

import myListReducer from "@/Reducers/myListGridReducer";
import {  useContext, useReducer } from "react";


const initialState: IState<IContent[]> ={
    loading:true,
    error:'',
    data:null
  }
const MyListGrid= () => {
    const { state:{userInfo} } = useContext(User);
    const [state, dispatch] = useReducer(myListReducer, initialState);
    reducerHook(`/api/v1/users/getMyList/${userInfo.email}`, dispatch)
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {state.loading?<p>loading</p>:state.error?<p>ERROR</p>:<>
            {Array.from({ length: state.data.myList.length }).map((_, index) => (
           
              <ContentCard content={state.data.myList[index]}></ContentCard>
          ))}

          </>}
        </div>
    );
};

export default MyListGrid;