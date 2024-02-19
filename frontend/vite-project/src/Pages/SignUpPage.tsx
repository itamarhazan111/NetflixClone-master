import { Link, useNavigate } from "react-router-dom"
import Title from "../Components/shared/Title"
import { useContext, useRef } from "react";
import { User } from "../user";
import { USER_SIGNIN } from "../Actions";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getError } from "../utils";


const SignUpPage = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { state:{userInfo},dispatch: ctxDispatch } = useContext(User);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailValue = emailRef.current?.value || "";
            const passwordValue = passwordRef.current?.value || "";
            const usernameValue = usernameRef.current?.value || "";
            const {data} = await axios.post("/api/v1/users/signup",{email:emailValue,password:passwordValue,username:usernameValue,isAdmin:false})
            if(data){
                ctxDispatch({ type: USER_SIGNIN, payload: data })
                Cookies.set("userInfo",JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Title title="Sign up" />
            <div>
                <form onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                    /><br/>
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    /><br/>
                    <button type="submit">Login</button>
                </form>
                Already have an account?{" "} <Link to="/signin">Click here!</Link>
            </div>
        </div>
    )
}

export default SignUpPage