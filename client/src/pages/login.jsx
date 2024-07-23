import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import axios from 'axios';
import apiBaseUrl from '../api';
import { UserContext } from '../context/UserContext';
const burl = "https://blogger-my-app.vercel.app";

export default function LoginPage() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    useEffect(() => {
        console.log(loggedInUser);
    }, [loggedInUser])

    const handleOnSigin = async (e) => {
        e.preventDefault();
        if(emailId === "" || password === "" || !emailId || !password) {
            toast.error("Please fill all the details", { position: "top-center" });
            return;
        }

        try {
            const res = await axios.post(`${apiBaseUrl}/api/auth/login`, { email: emailId, password });
            if(res.status === 201) {
                toast.success(res.data.message, { position: "top-center" });
                const user = res.data.user;
                user.token = res.data.token;
                setLoggedInUser([user]);
                setTimeout(() => {
                    window.location.href = `/admin`;
                }, 1000)
            }
            else {
                toast.info(res.data.message, { position: "top-center" });
            }
        }
        catch(err) {
            toast.error(err.message, { position: "top-center" });
        }
    }

    return (
        <div>
            <div className='shadow-lg'> <Header/> </div>
            <div className="flex items-center justify-center mt-14">
                <form onSubmit={e => handleOnSigin(e)}
                    className="flex flex-col items-center justify-center w-1/3 max-md:w-full py-5 px-8 bg-white shadow-lg rounded-md border-t-[5px] border-gray-400 pb-6 border-b-[1.5px]"
                >
                    <h1 className="text-2xl font-semibold mb-3">
                        Login with Email Id
                    </h1>
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 my-4"
                        onChange={e => setEmailId(e.target.value)}
                    />
                    <div className="flex items-center justify-center w-full gap-x-1 text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 placeholder:text-gray-400">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full text-lg bg-gray-100 border-none outline-none"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div>
                        {
                            showPassword ? 
                            <FaEyeSlash 
                                className="w-6 h-6 cursor-pointer" 
                                onClick={() => setShowPassword(prev => (!prev))} 
                            /> :
                            <FaEye
                                className="w-6 h-6 cursor-pointer" 
                                onClick={() => setShowPassword(prev => (!prev))} 
                            />
                        }
                        </div>
                    </div>
                    <div className="w-full flex justify-end text-sm my-2 underline mr-4">
                        Forgot password?
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-gray-500 py-2 text-white rounded-md text-2xl font-semibold mb-2'
                    >
                        Log in
                    </button>
                    <div className="flex justify-end text-sm w-full mr-4">
                        <span className="[word-spacing:-1.5px]">
                            Don't have an account? 
                        </span> 
                        &nbsp;
                        <NavLink to="/auth/register" className="underline font-semibold">
                            Sign up
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
