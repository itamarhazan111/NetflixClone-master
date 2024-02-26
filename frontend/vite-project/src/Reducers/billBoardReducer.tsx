import { IStateArr as IStateArr } from '@/Models/States/IStateArr.js';
import {GET_REQUEST,GET_FAIL,GET_SUCCESS} from '../Helpers/Actions.js'
import { MyAction } from '@/Models/Action/MyAction.js';
import { IContent } from '@/Models/IContent.js';


 const initialState: IStateArr<IContent> ={
    loading:true,
    error:'',
    data:[]
 }
const billboardReducer=(state: IStateArr<IContent> = initialState, action: MyAction)=>{
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

export default billboardReducer