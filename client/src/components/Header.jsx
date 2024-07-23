import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import apiBaseUrl from "../api";

export default function Header() {
    const { loggedInUser, emptyUser } = useContext(UserContext);

    const handleOnLogOut = async () => {
        try {
            const res = await axios.post(`${apiBaseUrl}/api/auth/logout`);
            if(res.status === 200) {
                toast.success(res.data.message, { position: "top-center" });
            }
        }
        catch(error) {
            toast.error(error.message, { position: "top-center" });
        }
        loggedInUser.length > 0 && emptyUser();
    }

    return (
        <div className="p-5 md:px-12 lg:px-28">
            <div className="flex items-center justify-between">
                <NavLink to={'/'} className="text-3xl font-bold">
                    blogger
                </NavLink>
                {
                    Object.keys(loggedInUser).length === 0
                        ?
                    <NavLink
                        to={'/auth/login'}
                        className="bg-white px-4 py-2 border-[1.6px] border-black text-xl font-semibold shadow-md shadow-black"
                    >
                        Log in →
                    </NavLink>
                        :
                    <div>
                        <div className="flex items-center justify-center">
                            <NavLink to={'/admin'}>
                                <img 
                                    src={loggedInUser[0].image} 
                                    alt=""
                                    className="w-16 h-16 rounded-full border-[1.6px] border-black"
                                />
                            </NavLink>
                            <button 
                                onClick={() => handleOnLogOut()}
                                className="bg-gray-300 px-6 py-2 border-gray-600 border-[1.6px] rounded-md text-lg ml-5 font-semibold tracking-wider"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}