import {GET_REQUEST,GET_FAIL,GET_SUCCESS} from '../Actions.js'
import { MyAction } from '@/Models/MyAction.js';
import { IState } from '@/Models/IState.js';


 const initialState: IState<String> ={
    loading:true,
    error:'',
    data:[]
 }
function pagesReducer(state: IState<String> = initialState, action: MyAction) {
    switch (action.type) {

        case GET_REQUEST: {
            return { ...state, loading: true };
        }
        case GET_FAIL: {
            return { ...state, loading: false, error: action.payload };
        }
        case GET_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        default: return { ...state };
    }
}

export default pagesReducer