import { NavLink } from "react-router-dom";
import imgSrc from "../../public/404.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CustomeError() {
    return (
        <div>
            <div className='shadow-xl'>
                <Header/>
            </div>
            <div className="flex flex-col justify-center items-center w-full pt-3">
                <div className="flex items-center justify-center mt-3 -ml-10">
                    <div className="text-3xl text-gray-500">
                        Oops! Page Not Found.
                    </div>
                    <NavLink  to="/"
                        className="text-lg text-gray-500 px-2 pt-1 pb-2 ml-10 rounded-md border-gray-500 border-[1.4px] font-[500] bg-transparent"
                    >
                        ← Go Home
                    </NavLink>
                </div>
                <img
                    src={imgSrc}
                    width={700}
                    height={500}
                    alt="error"
                    className="rounded-sm"
                />
            </div>
            <Footer />
        </div>
    )
}