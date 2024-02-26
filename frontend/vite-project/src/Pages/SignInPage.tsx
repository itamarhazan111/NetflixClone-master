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
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(User);
    const { search } = useLocation();
    const redirectURL = new URLSearchParams(search);
    const redirectValue = redirectURL.get("redirect");
    const redirect = redirectValue ? redirectValue : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const loginHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault();
        try {
            let emailValue = "";
            let passwordValue = "";

            if (action === "autoFill") {
                emailValue = "admin@example.com";
                passwordValue = "12345";
            } else {
                emailValue = emailRef.current?.value || "";
                passwordValue = passwordRef.current?.value || "";
            }

            const data = await postData("/api/v1/users/signin", { email: emailValue, password: passwordValue })
            if (data) {
                ctxDispatch({ type: USER_SIGNIN, payload: data })
                Cookies.set("userInfo", JSON.stringify(data));
                navigate(redirect);
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover text-white md:flex-col" style={{ backgroundImage: `url('../assets/netflix-bg.jpg')` }}>
            <Title title="Sign In" />
            <div className="absolute invisible top-0 left-0 p-4 md:visible">
                <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-50 md:w-auto" />
            </div>
            <div className="w-full max-w-md px-3 py-3 bg-black bg-opacity-70 rounded-lg md:px-6 md:py-6">
                <h1 className="text-2xl mb-10 md:text-6xl">Sign in</h1>
                <form onSubmit={(e) => loginHandler(e, "submit")} className="mb-8">
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none mt-8 focus:bg-red-600">Login</button>
                </form>
                <p className="text-gray-400 ">New to Netflix? <Link to="/signup" className="text-white hover:underline">Sign up now.</Link></p>
                <div className="container border border-white flex flex-col items-center justify-center mt-5">
                    <p className="text-gray-400 mb-3">Welcome to my Netflix clone project. For your convenience, you can use this button to log in</p>
                    <p className="text-white">Email: admin@example.com</p>
                    <p className="text-white">Password: 12345</p>
                    <button type="button" onClick={(e) => loginHandler(e, "autoFill")} className="bg-gray-500 text-white py-2 px-4 rounded-md mb-5">Auto Fill</button>
                </div>
            </div>
        </div>
    );
}
export default SignInPage;