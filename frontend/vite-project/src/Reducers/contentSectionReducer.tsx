import { IState as IState } from '@/Models/IState.js';
import {GET_REQUEST,GET_FAIL,GET_SUCCESS} from '../Actions.jsx'
import { MyAction } from '@/Models/MyAction.js';
import { IContent } from '@/Models/IContent.js';


 const initialState: IState<IContent> ={
    loading:true,
    error:'',
    data:[]
 }
const contentSectionReducer=(state: IState<IContent> = initialState, action: MyAction)=>{
    switch(action.type){

        case GET_REQUEST:{
            return {...state,loading:true}
        }
        case GET_FAIL:{
            return{...state,loading:false,error:action.payload}
        }
        case GET_SUCCESS:{
            return{...state,loading:false,data:action.payload}
        }
        default :return{...state};
    }
}

export default contentSectionReducer