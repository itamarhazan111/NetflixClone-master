import { Link, useNavigate } from "react-router-dom";
import Title from "../Components/shared/Title";
import { useContext, useRef, useEffect, useState } from "react";
import { User } from "../Context/user";
import { USER_SIGNIN } from "../Helpers/Actions";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { postData } from "../Helpers/httpRequest";
import { getError } from "../Helpers/utils";

const SignUpPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(User);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailValue = emailRef.current?.value || "";
            const passwordValue = passwordRef.current?.value || "";
            const confirmPasswordValue = confirmPasswordRef.current?.value || "";
            const usernameValue = usernameRef.current?.value || "";

             if (passwordValue !== confirmPasswordValue) {
                setError("Passwords do not match");
                return;
            }

            const data = await postData("/api/v1/users/signup", { email: emailValue, password: passwordValue, username: usernameValue, isAdmin: false });
            if (data) {
                ctxDispatch({ type: USER_SIGNIN, payload: data });
                Cookies.set("userInfo", JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover text-white md:flex-col" style={{ backgroundImage: `url('../assets/netflix-bg.jpg')` }}>
            <Title title="Sign Up" />
            <div className="absolute invisible top-0 left-0 p-4 md:visible">
                <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-10 md:w-auto" />
            </div>
            <div className="w-full max-w-md px-3 py-3 bg-black bg-opacity-70 rounded-lg md:px-6 md:py-6">
                <h1 className="text-2xl mb-10 md:text-6xl">Sign Up</h1>
                <form onSubmit={submitHandler} className="mb-8">
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                        className="block w-full py-3 px-4 mb-4 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:border-gray-400"
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none mt-8 focus:bg-red-600">Sign Up</button>
                </form>
                <p className="text-gray-400 ">Already have an account? <Link to="/signin" className="text-white hover:underline">Sign in.</Link></p>
            </div>
        </div>
    );
}

export default SignUpPage;