import Title from "@/Components/shared/Title";
import Logo from "../../assets/Netflix-Logo-large.svg";
import { useRef} from "react";
import { getError } from "@/Helpers/utils";
import { toast } from "react-toastify";
import axios from "axios";



const ResetPasswordPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);



    const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailValue = emailRef.current?.value || "";
        try {

            const data = await axios.post("api/v1/users/forgot", { email: emailValue });
            if (data)
                toast.success("Email sent");

        } catch (error) {
            toast.error(getError(error));
        }
    }



    return (
        <div className="flex items-center bg-cover min-h-screen md:bg-[url('../assets/netflix-bg.jpg')]  flex-col">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Title title="Forgot password" />
            <div className="mx-auto ml-0 z-10">
                <img src={Logo} alt="Netflix Logo" className="h-20 md:h-20 w-22 md:w-60" />
            </div>
            <div className="text-white w-full flex items-center flex-col mt-20 z-10">
                <div className="w-full max-w-md px-10 py-10 bg-none md:bg-black bg-opacity-80 rounded-lg md:px-6 md:py-6">
                <h1 className="text-3xl md:text-5xl font-bold text-center">Enter your email</h1>
                <h2 className="text-md md:text-xl font-bold text-center mt-2">If you are not getting the Email check your spam folder</h2>
                <form onSubmit={checkEmail} className="flex flex-col items-center mt-5 mb-5">
                    <input
                        type="email"
                        placeholder="Email address"
                        ref={emailRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-gray-400 focus:outline-none focus:bg-stone-500"
                    />
                    <button type="submit" className="w-1/2 py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-2 md:mt-0">Send Email {">"}</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage