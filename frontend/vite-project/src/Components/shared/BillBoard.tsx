import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '@/Helpers/Actions'
import { getData } from '@/Helpers/httpRequest'
import { IContent } from '@/Models/IContent'
import { IStateArr } from '@/Models/States/IStateArr'
import billboardReducer from '@/Reducers/billBoardReducer'
import { useEffect, useReducer, useState } from 'react'

const initialState: IStateArr<IContent> ={
    loading: true,
    error: '',
    data:await getData(`/api/v1/content/getContentBillBoard/`)
}

const BillBoard = () => {

    const [state, dispatch] = useReducer(billboardReducer, initialState);

    return (
        <div>
            <img src={state.data[0].imgThumb.toString()} alt="Thumbnail" />
        </div>
    );
};

export default BillBoard;