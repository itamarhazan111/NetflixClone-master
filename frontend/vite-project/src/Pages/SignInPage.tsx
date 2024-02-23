import { useContext, useEffect, useRef } from "react";
import Title from "../Components/shared/Title";
import { toast } from "react-toastify";
import { postData} from "../Helpers/httpRequest" 
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { User } from "../Context/user";
import { USER_SIGNIN } from "../Helpers/Actions";
import { getError } from "@/Helpers/utils";

const SignInPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { state:{userInfo},dispatch: ctxDispatch } = useContext(User);
    const {search} = useLocation();
    const redirectURL=new URLSearchParams(search);
    const redirectValue=redirectURL.get("redirect");
    const redirect = redirectValue ?redirectValue:"/";

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
        }, [navigate,redirect,userInfo]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailValue = emailRef.current?.value || "";
            const passwordValue = passwordRef.current?.value || "";
            const data = await postData("/api/v1/users/signin",{email:emailValue,password:passwordValue})
            if(data){
                ctxDispatch({ type: USER_SIGNIN, payload: data })
                Cookies.set("userInfo",JSON.stringify(data));
                navigate(redirect);
            }
        } catch (error) {
            toast.error(getError(error));
        }

        
    };
    
    return (
        <div>
            <h1>Sign In</h1>
            <Title title="Sign In"/>
            <div>
                <form onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                    /><br/>
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    /><br/>
                    <button type="submit">Login</button>
                </form>
                New to this site?{" "} <Link to="/signup">Click here!</Link>
            </div>
        </div>
    );
};

export default SignInPage;
