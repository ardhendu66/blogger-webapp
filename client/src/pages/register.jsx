import { useState, useEffect, useContext } from "react";
import axios from "axios";
import apiBaseUrl from "../api";
import { NavLink, redirect } from "react-router-dom";
import Header from "../components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
const burl = "https://blogger-my-app.vercel.app";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const handleOnRegister = async (e) => {
        e.preventDefault();
        if(name === "" || emailId === "" || password === "" || !name || !emailId || !password){ 
            return;
        }

        try {
            const res = await axios.post(`${apiBaseUrl}/api/auth/register`, {
                name, email: emailId, password
            });
            if(res.status === 201) {
                toast.success(res.data.message, { position: "top-center" });
                window.location.href = `/auth/login`;
            }
        }
        catch(e) {
            toast.error(e.message, { position: "top-center" });
        }
    }

    return (
        <div>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex items-center justify-center my-6">
                <form onSubmit={e => handleOnRegister(e)}
                    className="flex flex-col items-center justify-center max-md:w-[97%] w-[35%] py-5 px-7 bg-white shadow-lg rounded-md border-t-[5px] border-gray-400 pb-6 border-b-[1.5px]"
                >
                    <h1 className="text-2xl font-semibold mb-6">
                        Register with Email Id
                    </h1>
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                        onChange={e => setEmailId(e.target.value)}
                    />
                    <div className="flex items-center justify-center w-full gap-x-1 text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3">
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
                    <button
                        type="submit"
                        className={`w-full bg-gray-500 py-2 text-white rounded-md text-2xl font-semibold mb-2`}
                    >
                        Register
                    </button>
                    <div className="flex justify-end text-sm w-full mr-4">
                        <span className="[word-spacing:-1.5px]">
                            Already have an account? 
                        </span> 
                        &nbsp;
                        <NavLink to="/auth/login" className="underline font-semibold">
                            Sign in
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}