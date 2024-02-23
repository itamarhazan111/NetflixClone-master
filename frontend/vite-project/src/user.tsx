import { createContext, useReducer } from "react";
import userReducer from "./Reducers/userReducer";
import Cookies from "js-cookie"

export const User = createContext<any>(null);
const userInfoString: string | undefined = Cookies.get('userInfo');

const initialState = {
    userInfo: userInfoString ? JSON.parse(userInfoString) : null

}

export const UserProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const body = { state, dispatch }
    return <User.Provider value={body}>{children}</User.Provider>
}
